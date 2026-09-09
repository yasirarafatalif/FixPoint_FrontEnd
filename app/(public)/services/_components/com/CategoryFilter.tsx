import { Category } from "@/types/servicesTypes";


interface Props {
  categories: Category[];
  selectedCategoryId: string;
  onSelect: (id: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategoryId,
  onSelect,
}: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        onClick={() => onSelect("all")}
        className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
          selectedCategoryId === "all"
            ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap transition-all ${
            selectedCategoryId === cat.id
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}