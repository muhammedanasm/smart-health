import ReactDOM from "react-dom/client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const CustomModal = ({
  title,
  content, // JSX content
  width,
  heightAuto = false,
  showCloseButton = false,
  showConfirmButton = false,
  onConfirm, // Optional: confirm action
  onCancel, // Optional: cancel action
  customClass = {},
}) => {
  // Create a wrapper element
  const wrapper = document.createElement("div");

  // Mount JSX content using React 18+ createRoot
  const root = ReactDOM.createRoot(wrapper);
  root.render(content);

  // Fire the SweetAlert modal
  MySwal.fire({
    title,
    html: wrapper,
    width,
    heightAuto,
    showCloseButton,
    showConfirmButton,
    customClass,
    preConfirm: onConfirm ? () => onConfirm() : undefined,
    didClose: () => {
      // Cleanup when modal closes
      root.unmount();
      wrapper.remove();
    },
  }).then((result) => {
    if (result.isDismissed && onCancel) {
      onCancel();
    }
  });
};

export default CustomModal;
