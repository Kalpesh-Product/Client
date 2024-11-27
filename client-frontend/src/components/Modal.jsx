import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ children, open, onClose }) {
  const dialogRef = useRef();

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  const handleEscKeyPress = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.dialog
          className="fixed z-50 inset-0 flex items-center justify-center bg-opacity-50 rounded-md"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={handleBackdropClick}
          onKeyDown={handleEscKeyPress}
          ref={dialogRef}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-auto h-auto max-h-[90vh] overflow-auto p-4 bg-white rounded-md"
          >
            {children}
          </div>
        </motion.dialog>
      )}
    </AnimatePresence>,
    document.getElementById("modal")
  );
}
