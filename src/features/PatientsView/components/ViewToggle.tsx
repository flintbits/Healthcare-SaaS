import { LayoutGrid, List } from "lucide-react";

export const ViewToggle: React.FC<{ view: string, setView: (view: string) => void }> = ({ view, setView }) => {
  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-1 w-fit">


      <button
        onClick={() => setView("list")}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition
          ${view === "list"
            ? "bg-white text-(--color-accent)"
            : "text-gray-500 hover:text-(--color-text-primary)"
          }
        `}
      >
        <List size={16} />
        List
      </button>


      <button
        onClick={() => setView("grid")}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition
          ${view === "grid"
            ? "bg-white text-(--color-accent)"
            : "text-gray-500 hover:text-(--color-text-primary)"
          }
        `}
      >
        <LayoutGrid size={16} />
        Grid
      </button>

    </div>
  );
}
