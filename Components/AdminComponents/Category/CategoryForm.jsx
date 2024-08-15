const CategoryForm = ({ onSubmitHandler, categoryName, setCategoryName }) => {
  return (
    <form onSubmit={onSubmitHandler}>
      <div className="flex rounded-lg shadow-sm">
        <input
          type="text"
          id="category-add"
          name="hs-trailing-button-add-on"
          placeholder="Yeni Kategory Ekle"
          onChange={(e) => setCategoryName(e.target.value)}
          value={categoryName}
          className="py-3 px-4 block w-full border border-gray-400 shadow-sm rounded-s-lg text-sm focus:z-10  dark:bg-neutral-900 "
        />
        <button
          type="submit"
          className="py-3 px-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          Ekle
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
