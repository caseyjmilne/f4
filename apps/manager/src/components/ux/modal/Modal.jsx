import React from 'react';
import "./modal.css";

function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return (
    <div className="f4-modal-overlay" onClick={onClose}>
      <div className="f4-modal-content" onClick={e => e.stopPropagation()}>
        <header className="f4-modal-header">
          <div class="f4-modal-title">
            {title}
          </div>
          <button className="f4-modal-close" onClick={onClose}>×</button>
        </header>
        <div className="f4-modal-body">
          {children}
        </div>
        <footer className="f4-modal-footer">
          Modal Footer
        </footer>
      </div>
    </div>
  );
}

export default Modal;
