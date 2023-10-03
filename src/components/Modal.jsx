const Modal = (props) => {
  if (props.isModalOpen) {
    return (
      <div className="fixed w-full h-full overflow-auto bg-black/40 top-0 left-0 z-40 flex-col flex items-center justify-center">
        {props.children}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Modal;
