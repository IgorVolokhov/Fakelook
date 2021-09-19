import { motion } from "framer-motion";
import BackdropModal from "./BackdropModal";
import CustomButton from "./CustomButton";

const newspaper = {
  hidden: {
    transform: "scale(0) rotate(720deg)",
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: " scale(1) rotate(0deg)",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: "scale(0) rotate(-720deg)",
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const CustomModal = ({ handleClose, text }: any) => {
  return (
    <BackdropModal
      onClick={handleClose}
      childern={
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="modal modal-backgroud"
          variants={newspaper}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <p>{text}</p>
          <CustomButton onClick={handleClose} text="Close" />
        </motion.div>
      }
    ></BackdropModal>
  );
};

export default CustomModal;
