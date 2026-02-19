import clsx from "clsx";
import React from "react";

interface CategoryCount {
  name: string;
  count: number;
}

interface TagsTableProps {
  categoryCountObj: CategoryCount[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const TagsTable = ({
  categoryCountObj,
  selectedCategory,
  setSelectedCategory,
  setCurrentPage,
}: TagsTableProps) => {
  const handleCategoryChange = (category: string) => {
    setCurrentPage(1);
    const newCategory = category === selectedCategory ? "Tümü" : category;
    setSelectedCategory(newCategory);
  };

  return (
    <div className="md:w-72 rounded-xl bg-white shadow-sm border border-gray-200">
      <div className="px-6 py-5">
        <button
          onClick={() => {
            setSelectedCategory("Tümü");
            setCurrentPage(1);
          }}
          className={clsx(
            "mb-4 block text-sm font-semibold uppercase transition-colors",
            selectedCategory === "Tümü"
              ? "text-color9"
              : "text-gray-500 hover:text-color10"
          )}
        >
          Tüm Blog Yazıları
        </button>

        <ul className="flex flex-wrap gap-2 border-t pt-4">
          {categoryCountObj.map(({ name, count }) => (
            <li key={name}>
              <button
                onClick={() => handleCategoryChange(name)}
                className={clsx(
                  "px-3 py-1.5 rounded-full text-xs transition-all whitespace-nowrap",
                  selectedCategory === name
                    ? "bg-gray-200 text-color9 font-medium"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {name} ({count})
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TagsTable;
