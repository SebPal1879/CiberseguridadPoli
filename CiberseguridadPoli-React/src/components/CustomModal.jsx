import { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    width: "300px",
    height: "200px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function useCustomModal() {
  const [showModal, setShowModal] = useState(false);

  function onCloseModal() {
    setShowModal(false);
  }

  function CustomModal({ children }) {
    return (
      <Modal isOpen={showModal} style={customStyles}>
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
        <p>{children}</p>
      </Modal>
    );
  }

  return { showModal, setShowModal, CustomModal };
}

export default useCustomModal;
