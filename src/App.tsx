import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import LiveStreamPlayer from "./components/LiveStreamPlayer";
import { Camera } from "./types/Camera";
function App() {
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [cameras, setCameras] = useState<Camera[]>([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${apiUrl}/cameras`)
      .then((res) => res.json())
      .then((data) => setCameras(data))
      .catch((err) => console.error("Failed to fetch cameras", err));
  }, []);
  return (
    <div style={{ padding: "10px" }}>
      <div style={{ display: "flex", gap: "1px" }}>
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
          <MapView
            cameras={cameras}
            onSelectCamera={(camera) => setSelectedCamera(camera)}
          />
        </div>
        {selectedCamera && (
          <div
            style={{
              position: "absolute",
              marginTop: "30px",
              marginRight: "10px",
              top: "20px",
              right: "20px",
              width: "400px",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              padding: "16px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              zIndex: 1000,
            }}
          >
            <LiveStreamPlayer
              streamUrl={selectedCamera.streamUrl}
              cameraName={selectedCamera.name}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
