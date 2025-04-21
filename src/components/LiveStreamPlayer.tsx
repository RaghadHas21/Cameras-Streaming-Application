import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

type Props = {
  streamUrl: string;
  cameraName: string;
};

const LiveStreamPlayer: React.FC<Props> = ({ streamUrl, cameraName }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let hls: Hls | null = null;

    if (videoRef.current) {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(streamUrl);
        hls.attachMedia(videoRef.current);
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = streamUrl;
      }
    }

    return () => {
      hls?.destroy();
    };
  }, [streamUrl]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h4>Camera Name: {cameraName}</h4>
      <video
        ref={videoRef}
        controls
        autoPlay
        style={{ width: "100%", borderRadius: "10px" }}
      />
    </div>
  );
};

export default LiveStreamPlayer;
