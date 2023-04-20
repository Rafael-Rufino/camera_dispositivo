import { useState } from "react";

import useMobile from "../utils/screenDemension";

import { FiCamera, FiImage } from "react-icons/fi";

import "../App.css";

function CaptureImage() {
  const [source, setSource] = useState("");

  const isMobile = useMobile();

  const handleCapture = (target: any) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
      }
    }
  };
  return (
    <>
      <label htmlFor="icon-button-file">
        <button
          title="Anexa uma imagem"
          color="blue"
          aria-label="upload picture"
          onClick={() => {
            document.getElementById("icon-button-file")?.click();
          }}
        >
          {!isMobile ? (
            <FiImage size="40px" color="blue" />
          ) : (
            <FiCamera size="40px" color="blue" />
          )}
        </button>
      </label>

      <>
        {source && (
          <div className="imgBox" id="icon-button-file">
            <img
              src={source}
              alt={"snap"}
              className="imgIcon"
              width={!isMobile ? "640px" : "320px"}
              height={!isMobile ? "480px" : "240px"}
            />
          </div>
        )}

        <input
          accept="image/*;capture=camera"
          id="icon-button-file"
          type="file"
          // capture="environment"
          onChange={(e) => handleCapture(e.target)}
          style={{ display: "none" }}
        />
      </>
    </>
  );
}

export default CaptureImage;
