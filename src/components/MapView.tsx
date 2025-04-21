import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Camera } from "../types/Camera";

type Props = {
  cameras: Camera[];
  onSelectCamera: (camera: Camera) => void;
};

const MapView: React.FC<Props> = ({ cameras, onSelectCamera }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const selectedMarkerRef = useRef<HTMLDivElement | null>(null);
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
  useEffect(() => {
    mapboxgl.accessToken = mapboxToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [46.6753, 24.7136],
      zoom: 10,
    });

    cameras.forEach((camera) => {
      const customMarker = document.createElement("div");

      customMarker.style.width = "10px";
      customMarker.style.height = "10px";
      customMarker.style.backgroundColor = "#FF8400";
      customMarker.style.borderRadius = "50%";
      customMarker.style.cursor = "pointer";
      customMarker.style.border = "1px solid #fff";

      new mapboxgl.Marker(customMarker)
        .setLngLat([camera.longitude, camera.latitude])
        .addTo(map);

      customMarker.addEventListener("click", (e) => {
        e.stopPropagation();

        if (selectedMarkerRef.current) {
          selectedMarkerRef.current.style.backgroundColor = "#FF8400";
        }

        customMarker.style.backgroundColor = "#FF00E1";
        selectedMarkerRef.current = customMarker;

        onSelectCamera(camera);
      });

      customMarker.addEventListener("mouseenter", () => {
        const tooltip = document.createElement("div");
        tooltip.textContent = camera.name;
        tooltip.className = "camera-tooltip";
        tooltip.style.position = "absolute";
        tooltip.style.background = "white";
        tooltip.style.color = "black";
        tooltip.style.padding = "4px 8px";
        tooltip.style.borderRadius = "6px";
        tooltip.style.fontSize = "12px";
        tooltip.style.pointerEvents = "none";
        tooltip.style.zIndex = "1000";
        tooltip.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";

        document.body.appendChild(tooltip);

        const onMouseMove = (e: MouseEvent) => {
          tooltip.style.left = e.pageX + 10 + "px";
          tooltip.style.top = e.pageY + 10 + "px";
        };

        document.addEventListener("mousemove", onMouseMove);

        customMarker.addEventListener(
          "mouseleave",
          () => {
            document.body.removeChild(tooltip);
            document.removeEventListener("mousemove", onMouseMove);
          },
          { once: true }
        );
      });
    });

    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameras]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        margin: "20px 0",
      }}
    />
  );
};

export default MapView;
