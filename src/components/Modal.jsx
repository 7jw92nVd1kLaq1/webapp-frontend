const Modal = (props) => {
  if (props.isModalOpen) {
    return <div>{props.children}</div>;
  } else {
    return <div></div>;
  }
};

export default Modal;
