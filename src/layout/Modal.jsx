function Modal(props) {
  const { message } = props;
  return (
    <div className="modal">
      <div className="modal-background"></div>
      <div className="modal-message-wrapper">
        <p>{message}</p>
      </div>
    </div>
  );
}
export default Modal;
