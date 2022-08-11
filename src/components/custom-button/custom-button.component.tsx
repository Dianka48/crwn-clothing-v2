import "./custom-button.styles.scss";
import { FC, ButtonHTMLAttributes } from "react";

export enum BUTTON_TYPE_CLASSES {
  google = "google-sign-in",
  inverted = "inverted",
}

export type CustomButtonProps = {
  buttonType?: keyof typeof BUTTON_TYPE_CLASSES;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const CustomButton: FC<CustomButtonProps> = ({
  children,
  buttonType,
  isLoading,
  ...otherProps
}) => {
  return (
    <button
      className={
        buttonType
          ? `button-container ${BUTTON_TYPE_CLASSES[buttonType]}`
          : "button-container"
      }
      disabled={isLoading}
      {...otherProps}
    >
      {isLoading ? <div className="spinner-container" /> : children}
    </button>
  );
};

export default CustomButton;
