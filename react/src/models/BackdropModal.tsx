import { motion } from "framer-motion";

const BackdropModal = ({ childern, onClick }: any) => {
  return (
    <motion.div
      className="backdrop"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {childern}
    </motion.div>
  );
};

export default BackdropModal;
