export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="card w-full max-w-lg p-5 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 h-9 w-9 rounded-xl hover:bg-slate-50"
            aria-label="Close"
          >
            ✕
          </button>
          <div className="text-lg font-semibold">{title}</div>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
