import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";

const QrCodeModal = ({ modalOpen, onCloseModal, qrCodeData }) => {
  console.log(qrCodeData);
  const [image, setImage] = useState(null);

  // const generateQrCode = async () => {
  //   try {
  //     const res = await axios.get(
  //       `https://api.qrserver.com/v1/create-qr-code/?data=${qrCodeData}`
  //     );
  //     setImage(res.data);
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (qrCodeData) {
  //     generateQrCode();
  //   }
  // }, [qrCodeData]);

  return (
    <Modal
      open={modalOpen}
      onClose={onCloseModal}
      center
      showCloseIcon={false}
      animationDuration={500}
    >
      <div className="flex flex-col items-center justify-center gap-5 ">
        {qrCodeData && (
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${qrCodeData}`}
            alt="qr code"
          />
        )}

        <h2 className="rounded-full bg-gray-400 px-2 font-mono ">
          {qrCodeData}
        </h2>
      </div>
    </Modal>
  );
};

export default QrCodeModal;
