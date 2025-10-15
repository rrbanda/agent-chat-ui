"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import type { Region } from '@/lib/config-loader';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

interface Globe3DProps {
  regions: Region[];
  onRegionSelect: (regionId: string, regionLabel: string) => void;
}

// Regional configurations with coordinates for 3D globe
const regionCoordinates = {
  north_america: { lat: 40, lng: -100, name: 'North America' },
  south_america: { lat: -15, lng: -60, name: 'South America' },
  europe: { lat: 52, lng: 10, name: 'Europe' },
  asia_pacific: { lat: 25, lng: 110, name: 'Asia Pacific' },
  middle_east_africa: { lat: 15, lng: 35, name: 'Middle East & Africa' },
  china: { lat: 35, lng: 105, name: 'China' },
};

// Countries for each region with their coordinates
const regionCountries = {
  north_america: [
    { name: 'United States', lat: 37.09, lng: -95.71 },
    { name: 'Canada', lat: 56.13, lng: -106.35 },
    { name: 'Mexico', lat: 23.63, lng: -102.55 },
  ],
  south_america: [
    { name: 'Brazil', lat: -14.24, lng: -51.93 },
    { name: 'Argentina', lat: -38.42, lng: -63.62 },
    { name: 'Chile', lat: -35.68, lng: -71.54 },
  ],
  europe: [
    { name: 'United Kingdom', lat: 55.38, lng: -3.44 },
    { name: 'Germany', lat: 51.17, lng: 10.45 },
    { name: 'France', lat: 46.23, lng: 2.21 },
    { name: 'Italy', lat: 41.87, lng: 12.57 },
    { name: 'Spain', lat: 40.46, lng: -3.75 },
  ],
  asia_pacific: [
    { name: 'India', lat: 20.59, lng: 78.96 },
    { name: 'Singapore', lat: 1.35, lng: 103.82 },
    { name: 'Japan', lat: 36.20, lng: 138.25 },
    { name: 'Australia', lat: -25.27, lng: 133.78 },
  ],
  middle_east_africa: [
    { name: 'UAE', lat: 23.42, lng: 53.85 },
    { name: 'Saudi Arabia', lat: 23.89, lng: 45.08 },
    { name: 'South Africa', lat: -30.56, lng: 22.94 },
    { name: 'Egypt', lat: 26.82, lng: 30.80 },
  ],
  china: [
    { name: 'China', lat: 35.86, lng: 104.20 },
  ],
};

