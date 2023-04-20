import CaptureImage from "./components/CaptureImage";
import { WebcamCapture } from "./components/WebcamCapture";

import useMobile from "./utils/screenDemension";

function App() {
  const isMobile = useMobile();
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {isMobile ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column-reverse",
            }}
          >
            <CaptureImage />
          </div>
        ) : (
          <div
            style={{
              display: "block",
            }}
          >
            <WebcamCapture />
            <CaptureImage />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
