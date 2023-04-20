import { useCallback, useRef, useState } from "react";
import { FiCamera } from "react-icons/fi";

import Webcam from "react-webcam";

export const WebcamCapture = () => {
  const webcamRef = useRef<Webcam>(null as any);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [cameraEnabled, setCameraEnabled] = useState<boolean>(false);
  console.log(imgSrc);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImgSrc(imageSrc);
    setCameraEnabled(true);
  }, [webcamRef, setImgSrc]);
  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user",
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        {cameraEnabled && (
          <Webcam
            videoConstraints={videoConstraints}
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
        )}
        {imgSrc && <img src={imgSrc} />}
      </div>
      <button
        onClick={() => capture()}
        title={cameraEnabled ? "Tirar foto" : "Abrir camera"}
      >
        <FiCamera size="40px" color={cameraEnabled ? "red" : "blue"} />
      </button>
    </>
  );
};
