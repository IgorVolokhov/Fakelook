import { Button } from "@material-ui/core";
import { motion } from "framer-motion";

const CustomButton = ({ type, text, className, isDisabled, onClick }: any) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Button
        type={type}
        className={className}
        disabled={isDisabled}
        onClick={onClick}
      >
        {text}
      </Button>
    </motion.div>
  );
};

CustomButton.defaultProps = {
  className: "btn",
  text: "not implemented :)",
  type: "button",
  isDisabled: false,
  onClick: () => {
    console.log("not implemented");
  },
};

export default CustomButton;
