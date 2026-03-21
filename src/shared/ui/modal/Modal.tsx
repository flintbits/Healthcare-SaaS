import { useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode
  title: string;
  onClose: () => void
}

export default function Modal({ children, title, onClose }: Props) {
  const root = document.getElementById("modal-root")
  const modalRef = useRef<HTMLDivElement | null>(null)

  if (!root) return null

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-[320px] p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg">{title}</h3>

          <button
            onClick={onClose}
            className="px-2 py-1 rounded hover:bg-gray-200"
          >
            X
          </button>
        </div>

        {children}
      </div>
    </div>,
    root
  )
}
