import { Button } from "@material-ui/core";

const CustomButton = ({ type, text, className, isDisabled }) => {
  return (
    <Button type={type} classname={className} disabled={isDisabled}>
      {text}
    </Button>
  );
};

CustomButton.defaultProps = {
  className: "btn",
  text: "not implemented :)",
  type: "button",
  isDisabled: false,
};

export default CustomButton;
