import React, { useState, useMemo, useRef, useEffect } from "react";
import { Thermometer, MapPin, Wind, Droplets, Sun, ChevronDown } from "lucide-react";
import { INDIA_STATES, INDIA_CITIES_BY_STATE, getTempColor, getAlertBadgeColor } from "../data/indiaHeatData";
import { CITY_COORDS } from "../data/indiaCityCoords";
import { calculateUTCI, calculateWBGT } from "../utils/thermalIndices";
import IndiaMapbox from "./IndiaMapbox";

/* ── Colour Legend Config ── */
const LEGEND_BANDS = [
  { label: "Extreme Cold",    range: "< 0°C",    color: "#F8FAFF", bg: "rgba(248,250,255,0.12)" },
  { label: "Cold",            range: "0–10°C",   color: "#3B82F6", bg: "rgba(59,130,246,0.15)"  },
  { label: "Normal / Safe",   range: "10–28°C",  color: "#10B981", bg: "rgba(16,185,129,0.12)"  },
  { label: "Moderate Heat",   range: "28–35°C",  color: "#EAB308", bg: "rgba(234,179,8,0.13)"   },
  { label: "Severe Heat Wave",range: "35–42°C",  color: "#F97316", bg: "rgba(249,115,22,0.14)"  },
  { label: "Extreme Heat Wave",range: "> 42°C",  color: "#EF4444", bg: "rgba(239,68,68,0.15)"   },
];

