import BootstrapButton, {
  ButtonProps as BootstrapButtonProps,
} from "react-bootstrap/Button";
import React, { useState } from "react";

import Spinner from "react-bootstrap/Spinner";

interface ButtonProps extends Omit<BootstrapButtonProps, "onClick"> {
  /**
   * Promise that will change if the component is loading
   */
  onClick: () => Promise<void>;

  /**
   * Enable to only show the spinning icon and not any other children
   */
  showOnlyLoading?: boolean;
}

/**
 * Button that displays uses a promise to display a loading icon
 */
const LoadingButton: React.FC<ButtonProps> = ({
  children,
  disabled,
  onClick,
  showOnlyLoading,
  ...props
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const changeLoading = () => setLoading(false);
  return (
    <BootstrapButton
      onClick={() => {
        setLoading(true);
        onClick().then(changeLoading).catch(changeLoading);
      }}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <Spinner animation="border" size="sm" />
      ) : (
        showOnlyLoading && children
      )}{" "}
      {!showOnlyLoading && children}
    </BootstrapButton>
  );
};

export default LoadingButton;
