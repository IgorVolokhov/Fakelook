import { Button } from "@material-ui/core";

const CustomButton = ({ type, text, className, isDisabled, onClick }) => {
  return (
    <Button
      type={type}
      className={className}
      disabled={isDisabled}
      onClick={onClick}
    >
      {text}
    </Button>
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
