import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
};

export default function Modal({
  children,
  title,
  onClose,
}: Props) {
  const root =
    document.getElementById(
      "modal-root"
    );

  useEffect(() => {
    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow =
      "hidden";

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        "";
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  if (!root) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-md" />

      {/* glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

      {/* modal */}
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[32px] border border-white/10 bg-[#05070b]/92 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-3xl"
      >
        {/* hero bg */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_26%),radial-gradient(circle_at_75%_20%,rgba(99,102,241,0.10),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.03),transparent_22%)]" />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:38px_38px]" />
        </div>

        {/* header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/8 px-6 py-5 sm:px-7">
          <div>
            <p className="text-[10px] uppercase tracking-[0.30em] text-white/30">
              Modal Window
            </p>

            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
              {title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/60 transition hover:bg-white hover:text-black"
          >
            <X size={18} />
          </button>
        </div>

        {/* body */}
        <div className="max-h-[75vh] overflow-y-auto px-6 py-6 sm:px-7">
          {children}
        </div>
      </div>
    </div>,
    root
  );
}
