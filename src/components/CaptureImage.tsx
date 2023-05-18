import { useState } from "react";
import useMobile from "../utils/screenDemension";
import { FiCamera, FiImage } from "react-icons/fi";
import "../App.css";

function CaptureImage(): JSX.Element {
  const [source, setSource] = useState<string>(""); // Defina o tipo do estado como string
  const isMobile = useMobile();

  const handleCapture = (target: any) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result as string;
          setSource(base64String);
          console.log(base64String);
        };

        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <>
      <label htmlFor="icon-button-file">
        <button
          title="Anexar uma imagem ou arquivo"
          aria-label="upload picture"
          onClick={() => {
            const input = document.getElementById(
              "icon-button-file"
            ) as HTMLInputElement;
            input?.click();
          }}
        >
          {!isMobile ? (
            <>
              {source ? (
                <FiImage size="40px" color="red" />
              ) : (
                <FiImage size="40px" color="blue" />
              )}
            </>
          ) : (
            <>
              {source ? (
                <FiCamera size="40px" color="red" />
              ) : (
                <FiCamera size="40px" color="blue" />
              )}
            </>
          )}
        </button>
      </label>

      <>
        {source && (
          <div id="icon-button-file">
            {source.startsWith("data:image") ? (
              <img
                src={source}
                alt="snap"
                width={!isMobile ? "640px" : "320px"}
                height={!isMobile ? "480px" : "240px"}
              />
            ) : (
              <embed
                src={source}
                type="application/pdf"
                width={!isMobile ? "640px" : "320px"}
                height={!isMobile ? "480px" : "240px"}
              />
            )}
          </div>
        )}

        <input
          accept=".jpeg, .jpg, .pdf, .png"
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