/* ── Custom dropdown ── */
function StyledSelect({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = options.find(o => o.id === value);

  return (
    <div ref={ref} style={{ position: "relative", userSelect: "none" }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "9px 13px", borderRadius: 8, cursor: "pointer",
          background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.15)",
          color: selected ? "#F0F4FF" : "#4D6080", fontSize: 13,
          transition: "border-color 0.2s",
          borderColor: open ? "#00B4D8" : "rgba(255,255,255,0.15)"
        }}
      >
        <span>{selected ? selected.name : placeholder}</span>
        <ChevronDown size={14} color="#8A9BC0" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
      </div>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 999,
          background: "#0E1626", border: "1px solid rgba(0,180,216,0.3)", borderRadius: 9,
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)", maxHeight: 240, overflowY: "auto"
        }}>
          {options.map(opt => (
            <div
              key={opt.id}
              onClick={() => { onChange(opt.id); setOpen(false); }}
              style={{
                padding: "9px 14px", cursor: "pointer", fontSize: 13,
                color: opt.id === value ? "#00B4D8" : "#C0CDE0",
                background: opt.id === value ? "rgba(0,180,216,0.08)" : "transparent",
                transition: "background 0.15s"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
              onMouseLeave={e => e.currentTarget.style.background = opt.id === value ? "rgba(0,180,216,0.08)" : "transparent"}
            >
              {opt.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── State Summary Bar ── */
function StateSummaryBar({ cities }) {
  const avg = cities.reduce((a, c) => a + c.temp, 0) / cities.length;
  const max = Math.max(...cities.map(c => c.temp));
  const min = Math.min(...cities.map(c => c.temp));

  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10,
      padding: "14px 16px", borderRadius: 10,
      background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.07)"
    }}>
      {[
        { label: "State Avg Temp", value: `${avg.toFixed(1)}°C`, color: getTempColor(avg).color },
        { label: "Hottest City",   value: `${max.toFixed(1)}°C`, color: getTempColor(max).color },
        { label: "Coolest City",   value: `${min.toFixed(1)}°C`, color: getTempColor(min).color },
      ].map(s => (
        <div key={s.label} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: s.color, fontFamily: "JetBrains Mono, monospace", textShadow: `0 0 8px ${s.color}60` }}>
            {s.value}
          </div>
          <div style={{ fontSize: 10, color: "#4D6080", marginTop: 2 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ── City Detail Pane ── */
function CityDetailPane({ city }) {
  const tc = getTempColor(city.temp);
  const gaugePercent = Math.min(Math.max((city.temp + 5) / 55 * 100, 0), 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <MapPin size={14} color={tc.color} />
          <span style={{ fontSize: 11, color: tc.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{tc.label}</span>
        </div>
        <h3 style={{ fontWeight: 800, fontSize: 18, color: "#F0F4FF", marginBottom: 2 }}>{city.name}</h3>
        <div style={{
          display: "inline-block", fontSize: 10, fontWeight: 700, padding: "3px 10px",
          borderRadius: 100, border: `1px solid ${getAlertBadgeColor(city.alert)}50`,
          color: getAlertBadgeColor(city.alert),
          background: `${getAlertBadgeColor(city.alert)}15`
        }}>{city.alert}</div>
      </div>

      {/* Big Temp */}
      <div style={{
        textAlign: "center", padding: "20px 16px", borderRadius: 12,
        background: tc.bg, border: `1px solid ${tc.border}`,
        boxShadow: `0 0 40px ${tc.glow}`
      }}>
        <div style={{
          fontSize: 52, fontWeight: 900, color: tc.color,
          fontFamily: "JetBrains Mono, monospace", lineHeight: 1,
          textShadow: `0 0 30px ${tc.glow}`
        }}>
          {city.temp > 0 ? "+" : ""}{city.temp.toFixed(1)}
          <span style={{ fontSize: 22, fontWeight: 600 }}>°C</span>
        </div>
        <div style={{ fontSize: 12, color: "#8A9BC0", marginTop: 4 }}>
          Feels Like (UTCI) <strong style={{ color: tc.color }}>{city.heatIndex.toFixed(1)}°C</strong>
        </div>
      </div>

      {/* Temperature Gauge */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 10, color: "#4D6080" }}>
          <span>-5°C</span><span>Temp Scale</span><span>50°C</span>
        </div>
        <div style={{ height: 10, borderRadius: 8, overflow: "hidden", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{
            height: "100%", width: `${gaugePercent}%`,
            background: `linear-gradient(90deg, #3B82F6 0%, #10B981 25%, #EAB308 50%, #F97316 75%, #EF4444 100%)`,
            borderRadius: 8, transition: "width 0.6s cubic-bezier(0.34,1.56,0.64,1)"
          }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 9, color: "#4D6080" }}>
          {["❄️ Extreme Cold", "🔵 Cold", "🟢 Safe", "🟡 Moderate", "🟠 Severe", "🔴 Extreme"].map(l => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[
          { icon: <Droplets size={13} color="#00B4D8" />, label: "Humidity",   value: `${city.humidity}%` },
          { icon: <Wind      size={13} color="#8A9BC0" />, label: "Wind Speed", value: `${city.windSpeed} km/h` },
          { icon: <Sun       size={13} color="#EAB308" />, label: "UV Index",   value: city.uvIndex },
          { icon: <Thermometer size={13} color="#A78BFA" />, label: "UTCI Stress", value: `${city.utci}°C` },
          { icon: <Thermometer size={13} color="#F59E0B" />, label: "WBGT Stress", value: `${city.wbgt}°C` },
          { icon: <Sun       size={13} color="#34D399" />, label: "Air Quality (AQI)", value: city.aqi },
        ].map(m => (
          <div key={m.label} style={{ padding: "10px 12px", borderRadius: 8, background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>{m.icon}<span style={{ fontSize: 10, color: "#4D6080" }}>{m.label}</span></div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#F0F4FF", fontFamily: "JetBrains Mono, monospace" }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Heat Wave Risk Meter */}
      <div style={{ padding: "12px 14px", borderRadius: 10, background: tc.bg, border: `1px solid ${tc.border}` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: tc.color, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.07em" }}>
          🌡 Heat Wave Risk Assessment
        </div>
        {city.temp >= 42 && (
          <div style={{ fontSize: 12, color: "#FCA5A5" }}>⚠️ EXTREME: Outdoor activities are life-threatening. Immediate HAP response required. Deploy cooling centers.</div>
        )}
        {city.temp >= 35 && city.temp < 42 && (
          <div style={{ fontSize: 12, color: "#FDBA74" }}>🔶 SEVERE: Heat stroke risk is high. Limit outdoor exposure. Water distribution mandatory.</div>
        )}
        {city.temp >= 28 && city.temp < 35 && (
          <div style={{ fontSize: 12, color: "#FDE047" }}>🟡 MODERATE: Heat exhaustion possible for vulnerable groups. Advisory issued.</div>
        )}
        {city.temp >= 10 && city.temp < 28 && (
          <div style={{ fontSize: 12, color: "#6EE7B7" }}>✅ NORMAL: Conditions are safe. Standard monitoring active.</div>
        )}
        {city.temp >= 0 && city.temp < 10 && (
          <div style={{ fontSize: 12, color: "#93C5FD" }}>🔵 COLD: Cold wave advisory. Shelter for vulnerable populations.</div>
        )}
        {city.temp < 0 && (
          <div style={{ fontSize: 12, color: "#F8FAFF" }}>⬜ EXTREME COLD: Dangerous freeze conditions. Emergency warming centers active.</div>
        )}
      </div>
    </div>
  );
}

/* ── City Search Suggestion Box ── */
function CityLiveSearch({ allCities, onSelectCity }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return allCities.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  }, [allCities, query]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <input
        type="text"
        placeholder="Type city name (e.g. Pune, Jaipur)..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        style={{
          width: "100%", padding: "10px 14px", borderRadius: 8, fontSize: 13,
          background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.15)",
          color: "#F0F4FF", outline: "none", fontFamily: "inherit",
          transition: "border-color 0.2s"
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(0,180,216,0.5)"}
        onMouseLeave={e => { if (document.activeElement !== e.currentTarget) e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
        onFocusCapture={e => e.currentTarget.style.borderColor = "#00B4D8"}
        onBlurCapture={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}
      />
      {open && suggestions.length > 0 && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 9999,
          background: "#0E1626", border: "1px solid rgba(0,180,216,0.3)", borderRadius: 9,
          boxShadow: "0 8px 32px rgba(0,0,0,0.65)", maxHeight: 220, overflowY: "auto",
          backdropFilter: "blur(20px)"
        }}>
          {suggestions.map(s => (
            <div
              key={s.id}
              onClick={() => {
                onSelectCity(s);
                setQuery(s.name);
                setOpen(false);
              }}
              style={{
                padding: "10px 14px", cursor: "pointer", fontSize: 13,
                borderBottom: "1px solid rgba(255,255,255,0.03)",
                transition: "background 0.15s"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(0,180,216,0.12)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ fontWeight: 700, color: "#F0F4FF" }}>{s.name}</div>
              <div style={{ fontSize: 10, color: "#4D6080", textTransform: "capitalize", marginTop: 2 }}>
                {s.stateId.replace("-", " ")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Live Weather Fetch Helper ── */
async function fetchCityWeather(cityId, cityName) {
  const coords = CITY_COORDS[cityId];
  if (!coords) throw new Error(`Coordinates not found for city: ${cityName}`);
  const [lat, lng] = coords;

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,shortwave_radiation,uv_index&timezone=Asia/Kolkata&wind_speed_unit=ms`;
  const airUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&current=us_aqi&timezone=Asia/Kolkata`;

  const [weatherRes, airRes] = await Promise.all([
    fetch(weatherUrl),
    fetch(airUrl)
  ]);

  if (!weatherRes.ok) throw new Error(`Weather API returned status ${weatherRes.status}`);

  const weatherJson = await weatherRes.json();
  const airJson = airRes.ok ? await airRes.json() : null;

  const current = weatherJson.current;
  const temp = current.temperature_2m;
  const humidity = current.relative_humidity_2m;
  const windSpeed = current.wind_speed_10m; // wind speed in m/s
  const solarRad = current.shortwave_radiation || 400; // default solar radiation
  const uvIndex = Math.round(current.uv_index) || 5;
  const aqi = airJson?.current?.us_aqi || 45;

  // Compute thermal stress indices
  const utci = calculateUTCI(temp, humidity, windSpeed, solarRad);
  const wbgt = calculateWBGT(temp, humidity, windSpeed, solarRad, true);

  return {
    id: cityId,
    name: cityName,
    temp,
    humidity,
    windSpeed: Math.round(windSpeed * 3.6 * 10) / 10, // convert m/s to km/h and round to 1 decimal
    uvIndex,
    aqi,
    heatIndex: utci, // Feels like represented by UTCI
    utci,
    wbgt,
    alert: temp >= 42 ? "Extreme Alert" : temp >= 35 ? "Red Alert" : temp >= 28 ? "Orange Alert" : temp >= 10 ? "Normal / Safe" : "Cold wave"
  };
}

const FAMOUS_METROS = [
  { id: "new-delhi", name: "Delhi", stateId: "delhi" },
  { id: "mumbai", name: "Mumbai", stateId: "maharashtra" },
  { id: "bengaluru", name: "Bengaluru", stateId: "karnataka" },
  { id: "chennai", name: "Chennai", stateId: "tamil-nadu" },
  { id: "kolkata", name: "Kolkata", stateId: "west-bengal" },
  { id: "hyderabad", name: "Hyderabad", stateId: "telangana" },
  { id: "ahmedabad", name: "Ahmedabad", stateId: "gujarat" },
];

/* ══ Main Export ══ */
export default function HeatMapPanel() {
  const [selectedState, setSelectedState] = useState("rajasthan");
  
  const [cityWeather, setCityWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Flat list of all cities in India for lookup
  const ALL_CITIES = useMemo(() => {
    const list = [];
    Object.entries(INDIA_CITIES_BY_STATE).forEach(([stateId, cities]) => {
      cities.forEach(c => {
        list.push({ id: c.id, name: c.name, stateId });
      });
    });
    return list;
  }, []);

  const cities = useMemo(() => INDIA_CITIES_BY_STATE[selectedState] || [], [selectedState]);

  // Execute weather API fetch
  const handleCitySelect = async (cityObj) => {
    if (!cityObj) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCityWeather(cityObj.id, cityObj.name);
      setCityWeather(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load live city weather.");
    } finally {
      setLoading(false);
    }
  };

  // Reset city when state changes — auto-select hottest city for immediate detail view and trigger live API load
  const handleStateChange = (stateId) => {
    setSelectedState(stateId);
    const newCities = INDIA_CITIES_BY_STATE[stateId] || [];
    if (newCities.length > 0) {
      const hottest = newCities.reduce((a, b) => b.temp > a.temp ? b : a);
      handleCitySelect({ id: hottest.id, name: hottest.name, stateId });
    }
  };

  // Initial load of Jaipur on mount
  useEffect(() => {
    handleCitySelect({ id: "jaipur", name: "Jaipur", stateId: "rajasthan" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stateObj = INDIA_STATES.find(s => s.id === selectedState);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* ── Panel Header ── */}
      <div style={{
        padding: "16px 20px", borderRadius: 12,
        background: "rgba(14,22,38,0.85)", border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 9,
              background: "linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(249,115,22,0.2) 100%)",
              border: "1px solid rgba(239,68,68,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <Thermometer size={18} color="#EF4444" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: "#F0F4FF" }}>India Heat Wave Temperature Map</div>
              <div style={{ fontSize: 11, color: "#4D6080", marginTop: 1 }}>State & City-level thermal risk · Live monitoring</div>
            </div>
          </div>
          <div style={{
            fontSize: 10, fontFamily: "JetBrains Mono, monospace", padding: "4px 10px",
            borderRadius: 100, background: "rgba(0,180,216,0.1)", border: "1px solid rgba(0,180,216,0.3)", color: "#00B4D8"
          }}>
            🛰 IMD Live Feed
          </div>
        </div>

        {/* Colour Legend */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {LEGEND_BANDS.map(b => (
            <div key={b.label} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "5px 10px", borderRadius: 8,
              background: b.bg, border: `1px solid ${b.color}30`
            }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: b.color, flexShrink: 0, boxShadow: `0 0 6px ${b.color}` }} />
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: b.color }}>{b.label}</div>
                <div style={{ fontSize: 9, color: "#4D6080" }}>{b.range}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Dropdowns Row ── */}
      <div style={{ maxWidth: 350 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#8A9BC0", marginBottom: 6, display: "flex", alignItems: "center", gap: 5 }}>
          <MapPin size={11} color="#00B4D8" /> Select State
        </div>
        <StyledSelect
          value={selectedState}
          onChange={handleStateChange}
          options={INDIA_STATES}
          placeholder="Choose a state..."
        />
      </div>

      {/* ── State Stats Summary ── */}
      {cities.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#8A9BC0", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.07em" }}>
            📊 {stateObj?.name} — Thermal Summary
          </div>
          <StateSummaryBar cities={cities} />
        </div>
      )}

      {/* ── Main Grid: Expanded Mapbox Map + Live Search Sidebar ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16, alignItems: "start" }}>

        {/* Interactive Mapbox Map */}
        <div style={{
          padding: "14px", borderRadius: 12,
          background: "rgba(14,22,38,0.9)", border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)", position: "sticky", top: 20,
          height: "550px", display: "flex", flexDirection: "column"
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#4D6080", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, textAlign: "center" }}>
            🗺 Interactive Mapbox Globe · Click on State Heatmaps to Focus
          </div>
          <div style={{ flex: 1, position: "relative", width: "100%", height: "100%" }}>
            <IndiaMapbox
              selectedState={selectedState}
              onSelectState={handleStateChange}
              selectedCityId={cityWeather?.id}
            />
          </div>
        </div>

        {/* Live Search & Detail Pane */}
        <div style={{
          padding: "20px", borderRadius: 12, position: "sticky", top: 20,
          background: "rgba(14,22,38,0.9)", border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)", minHeight: 480, display: "flex",
          flexDirection: "column", gap: 14
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#4D6080", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            🔍 Live City Weather Search
          </div>

          <CityLiveSearch
            allCities={ALL_CITIES}
            onSelectCity={handleCitySelect}
          />

          {/* Major Metros Section */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#4D6080", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
              ⚡ Popular Metro Cities
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {FAMOUS_METROS.map(m => (
                <button
                  key={m.id}
                  onClick={() => handleCitySelect(m)}
                  style={{
                    padding: "5px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                    background: cityWeather?.id === m.id ? "#00B4D8" : "rgba(0,180,216,0.1)",
                    border: `1px solid ${cityWeather?.id === m.id ? "#00B4D8" : "rgba(0,180,216,0.3)"}`,
                    color: cityWeather?.id === m.id ? "#0E1626" : "#00B4D8", cursor: "pointer",
                    transition: "all 0.15s"
                  }}
                  onMouseEnter={e => {
                    if (cityWeather?.id !== m.id) {
                      e.currentTarget.style.background = "#00B4D8";
                      e.currentTarget.style.color = "#0E1626";
                    }
                  }}
                  onMouseLeave={e => {
                    if (cityWeather?.id !== m.id) {
                      e.currentTarget.style.background = "rgba(0,180,216,0.1)";
                      e.currentTarget.style.color = "#00B4D8";
                    }
                  }}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Cities in current state */}
          {cities.length > 0 && (
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#4D6080", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                📍 Regional Cities in {stateObj?.name}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, maxHeight: 110, overflowY: "auto", padding: 2 }}>
                {cities.map(c => (
                  <button
                    key={c.id}
                    onClick={() => handleCitySelect({ id: c.id, name: c.name, stateId: selectedState })}
                    style={{
                      padding: "5px 9px", borderRadius: 6, fontSize: 10, fontWeight: 600,
                      background: cityWeather?.id === c.id ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${cityWeather?.id === c.id ? "#10B981" : "rgba(255,255,255,0.1)"}`,
                      color: cityWeather?.id === c.id ? "#10B981" : "#C0CDE0", cursor: "pointer",
                      transition: "all 0.15s"
                    }}
                    onMouseEnter={e => { if (cityWeather?.id !== c.id) e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                    onMouseLeave={e => { if (cityWeather?.id !== c.id) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: "4px 0" }} />

          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, gap: 12 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                border: "3px solid rgba(0,180,216,0.15)", borderTopColor: "#00B4D8",
                animation: "spin 0.8s linear infinite"
              }} />
              <span style={{ fontSize: 12, color: "#8A9BC0" }}>Fetching live weather...</span>
            </div>
          ) : error ? (
            <div style={{ padding: "20px 10px", color: "#EF4444", fontSize: 12, textAlign: "center" }}>
              ⚠️ {error}
            </div>
          ) : cityWeather ? (
            <CityDetailPane city={cityWeather} />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, gap: 12, opacity: 0.4, padding: "40px 10px", textAlign: "center" }}>
              <MapPin size={32} color="#4D6080" />
              <span style={{ fontSize: 12, color: "#8A9BC0" }}>Search and select an Indian city above to fetch live meteorological data from Open-Meteo API.</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
