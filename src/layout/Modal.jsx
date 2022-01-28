function Modal(props) {
  const { message } = props;
  return (
    <div className="modal">
      <div className="modal-wrapper">
        <p>{message}</p>
      </div>
    </div>
  );
}
export default Modal;
