import { cloneElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AuthModal from "./AuthModal";

export default function ProtectedAction({
  children,
  onAuthorized,
}) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const child = children;

  const handleClick = (e) => {
    console.log("ProtectedAction clicked");
    console.log("isAuthenticated:", isAuthenticated);

    if (!isAuthenticated) {
      e.preventDefault();
      setOpen(true);
      return;
    }

    // If a custom action is provided
    if (onAuthorized) {
      e.preventDefault();
      onAuthorized();
    }

    // Otherwise allow Link/Button to behave normally
  };

  const handleSuccess = () => {
    setOpen(false);

    // Execute custom action if supplied
    if (onAuthorized) {
      onAuthorized();
      return;
    }

    // Continue Link navigation automatically
    if (child.props.to) {
      navigate(child.props.to);
      return;
    }

    // Continue external links automatically
    if (child.props.href) {
      window.open(child.props.href, "_blank");
    }
  };

  return (
    <>
      {cloneElement(child, {
        onClick: handleClick,
      })}

      <AuthModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
}