import { useState, useRef } from "react";

import axios from "axios";

import { FiCamera } from "react-icons/fi";

export function Screenshot() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturing, setCapturing] = useState(false);

  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCapturing(true);
      }
    } catch (error) {
      console.error("Erro ao acessar a câmera: ", error);
    }
  };

  const stopCapture = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        canvasRef.current.toBlob(async (blob) => {
          if (blob) {
            const formData = new FormData();
            formData.append("image", blob, "image.jpg");
            try {
              const response = await axios.post("/api/upload", formData);
              console.log("Resposta do upload: ", response);
              // ação a ser executada após o upload da imagem
            } catch (error) {
              console.error("Erro ao fazer upload da imagem: ", error);
            }
          }
        }, "image/jpeg");
      }
      setCapturing(false);
      videoRef.current.srcObject;
    }
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <video
          ref={videoRef}
          style={{
            display: capturing ? "block" : "none",
          }}
        />

        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          style={{ display: capturing ? "block" : "none" }}
        />
      </div>

      <>
        {!capturing && (
          <button onClick={startCapture} title="Abrir Câmera">
            <FiCamera size="40px" color="blue" />
          </button>
        )}
        {capturing && (
          <button onClick={stopCapture} title="Tirar foto">
            <FiCamera size="40px" color={capturing ? "red" : "blue"} />
          </button>
        )}
      </>
    </>
  );
}
