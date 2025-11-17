"use client"

import { useEffect, useRef, useState } from "react"

function getSkyColors(hour: number) {
  if (hour >= 5 && hour < 10) {
    return ["#FFD580", "#FFFAE3"] // pagi
  } else if (hour >= 10 && hour < 15) {
    return ["#87CEEB", "#E0F6FF"] // siang
  } else if (hour >= 15 && hour < 18) {
    return ["#FFA07A", "#FFDAB9"] // sore
  } else {
    return ["#0f172a", "#1e293b"] // malam
  }
}
export function LandscapeIllustration() {
  const svgRef = useRef<SVGSVGElement>(null)
   const [sky, setSky] = useState(["#87CEEB", "#E0F6FF"])

  useEffect(() => {
     const hour = new Date().getHours()
    setSky(getSkyColors(hour))
    // Add subtle animations to landscape elements
    const svg = svgRef.current
    if (!svg) return

    const trees = svg.querySelectorAll(".tree")
    const buildings = svg.querySelectorAll(".building")

    trees.forEach((tree, index) => {
      const element = tree as SVGElement
      element.style.animation = `float 4s ease-in-out infinite`
      element.style.animationDelay = `${index * 0.5}s`
    })

    buildings.forEach((building, index) => {
      const element = building as SVGElement
      element.style.animation = `slideInUp 1s ease-out forwards`
      element.style.animationDelay = `${index * 0.2}s`
    })
  }, [])

  return (
   <svg ref={svgRef} viewBox="0 0 1200 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={sky[0]} />
          <stop offset="100%" stopColor={sky[1]} />
        </linearGradient>
        <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#90EE90" />
          <stop offset="100%" stopColor="#228B22" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="1200" height="300" fill="url(#skyGradient)" />

      {/* Clouds */}
      <g className="clouds">
        <image href="/assets/awan.png" x="150" y="40" width="120" height="80" opacity="0.9" />
        <image href="/assets/awan.png" x="750" y="30" width="160" height="100" opacity="0.85" />
      </g>

      {/* Hills/Mountains */}
      <path d="M0,250 Q300,200 600,230 T1200,210 L1200,400 L0,400 Z" fill="url(#grassGradient)" opacity="0.8" />

      {/* Trees */}
      <g className="trees">
        <g className="tree">
          <rect x="150" y="280" width="8" height="40" fill="#8B4513" />
          <circle cx="154" cy="275" r="20" fill="#228B22" />
        </g>
        <g className="tree">
          <rect x="300" y="290" width="6" height="30" fill="#8B4513" />
          <circle cx="303" cy="285" r="15" fill="#32CD32" />
        </g>
        <g className="tree">
          <rect x="450" y="285" width="8" height="35" fill="#8B4513" />
          <circle cx="454" cy="280" r="18" fill="#228B22" />
        </g>
        <g className="tree">
          <rect x="950" y="275" width="10" height="45" fill="#8B4513" />
          <circle cx="955" cy="270" r="22" fill="#228B22" />
        </g>
      </g>

      {/* Buildings */}
      <g className="buildings">
        <g className="building">
          <rect x="1000" y="220" width="40" height="80" fill="#FF6B6B" />
          <polygon points="1000,220 1020,200 1040,220" fill="#8B0000" />
          <rect x="1005" y="240" width="8" height="12" fill="#4169E1" />
          <rect x="1027" y="240" width="8" height="12" fill="#4169E1" />
          <rect x="1005" y="270" width="8" height="12" fill="#4169E1" />
          <rect x="1027" y="270" width="8" height="12" fill="#4169E1" />
        </g>

        <g className="building">
          <rect x="1050" y="240" width="35" height="60" fill="#4169E1" />
          <polygon points="1050,240 1067.5,225 1085,240" fill="#000080" />
          <rect x="1055" y="255" width="6" height="10" fill="#87CEEB" />
          <rect x="1070" y="255" width="6" height="10" fill="#87CEEB" />
          <rect x="1055" y="275" width="6" height="10" fill="#87CEEB" />
          <rect x="1070" y="275" width="6" height="10" fill="#87CEEB" />
        </g>

        <g className="building">
          <rect x="1090" y="250" width="30" height="50" fill="#FFD700" />
          <polygon points="1090,250 1105,235 1120,250" fill="#FFA500" />
          <rect x="1095" y="265" width="5" height="8" fill="#4169E1" />
          <rect x="1110" y="265" width="5" height="8" fill="#4169E1" />
          <rect x="1095" y="280" width="5" height="8" fill="#4169E1" />
          <rect x="1110" y="280" width="5" height="8" fill="#4169E1" />
        </g>
      </g>

      {/* Kulon Progo Banner */}
      <g className="banner">
        <rect x="500" y="320" width="200" height="40" rx="20" fill="#228B22" opacity="0.9" />
        <text x="600" y="345" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
          Kulon Progo
        </text>
      </g>

      {/* Road */}
      <rect x="0" y="380" width="1200" height="20" fill="#696969" />
      <rect
        x="0"
        y="388"
        width="1200"
        height="2"
        fill="white"
        opacity="0.8"
        strokeDasharray="20,10"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  )
}
