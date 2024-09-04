const TagsTable = ({
  categoryCountObj,
  selectedCategory,
  setSelectedCategory,
}) => {
  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  const filteredTags = categoryCountObj.map(({ name, count }) => {
    return (
      <li key={name} className="my-3">
        <button
          onClick={() => handleCategoryChange(name)}
          aria-labelledby={` ${name}`}
        >
          <h3
            className={`inline px-3 py-2 text-sm font-medium uppercase ${
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
    <div className="flex-[2] max-h-screen sm:min-w-[280px] sm:max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md sm:flex">
      <div className="px-6 py-4">
        <button
          onClick={() => setSelectedCategory("Tümü")}
          className={`${
            selectedCategory === "Tümü" ? "text-color9" : "text-gray-500"
          } font-bold uppercase hover:text-color10`}
        >
          Tüm Blog Yazıları
        </button>
        <ul>{filteredTags}</ul>
      </div>
    </div>
  );
};

export default TagsTable;
