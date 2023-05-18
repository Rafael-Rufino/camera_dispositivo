import CaptureImage from "./components/CaptureImage";
import { WebcamCapture } from "./components/WebcamCapture";

function App() {
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
        <div
          style={{
            display: "block",
          }}
        >
          <WebcamCapture />
          <CaptureImage />
        </div>
      </div>
    </>
  );
}

export default App;
