import React, { useState } from "react";
import { getTempColor } from "../data/indiaHeatData";

/**
 * Simplified SVG paths for major Indian states.
 * Normalized to a 400×480 viewBox.
 */
const STATE_PATHS = {
  "jammu-kashmir":      "M 155,10 L 195,14 L 215,30 L 210,52 L 195,68 L 180,72 L 165,65 L 148,55 L 140,38 L 145,22 Z",
  "himachal-pradesh":   "M 178,72 L 210,75 L 222,92 L 210,108 L 195,110 L 178,102 L 172,88 Z",
  "punjab":             "M 148,75 L 178,78 L 178,102 L 162,112 L 145,108 L 138,92 Z",
  "uttarakhand":        "M 210,108 L 240,105 L 252,118 L 248,135 L 228,138 L 212,128 Z",
  "haryana":            "M 145,108 L 178,102 L 195,110 L 196,130 L 178,140 L 158,138 L 145,125 Z",
  "delhi":              "M 178,130 L 196,128 L 200,140 L 185,148 L 172,142 Z",
  "rajasthan":          "M 100,118 L 148,108 L 162,112 L 178,140 L 196,155 L 192,195 L 175,220 L 152,238 L 118,230 L 92,205 L 85,172 L 90,145 Z",
  "uttar-pradesh":      "M 196,130 L 250,118 L 282,128 L 300,148 L 295,178 L 270,195 L 238,202 L 210,198 L 192,195 L 196,155 Z",
  "bihar":              "M 295,155 L 330,150 L 355,162 L 358,185 L 340,200 L 312,205 L 295,195 Z",
  "jharkhand":          "M 310,205 L 355,202 L 372,218 L 368,242 L 345,252 L 318,248 L 305,230 Z",
  "west-bengal":        "M 352,162 L 380,160 L 392,180 L 388,210 L 372,235 L 358,245 L 342,240 L 338,218 L 352,205 Z",
  "odisha":             "M 318,248 L 355,248 L 375,262 L 372,290 L 350,305 L 322,300 L 305,282 L 308,260 Z",
  "madhya-pradesh":     "M 155,235 L 210,220 L 240,225 L 270,220 L 298,228 L 310,255 L 295,280 L 265,292 L 230,290 L 200,285 L 172,272 L 155,255 Z",
  "gujarat":            "M 68,200 L 100,195 L 118,215 L 128,240 L 122,268 L 108,285 L 82,285 L 62,270 L 55,245 L 58,220 Z",
  "maharashtra":        "M 128,240 L 165,255 L 200,258 L 230,260 L 245,282 L 238,310 L 215,330 L 185,338 L 158,325 L 132,308 L 115,285 L 115,260 Z",
  "chhattisgarh":       "M 270,255 L 310,258 L 318,285 L 308,310 L 282,322 L 258,315 L 245,292 L 255,268 Z",
  "andhra-pradesh":     "M 215,335 L 255,318 L 282,325 L 305,345 L 308,375 L 290,395 L 262,402 L 235,395 L 215,372 L 210,350 Z",
  "telangana":          "M 238,310 L 270,302 L 295,310 L 310,335 L 308,358 L 290,368 L 265,365 L 245,348 L 238,328 Z",
  "karnataka":          "M 158,330 L 215,338 L 242,355 L 255,380 L 248,408 L 225,420 L 198,418 L 175,405 L 158,382 L 148,355 Z",
  "tamil-nadu":         "M 225,420 L 260,410 L 278,425 L 282,450 L 268,468 L 245,472 L 225,458 L 215,438 Z",
  "kerala":             "M 175,408 L 200,420 L 215,440 L 215,462 L 200,472 L 182,462 L 172,445 L 168,428 Z",
};

const LABEL_CENTERS = {
  "rajasthan":        { x: 138, y: 172 },
  "madhya-pradesh":   { x: 228, y: 258 },
  "maharashtra":      { x: 175, y: 295 },
  "uttar-pradesh":    { x: 245, y: 162 },
  "gujarat":          { x: 88,  y: 248 },
  "karnataka":        { x: 192, y: 375 },
  "andhra-pradesh":   { x: 258, y: 362 },
  "tamil-nadu":       { x: 250, y: 445 },
  "telangana":        { x: 272, y: 335 },
  "odisha":           { x: 340, y: 272 },
  "west-bengal":      { x: 370, y: 198 },
  "delhi":            { x: 186, y: 138 },
  "bihar":            { x: 325, y: 178 },
  "jharkhand":        { x: 338, y: 228 },
  "haryana":          { x: 170, y: 120 },
  "chhattisgarh":     { x: 280, y: 288 },
};

function getStateTemp(stateId, citiesData) {
  const cities = citiesData[stateId] || [];
  if (!cities.length) return 28;
  return cities.reduce((a, c) => a + c.temp, 0) / cities.length;
}

