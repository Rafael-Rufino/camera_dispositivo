import { useCallback, useRef, useState } from "react";
import { FiCamera, FiSend } from "react-icons/fi";
import "./styles.css";
import Webcam from "react-webcam";

export const WebcamCapture = () => {
  const webcamRef = useRef<Webcam>(null as any);
  const [imgSrc, setImgSrc] = useState<string>();
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const capture = useCallback(() => {
    setIsCapturing(true);
    try {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
        setImgSrc(imageSrc);
        setCameraEnabled(true);
        // setIsCapturing(false);
      } else {
        throw new Error("Failed to capture image.");
      }
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  }, [webcamRef, setImgSrc, setCameraEnabled, setErrorMsg]);

  const cancel = useCallback(() => {
    setImgSrc(undefined);
    setIsCapturing(false);
    setErrorMsg(null);
    setCameraEnabled(false);
  }, [setImgSrc, setCameraEnabled, setErrorMsg]);

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user",
  };

  function handleSendImage() {
    console.log(imgSrc);
    setCameraEnabled(false);
    setImgSrc(undefined);
    setIsCapturing(false);
  }
  return (
    <>
      <div style={{ display: "flex" }}>
        {!imgSrc && (
          <Webcam
            videoConstraints={videoConstraints}
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{
              display: cameraEnabled ? "block" : "none",
            }}
          />
        )}

        {imgSrc && (
          <img
            src={imgSrc}
            style={{ display: cameraEnabled ? "block" : "none" }}
          />
        )}
      </div>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <>
        {cameraEnabled ? (
          <div className="containerButton">
            <button onClick={cancel} className="cancelar">
              Cancelar
            </button>
            {isCapturing ? (
              <button onClick={handleSendImage} className="send">
                <FiSend size="20px" />
              </button>
            ) : (
              <button onClick={capture} className="capture">
                <FiCamera size="20px" />
                Tirar foto
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={() => setCameraEnabled(true)}
            title={cameraEnabled ? "Tirar foto" : "Abrir camera"}
          >
            <FiCamera size="40px" color={cameraEnabled ? "red" : "blue"} />
          </button>
        )}
      </>
    </>
  );
};