export function Globe3D({ regions, onRegionSelect }: Globe3DProps) {
  const globeEl = useRef<any>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  // Create markers for available regions
  const markers = regions.map(region => ({
    id: region.id,
    label: region.label,
    ...regionCoordinates[region.id as keyof typeof regionCoordinates],
    size: 0.8,
    color: selectedRegion === region.id ? '#003D82' : hoveredRegion === region.id ? '#4D94E3' : '#0066CC',
  }));

  // Create arcs/paths for visual effect (optional)
  const arcs = regions.slice(0, -1).map((region, i) => {
    const nextRegion = regions[i + 1];
    const start = regionCoordinates[region.id as keyof typeof regionCoordinates];
    const end = regionCoordinates[nextRegion?.id as keyof typeof regionCoordinates];
    if (!start || !end) return null;
    return {
      startLat: start.lat,
      startLng: start.lng,
      endLat: end.lat,
      endLng: end.lng,
      color: ['rgba(0, 102, 204, 0.3)', 'rgba(77, 148, 227, 0.3)'],
    };
  }).filter((arc): arc is NonNullable<typeof arc> => arc !== null);

  const handleMarkerClick = useCallback((marker: any) => {
    const region = regions.find(r => r.id === marker.id);
    if (region) {
      setSelectedRegion(marker.id);
      setAutoRotate(false);
      onRegionSelect(marker.id, region.label);

      // Animate to region
      if (globeEl.current) {
        globeEl.current.pointOfView(
          {
            lat: marker.lat,
            lng: marker.lng,
            altitude: 1.6,
          },
          1500 // Animation duration
        );
      }
    }
  }, [regions, onRegionSelect]);

  // Initialize globe view
  useEffect(() => {
    // Small delay to ensure globe is fully ready before interacting with it
    const timer = setTimeout(() => {
      if (globeEl.current) {
        // Set initial view to show North America
        globeEl.current.pointOfView({ lat: 40, lng: -100, altitude: 1.8 });
        
        // Controls
        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 0.5;
        globeEl.current.controls().enableZoom = true;
        globeEl.current.controls().minDistance = 150;
        globeEl.current.controls().maxDistance = 400;
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Update auto-rotate
  useEffect(() => {
    if (globeEl.current && globeEl.current.controls()) {
      globeEl.current.controls().autoRotate = autoRotate;
    }
  }, [autoRotate]);

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Globe Container */}
      <div className="w-full h-[480px] rounded-xl overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex-shrink-0">
        <Globe
          ref={globeEl}
          width={1000}
          height={480}
          globeImageUrl="/globe-textures/earth-blue-marble.jpg"
          bumpImageUrl="/globe-textures/earth-topology.png"
          backgroundImageUrl="/globe-textures/night-sky.png"
          
          // Custom markers
          htmlElementsData={markers}
          htmlElement={(d: any) => {
            const el = document.createElement('div');
            el.innerHTML = `
              <div style="
                position: relative;
                cursor: pointer;
                user-select: none;
              ">
                <!-- Outer pulse ring -->
                <div style="
                  position: absolute;
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  background: ${d.color};
                  opacity: 0.2;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  animation: pulse 2s infinite;
                "></div>
                
                <!-- Pin marker -->
                <div style="
                  position: relative;
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: ${d.color};
                  border: 3px solid white;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  transition: all 0.3s ease;
                ">
                  <div style="
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: white;
                    opacity: 0.9;
                  "></div>
                </div>
                
                <!-- Label -->
                <div style="
                  position: absolute;
                  top: -32px;
                  left: 50%;
                  transform: translateX(-50%);
                  background: ${d.id === selectedRegion || d.id === hoveredRegion ? d.color : 'white'};
                  color: ${d.id === selectedRegion || d.id === hoveredRegion ? 'white' : '#374151'};
                  padding: 6px 12px;
                  border-radius: 12px;
                  font-size: 11px;
                  font-weight: 700;
                  white-space: nowrap;
                  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                  font-family: system-ui, -apple-system, sans-serif;
                  transition: all 0.3s ease;
                  border: 2px solid ${d.color};
                ">
                  ${d.label}
                </div>
              </div>
              
              <style>
                @keyframes pulse {
                  0%, 100% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 0.2;
                  }
                  50% {
                    transform: translate(-50%, -50%) scale(1.2);
                    opacity: 0;
                  }
                }
              </style>
            `;
            
            el.style.pointerEvents = 'auto';
            el.addEventListener('mouseenter', () => setHoveredRegion(d.id));
            el.addEventListener('mouseleave', () => setHoveredRegion(null));
            el.addEventListener('click', () => handleMarkerClick(d));
            
            return el;
          }}
          
          // Atmosphere
          atmosphereColor="#0066CC"
          atmosphereAltitude={0.15}
          
          // Arcs (optional connections)
          arcsData={arcs}
          arcColor="color"
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={3000}
          arcStroke={0.5}
          
          // Lighting
          enablePointerInteraction={true}
        />
        
        {/* Gradient overlay for better integration */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/10 to-transparent dark:from-gray-900/20" />
      </div>

      {/* Controls & Legend - Combined */}
      <div className="mt-auto pt-6 pb-4 flex items-center justify-center gap-6 flex-wrap">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="flex items-center gap-2 px-3 py-2 hover:opacity-70 transition-opacity duration-200"
        >
          <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {autoRotate ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            )}
          </svg>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {autoRotate ? 'Pause' : 'Rotate'}
          </span>
        </button>

        <button
          onClick={() => {
            if (globeEl.current) {
              globeEl.current.pointOfView({ lat: 40, lng: -100, altitude: 1.8 }, 1000);
              setSelectedRegion(null);
              setAutoRotate(true);
            }
          }}
          className="flex items-center gap-2 px-3 py-2 hover:opacity-70 transition-opacity duration-200"
        >
          <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Reset View
          </span>
        </button>

        <div className="h-5 w-px bg-gray-300 dark:bg-gray-600"></div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#0066CC' }}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#003D82' }}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Selected</span>
          </div>
        </div>
      </div>

      {/* Selected Region Info */}
      {selectedRegion && (
        <div className="mt-2 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0066CC] to-[#003D82] text-white rounded-full px-5 py-2.5 shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

