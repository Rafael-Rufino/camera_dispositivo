import CaptureImage from "./components/CaptureImage";
import { WebcamCapture } from "./components/WebcamCapture";
import useMobile from "./utils/screenDemension";

function App() {
  const isMobile = useMobile();
  return (
    <>
      <div
        style={{
          display: "block",
          alignItems: "center",
          flexDirection: "column-reverse",
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
          <>
            <WebcamCapture />
            <CaptureImage />
          </>
        )}
      </div>
    </>
  );
}

export default App;
