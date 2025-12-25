"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { rodeoEvents, RodeoEvent } from "@/data/rodeoEvents";

interface RodeoMapProps {
  className?: string;
  height?: string;
  showList?: boolean;
  mapboxToken?: string;
}

export default function RodeoMap({
  className = "",
  height = "h-[500px]",
  showList = true,
  mapboxToken,
}: RodeoMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const map = useRef<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<RodeoEvent | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  // Try both env var names for flexibility
  const accessToken = mapboxToken || process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  // Fly to a rodeo location
  const flyToRodeo = useCallback((event: RodeoEvent) => {
    if (!map.current || !mapLoaded) return;
    
    setSelectedEvent(event);
    
    map.current.flyTo({
      center: [event.lng, event.lat],
      zoom: 12,
      pitch: 60,
      bearing: Math.random() * 90 - 45,
      duration: 2500,
      essential: true,
    });
  }, [mapLoaded]);

  // Initialize Mapbox
  useEffect(() => {
    if (!accessToken) {
      setMapError(true);
      return;
    }

    if (map.current || !mapContainer.current) return;

    const initMap = async () => {
      try {
        const mapboxgl = (await import("mapbox-gl")).default;

        // Load CSS
        if (!document.querySelector('link[href*="mapbox-gl"]')) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css";
          document.head.appendChild(link);
        }

        mapboxgl.accessToken = accessToken;

        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style: "mapbox://styles/mapbox/satellite-streets-v12",
          center: [-98.35, 39.5],
          zoom: 3.5,
          pitch: 45,
          bearing: 0,
          interactive: true,
          attributionControl: false,
        });

        map.current.addControl(new mapboxgl.NavigationControl(), "top-left");

        map.current.on("load", () => {
          setMapLoaded(true);

          // Add glowing markers for each rodeo
          rodeoEvents.forEach((event, index) => {
            const el = document.createElement("div");
            el.className = "rodeo-marker";
            el.style.cursor = "pointer";

            const colors = [
              "#f43f5e", "#f97316", "#eab308", "#22c55e", "#06b6d4", 
              "#8b5cf6", "#ec4899", "#f43f5e", "#f97316", "#eab308",
              "#22c55e", "#06b6d4", "#8b5cf6", "#ec4899", "#f43f5e"
            ];
            const color = colors[index % colors.length];

            el.innerHTML = `
              <div style="position: relative;">
                <div style="position: absolute; inset: -15px; background: radial-gradient(circle, ${color}60, transparent 70%); border-radius: 50%; animation: rodeo-pulse 2s ease-in-out infinite;"></div>
                <div style="font-size: 36px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.6));">🤠</div>
              </div>
            `;

            el.addEventListener("click", () => flyToRodeo(event));

            const popup = new mapboxgl.Popup({ offset: 25, closeButton: true })
              .setHTML(`
                <div style="padding: 12px; min-width: 220px; font-family: system-ui, sans-serif;">
                  <h3 style="font-weight: bold; font-size: 16px; color: #8b5cf6; margin-bottom: 8px;">
                    🤠 ${event.name}
                  </h3>
                  <p style="font-size: 13px; color: #555; margin: 4px 0;">
                    📍 ${event.city}, ${event.state}
                  </p>
                  <p style="font-size: 13px; color: #555; margin: 4px 0;">
                    🏟️ ${event.venue}
                  </p>
                  <p style="font-size: 13px; color: #555; margin: 4px 0;">
                    📅 ${new Date(event.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric", 
                      year: "numeric",
                    })}
                  </p>
                  ${event.description ? `<p style="font-size: 12px; color: #777; font-style: italic; margin-top: 8px; border-top: 1px solid #eee; padding-top: 8px;">${event.description}</p>` : ""}
                  ${event.website ? `<a href="${event.website}" target="_blank" rel="noopener" style="display: inline-block; margin-top: 8px; font-size: 12px; color: #8b5cf6; text-decoration: none; font-weight: 600;">Visit Website →</a>` : ""}
                </div>
              `);

            new mapboxgl.Marker(el)
              .setLngLat([event.lng, event.lat])
              .setPopup(popup)
              .addTo(map.current!);
          });

          // Add dashed route connecting rodeos chronologically
          const sortedEvents = [...rodeoEvents].sort((a, b) => 
            new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          const coordinates = sortedEvents.map((e) => [e.lng, e.lat]);

          map.current!.addSource("rodeo-route", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: { type: "LineString", coordinates },
            },
          });

          map.current!.addLayer({
            id: "rodeo-route",
            type: "line",
            source: "rodeo-route",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: {
              "line-color": "#f97316",
              "line-width": 3,
              "line-opacity": 0.5,
              "line-dasharray": [2, 4],
            },
          });

          // Auto fly-through intro animation
          setTimeout(() => {
            if (map.current) {
              map.current.flyTo({
                center: [-95.4107, 29.6847],
                zoom: 7,
                pitch: 60,
                bearing: 25,
                duration: 4000,
              });
            }
          }, 1500);
        });
      } catch (error) {
        console.error("Failed to load Mapbox:", error);
        setMapError(true);
      }
    };

    initMap();

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [accessToken, flyToRodeo]);

  if (!accessToken || mapError) {
    return (
      <div className={`${height} w-full flex items-center justify-center bg-base-200 rounded-2xl`}>
        <div className="text-center px-6">
          <div className="text-5xl mb-4">🗺️</div>
          <h3 className="text-xl font-bold text-primary mb-2">Map Loading...</h3>
          <p className="text-sm opacity-70">Interactive rodeo map coming soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Map Container */}
      <div 
        ref={mapContainer}
        className={`${height} w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/30`}
      />

      {/* Event List - Click to fly! */}
      {showList && (
        <div className="mt-6">
          <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <span>🏇</span> Upcoming Rodeos <span className="text-sm font-normal opacity-60">(Click to fly there!)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rodeoEvents
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((event) => (
                <div
                  key={event.id}
                  className={`card bg-base-200 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 ${
                    selectedEvent?.id === event.id
                      ? "border-primary scale-105"
                      : "border-transparent hover:border-secondary"
                  }`}
                  onClick={() => flyToRodeo(event)}
                >
                  <div className="card-body p-4">
                    <h4 className="card-title text-sm text-primary">
                      🤠 {event.name}
                    </h4>
                    <p className="text-xs opacity-70">
                      📍 {event.city}, {event.state}
                    </p>
                    <p className="text-xs opacity-70">
                      📅 {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Mapbox styles */}
      <style jsx global>{`
        @keyframes rodeo-pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.4); opacity: 0.3; }
        }
        .mapboxgl-popup-content {
          border-radius: 16px !important;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4) !important;
          padding: 0 !important;
        }
        .mapboxgl-popup-close-button {
          font-size: 20px;
          padding: 8px;
          color: #888;
        }
        .mapboxgl-popup-tip {
          border-top-color: white !important;
        }
      `}</style>
    </div>
  );
}
