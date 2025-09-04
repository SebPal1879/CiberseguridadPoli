import { useRef, useState } from "react";
import Cropper from "react-easy-crop";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const maxSize = 1080;

function AvatarPicker({ onImageCreationHandler, children }) {
  const [openModal, setOpenModal] = useState(false);
  const [archivo, setArchivo] = useState("");
  const [cropeado, setCropeado] = useState({});
  const ref = useRef();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCropeado(croppedAreaPixels);
  };

  function onCloseModal() {
    setOpenModal(false);
    setArchivo("");
    ref.current.value = ""; // Limpia el valor del evento del input que recibe el archivo. El modal se abre cuando hay un onChange en dicho input, y en consecuencia un setOpenModal(true). Si el usuario vuelve a subir la imagen que ya había subido, el onChange no se detecta.
  }

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    setArchivo(URL.createObjectURL(selectedFile));
    setOpenModal(true);
  }

  async function cropImage(imgSrc, crop) {
    const image = new Image();
    image.src = imgSrc;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = crop.width;
      canvas.height = crop.height;

      const quality = canvas.width > maxSize ? maxSize / canvas.width : 100;

      context.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob(
        (blob) => {
          onImageCreationHandler(blob);
        },
        "image/jpeg",
        quality
      );

      ref.current.value = "";
      setOpenModal(false);
    };
  }

  return (
    <>
      <label htmlFor="uploader">{children}</label>
      <input
        type="file"
        id="uploader"
        onChange={(e) => handleFileChange(e)}
        style={{ display: "none" }}
        ref={ref}
      />
      <Modal isOpen={openModal} style={customStyles}>
        <div>
          <div
            style={{
              width: "100%",
              height: "24px",
            }}
          >
            <img
              src="x_icon.svg"
              style={{
                width: "20px",
                height: "20px",
                display: "block",
                marginLeft: "auto",
              }}
              onClick={onCloseModal}
            />
          </div>
        </div>
        <div style={{ position: "relative", width: "400px", height: "400px" }}>
          <Cropper
            image={archivo}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            zoomSpeed={0.05}
          />
        </div>
        <button onClick={() => cropImage(archivo, cropeado)}>Guardar</button>
      </Modal>
    </>
  );
}

export default AvatarPicker;
