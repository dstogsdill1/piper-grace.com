"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon } from "leaflet";
import { rodeoEvents, RodeoEvent } from "@/data/rodeoEvents";

// Leaflet CSS must be imported
import "leaflet/dist/leaflet.css";

// Custom cowboy hat marker icon
const cowboyHatIcon = new Icon({
  iconUrl: "/images/rodeo-marker.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Fallback emoji marker if image not available
const createEmojiMarker = () =>
  divIcon({
    html: `<div style="font-size: 28px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">🤠</div>`,
    className: "emoji-marker",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });

interface RodeoMapProps {
  className?: string;
  height?: string;
  showList?: boolean;
}

export default function RodeoMap({
  className = "",
  height = "h-[500px]",
  showList = true,
}: RodeoMapProps) {
  const [selectedEvent, setSelectedEvent] = useState<RodeoEvent | null>(null);
  const [useEmoji, setUseEmoji] = useState(true);

  // Check if custom marker image exists
  useEffect(() => {
    const img = new Image();
    img.onload = () => setUseEmoji(false);
    img.onerror = () => setUseEmoji(true);
    img.src = "/images/rodeo-marker.png";
  }, []);

  // Center on continental US
  const center: [number, number] = [39.5, -98.35];
  const zoom = 4;

  const markerIcon = useEmoji ? createEmojiMarker() : cowboyHatIcon;

  return (
    <div className={`w-full ${className}`}>
      {/* Map Container */}
      <div className={`${height} w-full rounded-2xl overflow-hidden shadow-xl border-4 border-primary/30`}>
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={true}
          className="h-full w-full"
          style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
        >
          {/* Dark themed tile layer */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {/* Rodeo Event Markers */}
          {rodeoEvents.map((event) => (
            <Marker
              key={event.id}
              position={[event.lat, event.lng]}
              icon={markerIcon}
              eventHandlers={{
                click: () => setSelectedEvent(event),
              }}
            >
              <Popup className="rodeo-popup">
                <div className="min-w-[200px] p-1">
                  <h3 className="font-bold text-lg text-primary mb-1">
                    🤠 {event.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    📍 {event.city}, {event.state}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    🏟️ {event.venue}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    📅 {new Date(event.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  {event.description && (
                    <p className="text-xs text-gray-500 italic mb-2">
                      {event.description}
                    </p>
                  )}
                  {event.website && (
                    <a
                      href={event.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:underline"
                    >
                      Visit Website →
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Event List */}
      {showList && (
        <div className="mt-6">
          <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <span>🏇</span> Upcoming Rodeos
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
                  onClick={() => setSelectedEvent(event)}
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

      {/* Custom styles for Leaflet popups */}
      <style jsx global>{`
        .emoji-marker {
          background: transparent;
          border: none;
        }
        .rodeo-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
        .rodeo-popup .leaflet-popup-tip {
          background: white;
        }
        .leaflet-container {
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}
