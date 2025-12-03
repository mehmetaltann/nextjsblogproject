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
    <div className="md:flex-initial md:w-64 rounded bg-gray-50 shadow-md">
      <div className="px-6 py-4">
        <button
          onClick={() => {
            setSelectedCategory("Tümü");
            setCurrentPage(1);
          }}
          className={clsx(
            "font-bold uppercase hover:text-color10 mb-2 md:mb-0 min-w-[180px]",
            selectedCategory === "Tümü" ? "text-color9" : "text-gray-500"
          )}
        >
          Tüm Blog Yazıları
        </button>

        <ul className="flex flex-col md:max-h-[80vh] md:overflow-y-auto md:border-t md:pt-4">
          {categoryCountObj.map(({ name, count }) => (
            <li key={name} className="my-1">
              <button
                onClick={() => handleCategoryChange(name)}
                aria-label={`Category: ${name}`}
              >
                <h3
                  className={clsx(
                    "inline px-3 py-2 text-sm font-medium md:uppercase transition-colors",
                    selectedCategory === name
                      ? "text-color9"
                      : "text-gray-500 hover:text-color10"
                  )}
                >
                  {name} ({count})
                </h3>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TagsTable;
