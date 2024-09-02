"use client";

const CategoryForm = ({
  onSubmitHandler,
  categoryName,
  setCategoryName,
  categoryColor,
  setCategoryColor,
}) => {
  return (
    <form onSubmit={onSubmitHandler}>
      <div className="flex gap-2 rounded-lg shadow-sm">
        <input
          type="text"
          id="category-add"
          name="hs-trailing-button-add-on"
          placeholder="Kategori İsmi"
          onChange={(e) => setCategoryName(e.target.value)}
          value={categoryName}
          className="py-3 px-4 block w-full border border-gray-400 shadow-sm rounded-s-lg text-sm focus:z-10  dark:bg-neutral-900 "
        />
        <input
          type="text"
          id="category-add"
          name="hs-trailing-button-add-on"
          placeholder="Renk #"
          onChange={(e) => setCategoryColor(e.target.value)}
          value={categoryColor}
          className="py-3 px-4 block w-full border border-gray-400 shadow-sm rounded-e-lg text-sm focus:z-10  dark:bg-neutral-900 "
        />
        <button
          type="submit"
          className="py-3 px-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          Ekle
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
