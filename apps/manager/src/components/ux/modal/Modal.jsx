import React from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="f4-modal-overlay" onClick={onClose}>
      <div className="f4-modal-content" onClick={e => e.stopPropagation()}>
        <button className="f4-modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
