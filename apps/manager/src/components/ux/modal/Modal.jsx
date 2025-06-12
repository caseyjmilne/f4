import React from 'react';
import { X } from 'lucide-react';
import "./modal.css";

function Modal({ isOpen, onClose, children, title, footer }) {
  if (!isOpen) return null;

  return (
    <div className="f4-modal-overlay" onClick={onClose}>
      <div className="f4-modal-content" onClick={e => e.stopPropagation()}>
        <header className="f4-modal-header">
          <div className="f4-modal-title">
            {title}
          </div>
          <button className="f4-modal-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </header>
        <div className="f4-modal-body">
          {children}
        </div>
        {footer && (
          <footer className="f4-modal-footer">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}

export default Modal;