function getPathCenter(pathStr) {
  const nums = [...pathStr.matchAll(/-?\d+\.?\d*/g)].map(m => parseFloat(m[0]));
  const xs = [], ys = [];
  for (let i = 0; i < nums.length; i += 2) {
    if (!isNaN(nums[i]) && !isNaN(nums[i + 1])) { xs.push(nums[i]); ys.push(nums[i + 1]); }
  }
  return {
    x: xs.reduce((a, b) => a + b, 0) / xs.length,
    y: ys.reduce((a, b) => a + b, 0) / ys.length,
  };
}

export default function IndiaMapSVG({ citiesData, selectedState, onSelectState, states }) {
  const [hoveredState, setHoveredState] = useState(null);

  const getInfo = (stateId) => {
    const avgTemp = getStateTemp(stateId, citiesData);
    const tc = getTempColor(avgTemp);
    const cities = citiesData[stateId] || [];
    const maxTemp = cities.length ? Math.max(...cities.map(c => c.temp)) : avgTemp;
    const stateObj = states.find(s => s.id === stateId);
    const isSelected = selectedState === stateId;
    const isHovered = hoveredState === stateId;
    return { avgTemp, maxTemp, tc, stateObj, isSelected, isHovered };
  };

  const activeId = hoveredState || selectedState;
  const activeInfo = activeId ? getInfo(activeId) : null;

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <svg
        viewBox="40 5 355 478"
        style={{ width: "100%", maxWidth: 400, height: "auto", filter: "drop-shadow(0 6px 28px rgba(0,0,0,0.6))" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sea background */}
        <rect x="40" y="5" width="355" height="478" rx="10"
          fill="rgba(0,18,45,0.6)" stroke="rgba(0,180,216,0.12)" strokeWidth="1" />

        {/* Grid lines (subtle) */}
        {[80,120,160,200,240,280,320,360,400].map(y => (
          <line key={`h${y}`} x1="40" y1={y} x2="395" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        ))}
        {[80,120,160,200,240,280,320,360].map(x => (
          <line key={`v${x}`} x1={x} y1="5" x2={x} y2="483" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        ))}

        {/* States */}
        {Object.entries(STATE_PATHS).map(([stateId, path]) => {
          const { tc, isSelected, isHovered } = getInfo(stateId);
          const fillOpacity = isSelected ? 1 : isHovered ? 0.88 : 0.65;
          return (
            <g key={stateId}>
              <path
                d={path}
                fill={tc.color}
                fillOpacity={fillOpacity}
                stroke={isSelected ? "#fff" : isHovered ? tc.color : "rgba(255,255,255,0.2)"}
                strokeWidth={isSelected ? 2 : isHovered ? 1.5 : 0.7}
                style={{
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  filter: isSelected ? `drop-shadow(0 0 10px ${tc.glow})` : isHovered ? `drop-shadow(0 0 5px ${tc.glow})` : "none",
                }}
                onClick={() => onSelectState(stateId)}
                onMouseEnter={() => setHoveredState(stateId)}
                onMouseLeave={() => setHoveredState(null)}
              />
            </g>
          );
        })}

        {/* Permanent short labels for large states */}
        {Object.entries(LABEL_CENTERS).map(([stateId, { x, y }]) => {
          const { tc, isSelected } = getInfo(stateId);
          const avgTemp = getStateTemp(stateId, citiesData);
          return (
            <text
              key={stateId}
              x={x} y={y}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={isSelected ? "9" : "7.5"}
              fontWeight={isSelected ? "800" : "600"}
              fill={isSelected ? "#fff" : "rgba(255,255,255,0.75)"}
              style={{ pointerEvents: "none", fontFamily: "JetBrains Mono, monospace" }}
            >
              {isSelected ? `${avgTemp.toFixed(0)}°C` : avgTemp.toFixed(0) + "°"}
            </text>
          );
        })}

        {/* Compass rose */}
        <text x="60" y="470" fontSize="9" fill="rgba(255,255,255,0.25)" fontFamily="sans-serif">N↑</text>
      </svg>

      {/* Hover / selected tooltip */}
      {activeInfo && (
        <div style={{
          background: "rgba(8,14,30,0.95)",
          border: `1px solid ${activeInfo.tc.color}50`,
          borderRadius: 9, padding: "9px 16px",
          textAlign: "center", pointerEvents: "none",
          boxShadow: `0 4px 20px ${activeInfo.tc.glow}`,
          width: "100%", maxWidth: 400,
        }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#F0F4FF" }}>{activeInfo.stateObj?.name || activeId}</div>
          <div style={{ fontSize: 12, color: activeInfo.tc.color, fontFamily: "JetBrains Mono, monospace", marginTop: 2 }}>
            Avg {activeInfo.avgTemp.toFixed(1)}°C · Max {activeInfo.maxTemp.toFixed(1)}°C
          </div>
          <div style={{ fontSize: 10, color: "#4D6080", marginTop: 2 }}>{activeInfo.tc.label}</div>
        </div>
      )}
    </div>
  );
}
