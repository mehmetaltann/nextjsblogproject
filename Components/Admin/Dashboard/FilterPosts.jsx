import { useState } from "react";

const FilterPosts = ({ setFilteredData, allPosts }) => {
  const [searchItem, setSearchItem] = useState("");

  function handleInputChange() {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = allPosts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredData(filteredItems);
  }

  return (
    <div className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
      <div className=" relative ">
        <input
          type="text"
          id='"form-subscribe-Filter'
          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="Arama..."
          value={searchItem}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200">
        Ara
      </div>
    </div>
  );
};

export default FilterPosts;
