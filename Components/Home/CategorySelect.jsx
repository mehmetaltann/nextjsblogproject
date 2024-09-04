const CategorySelect = ({ categories, setMenu, menu }) => {
  return (
    <div className="flex justify-center gap-6 my-10">
      <button
        onClick={() => setMenu("Tümü")}
        className={
          menu === "Tümü" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
        }
      >
        Tümü
      </button>
      {categories &&
        categories.map((category, index) => {
          return (
            <button
              key={index}
              onClick={() => setMenu(category.name)}
              className={
                menu === category.name
                  ? "bg-black text-white py-1 px-4 rounded-sm"
                  : ""
              }
            >
              {category.name}
            </button>
          );
        })}
    </div>
  );
};

export default CategorySelect;
