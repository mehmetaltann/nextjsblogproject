import clsx from "clsx";

const TagsTable = ({
  categoryCountObj,
  selectedCategory,
  setSelectedCategory,
  setCurrentPage,
}) => {
  const handleCategoryChange = (category) => {
    setCurrentPage(1);
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  const filteredTags = categoryCountObj.map(({ name, count }) => {
    return (
      <li key={name} className="my-3 max-md:inline max-md:list-none ">
        <button
          onClick={() => handleCategoryChange(name)}
          aria-labelledby={` ${name}`}
        >
          <h3
            className={`inline px-3 py-2 text-sm font-medium md:uppercase ${
              selectedCategory === name
                ? "text-color9"
                : "text-gray-500 hover:text-color10"
            }`}
          >
            {name} ({count})
          </h3>
        </button>
      </li>
    );
  });

  return (
    <div className="md:flex-[2] rounded bg-gray-50 shadow-md md:max-w-[250px] md:max-h-screen ">
      <div className="px-6 py-4">
        <button
          onClick={() => setSelectedCategory("Tümü")}
          className={`font-bold uppercase hover:text-color10 mb-2 md:mb-0 min-w-[180px] ${selectedCategory === "Tümü" ? "text-color9" : "text-gray-500"}`}
        >
          Tüm Blog Yazıları
        </button>
        <ul>{filteredTags}</ul>
      </div>
    </div>
  );
};

export default TagsTable;
