import "./custom-button.styles.scss";
import { FC, ButtonHTMLAttributes } from "react";

enum BUTTON_TYPE_CLASSES {
  google = "google-sign-in",
  inverted = "inverted",
}

export type CustomButtonProps = {
  buttonType?: keyof typeof BUTTON_TYPE_CLASSES;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const CustomButton: FC<CustomButtonProps> = ({
  children,
  buttonType,
  ...otherProps
}) => {
  return (
    <button
      className={
        buttonType
          ? `button-container ${BUTTON_TYPE_CLASSES[buttonType]}`
          : "button-container"
      }
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default CustomButton;
