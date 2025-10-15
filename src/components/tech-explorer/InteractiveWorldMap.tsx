"use client";

import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import type { Region } from '@/lib/config-loader';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface InteractiveWorldMapProps {
  regions: Region[];
  onRegionSelect: (regionId: string, regionLabel: string) => void;
}

// Regional configurations with countries and coordinates
const regionConfig = {
  north_america: {
    countries: ['USA', 'CAN', 'MEX'],
    marker: { coordinates: [-100, 45], label: 'North America' }
  },
  south_america: {
    countries: ['BRA', 'ARG', 'CHL', 'COL', 'PER', 'VEN', 'ECU', 'BOL'],
    marker: { coordinates: [-60, -15], label: 'South America' }
  },
  europe: {
    countries: ['GBR', 'DEU', 'FRA', 'ITA', 'ESP', 'POL', 'NLD', 'BEL', 'CHE', 'AUT', 'SWE', 'NOR', 'DNK', 'FIN'],
    marker: { coordinates: [10, 52], label: 'Europe' }
  },
  asia_pacific: {
    countries: ['IND', 'SGP', 'HKG', 'JPN', 'AUS', 'NZL', 'THA', 'MYS', 'IDN', 'PHL', 'VNM'],
    marker: { coordinates: [80, 25], label: 'Asia Pacific' }
  },
  middle_east_africa: {
    countries: ['ARE', 'SAU', 'ZAF', 'EGY', 'KEN', 'NGA', 'ISR', 'QAT', 'KWT'],
    marker: { coordinates: [35, 25], label: 'Middle East & Africa' }
  },
  china: {
    countries: ['CHN'],
    marker: { coordinates: [105, 35], label: 'China' }
  },
};

export function InteractiveWorldMap({ regions, onRegionSelect }: InteractiveWorldMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const getCountryRegion = (geoId: string): string | null => {
    for (const [regionId, config] of Object.entries(regionConfig)) {
      if (config.countries.includes(geoId)) {
        return regionId;
      }
    }
    return null;
  };

  const isRegionAvailable = (regionId: string): boolean => {
    return regions.some(r => r.id === regionId);
  };

  const handleCountryClick = (geoId: string) => {
    const regionId = getCountryRegion(geoId);
    if (regionId && isRegionAvailable(regionId)) {
      const region = regions.find(r => r.id === regionId);
      if (region) {
        setSelectedRegion(regionId);
        onRegionSelect(regionId, region.label);
      }
    }
  };

  const handleMarkerClick = (regionId: string) => {
    if (isRegionAvailable(regionId)) {
      const region = regions.find(r => r.id === regionId);
      if (region) {
        setSelectedRegion(regionId);
        onRegionSelect(regionId, region.label);
      }
    }
  };

  const getCountryFill = (geoId: string, isDark: boolean = false): string => {
    const regionId = getCountryRegion(geoId);
    
    if (!regionId || !isRegionAvailable(regionId)) {
      return isDark ? '#374151' : '#E5E7EB'; // Gray for unavailable
    }

    if (selectedRegion === regionId) {
      return '#003D82'; // Dark Citi Blue for selected
    }

    if (hoveredRegion === regionId) {
      return '#4D94E3'; // Light Citi Blue for hover
    }

    return '#0066CC'; // Citi Blue for available
  };

  return (
    <div className="relative w-full">
      <div className="bg-gradient-to-br from-blue-50 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-inner">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 120,
            center: [10, 20],
          }}
          className="w-full h-auto drop-shadow-sm"
          height={450}
        >
          <defs>
            <linearGradient id="regionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0066CC" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#003D82" stopOpacity="0.95" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo: any) => {
                const geoId = geo.id;
                const regionId = getCountryRegion(geoId);
                const isAvailable = regionId && isRegionAvailable(regionId);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getCountryFill(geoId)}
                    stroke="#FFFFFF"
                    strokeWidth={0.75}
                    style={{
                      default: { 
                        outline: 'none',
                        transition: 'all 0.2s ease',
                      },
                      hover: {
                        fill: isAvailable ? '#4D94E3' : '#D1D5DB',
                        outline: 'none',
                        cursor: isAvailable ? 'pointer' : 'default',
                        filter: isAvailable ? 'url(#glow)' : 'none',
                        strokeWidth: 1,
                      },
                      pressed: {
                        fill: isAvailable ? '#003D82' : '#D1D5DB',
                        outline: 'none',
                      },
                    }}
                    onMouseEnter={() => {
                      if (regionId && isAvailable) {
                        setHoveredRegion(regionId);
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredRegion(null);
                    }}
                    onClick={() => {
                      if (isAvailable) {
                        handleCountryClick(geoId);
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>

        {/* Regional Markers/Labels */}
        {Object.entries(regionConfig).map(([regionId, config]) => {
          if (!isRegionAvailable(regionId)) return null;
          
          const isSelected = selectedRegion === regionId;
          const isHovered = hoveredRegion === regionId;

          return (
            <Marker
              key={regionId}
              coordinates={config.marker.coordinates as [number, number]}
              onClick={() => handleMarkerClick(regionId)}
              style={{ cursor: 'pointer' }}
            >
              <g>
                {/* Outer glow for selected/hovered */}
                {(isHovered || isSelected) && (
                  <circle
                    r={14}
                    fill={isSelected ? '#003D82' : '#4D94E3'}
                    opacity={0.15}
                    className="animate-pulse"
                  />
                )}
                
                {/* Pulse effect for hovered/selected */}
                {(isHovered || isSelected) && (
                  <circle
                    r={12}
                    fill="none"
                    stroke={isSelected ? '#003D82' : '#4D94E3'}
                    strokeWidth={1.5}
                    opacity={0.5}
                    className="animate-ping"
                  />
                )}

                {/* Marker circle shadow */}
                <circle
                  r={9}
                  fill="#000000"
                  opacity={0.15}
                  transform="translate(0, 1)"
                />

                {/* Marker circle */}
                <circle
                  r={9}
                  fill={isSelected ? '#003D82' : isHovered ? '#4D94E3' : '#0066CC'}
                  stroke="#FFFFFF"
                  strokeWidth={2.5}
                  className="transition-all duration-200"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                  }}
                />
                
                {/* Inner dot */}
                <circle
                  r={3}
                  fill="#FFFFFF"
                  opacity={0.9}
                />

                {/* Label background */}
                <rect
                  x={-config.marker.label.length * 3.2}
                  y={-28}
                  width={config.marker.label.length * 6.4}
                  height={18}
                  rx={6}
                  fill={isSelected ? '#003D82' : isHovered ? '#0066CC' : '#FFFFFF'}
                  opacity={isSelected || isHovered ? 0.95 : 0.9}
                  className="pointer-events-none transition-all duration-200"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                  }}
                />

                {/* Label */}
                <text
                  textAnchor="middle"
                  y={-16}
                  className="text-xs font-bold pointer-events-none select-none transition-all duration-200"
                  fill={isSelected || isHovered ? '#FFFFFF' : '#374151'}
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  {config.marker.label}
                </text>
              </g>
            </Marker>
          );
        })}
      </ComposableMap>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-8">
        <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl px-5 py-3 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Click on a region
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl px-4 py-2.5 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: '#0066CC' }}></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Available</span>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl px-4 py-2.5 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: '#003D82' }}></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Selected</span>
          </div>
        </div>
      </div>

      {/* Selected Region Info */}
      {selectedRegion && (
        <div className="mt-6 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0066CC] to-[#003D82] text-white rounded-full px-6 py-3 shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-semibold">
              Selected: {regions.find(r => r.id === selectedRegion)?.label}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

