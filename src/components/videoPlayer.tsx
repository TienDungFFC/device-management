import fs from "fs";
import path from "path";

const VideoPlayer = ({ src }: { src?: string }) => {
  const videoAbsolutePath = path.join(process.cwd(), "", src || "");

  if (!src) {
    return "There are no videos available";
  }
  return (
    <div className="w-full mx-auto">
      <video
        className="w-full h-auto"
        controls
        src={`/videos/${src}.mp4`}
        typeof="video/mp4"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
