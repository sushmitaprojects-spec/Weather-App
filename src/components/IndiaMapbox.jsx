import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { INDIA_CITIES_BY_STATE, getTempColor } from "../data/indiaHeatData";
import { STATE_BOUNDS, CITY_COORDS } from "../data/indiaCityCoords";

// Mapbox Access Token strictly loaded from environment variable (.env)
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

/** Convert a hex/rgba temp color to a Mapbox expression-friendly rgba array */
function hexToRgba(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},0.75)`;
}

/** Build a Mapbox match expression mapping stateId -> fill colour */
function buildFillColorExpr(citiesData) {
  const expr = ["match", ["get", "state_id"]];
  Object.entries(citiesData).forEach(([stateId, cities]) => {
    if (!cities.length) return;
    const avg = cities.reduce((a, c) => a + c.temp, 0) / cities.length;
    const tc = getTempColor(avg);
    expr.push(stateId, hexToRgba(tc.color));
  });
  expr.push("rgba(100,120,160,0.3)"); // default
  return expr;
}

export default function IndiaMapbox({ selectedState, onSelectState, selectedCityId }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  // ---------- Init map ----------
  useEffect(() => {
    if (mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [82.0, 22.5],
      zoom: 4.2,
      minZoom: 3.5,
      maxZoom: 12,
      attributionControl: false,
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-right");

    map.on("load", () => {
      // ---- Load GeoJSON state boundaries from a public CDN ----
      fetch(
        "https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson"
      )
        .then((r) => r.json())
        .then((geojson) => {
          // Normalise property names -> state_id
          geojson.features = geojson.features.map((f) => {
            const raw = (f.properties.NAME_1 || f.properties.st_nm || "").toLowerCase();
            const slug = raw
              .replace(/\s+&\s+/g, "-")
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "");
            return { ...f, properties: { ...f.properties, state_id: slug } };
          });

          map.addSource("india-states", { type: "geojson", data: geojson });

          // Fill layer
          map.addLayer({
            id: "state-fill",
            type: "fill",
            source: "india-states",
            paint: {
              "fill-color": buildFillColorExpr(INDIA_CITIES_BY_STATE),
              "fill-opacity": [
                "case",
                ["==", ["get", "state_id"], selectedState || ""],
                0.95,
                0.65,
              ],
            },
          });

          // Outline layer
          map.addLayer({
            id: "state-outline",
            type: "line",
            source: "india-states",
            paint: {
              "line-color": [
                "case",
                ["==", ["get", "state_id"], selectedState || ""],
                "#ffffff",
                "rgba(255,255,255,0.25)",
              ],
              "line-width": [
                "case",
                ["==", ["get", "state_id"], selectedState || ""],
                2,
                0.6,
              ],
            },
          });

          // Selected state highlight overlay
          map.addLayer({
            id: "state-selected",
            type: "line",
            source: "india-states",
            filter: ["==", ["get", "state_id"], selectedState || "NONE"],
            paint: {
              "line-color": "#00B4D8",
              "line-width": 2.5,
              "line-blur": 1,
            },
          });

          // Click handler on fill
          map.on("click", "state-fill", (e) => {
            const sid = e.features[0]?.properties?.state_id;
            if (sid) onSelectState(sid);
          });

          map.on("mouseenter", "state-fill", () => {
            map.getCanvas().style.cursor = "pointer";
          });
          map.on("mouseleave", "state-fill", () => {
            map.getCanvas().style.cursor = "";
          });
        })
        .catch(console.error);
    });

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- Update selected state highlight & fly to ----------
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    try {
      if (map.getLayer("state-fill")) {
        map.setPaintProperty("state-fill", "fill-opacity", [
          "case",
          ["==", ["get", "state_id"], selectedState || ""],
          0.95,
          0.65,
        ]);
      }
      if (map.getLayer("state-outline")) {
        map.setPaintProperty("state-outline", "line-color", [
          "case",
          ["==", ["get", "state_id"], selectedState || ""],
          "#ffffff",
          "rgba(255,255,255,0.25)",
        ]);
        map.setPaintProperty("state-outline", "line-width", [
          "case",
          ["==", ["get", "state_id"], selectedState || ""],
          2,
          0.6,
        ]);
      }
      if (map.getLayer("state-selected")) {
        map.setFilter("state-selected", ["==", ["get", "state_id"], selectedState || "NONE"]);
      }
    } catch (_) {}

    // Fly to state bounds
    if (selectedState && STATE_BOUNDS[selectedState]) {
      const [w, s, e, n] = STATE_BOUNDS[selectedState];
      map.fitBounds([[w, s], [e, n]], { padding: 60, duration: 900, maxZoom: 9 });
    }
  }, [selectedState]);

  // ---------- Fly to selected city smoothly ----------
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded() || !selectedCityId) return;

    const coords = CITY_COORDS[selectedCityId];
    if (coords) {
      // Mapbox expects [lng, lat], but CITY_COORDS stores [lat, lng]
      map.flyTo({
        center: [coords[1], coords[0]],
        zoom: 7.5,
        essential: true,
        duration: 1500, // smooth 1.5s flight animation
      });
    }
  }, [selectedCityId]);

  return (
    <>
      <style>{`
        .mapboxgl-ctrl-top-right { top: 10px !important; right: 10px !important; }
        .mapboxgl-ctrl button { background-color: rgba(14,22,38,0.9) !important; border-color: rgba(255,255,255,0.1) !important; }
        .mapboxgl-ctrl button .mapboxgl-ctrl-icon { filter: invert(0.7); }
      `}</style>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "100%", borderRadius: 12, overflow: "hidden" }}
      />
    </>
  );
}
