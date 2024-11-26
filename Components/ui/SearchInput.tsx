import { useContext, ChangeEvent, useState } from "react";
import { ClientContext } from "@/store/ClientContext";
import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error(
      "useClientContext must be used within a ClientContextProvider"
    );
  }
  const { searchItem, setSearchItem } = context;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };

  // State to handle hover effect
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center px-4 py-2 rounded-full border border-gray-400 overflow-hidden max-w-md mx-auto font-[sans-serif] transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsHovered(true)} // Mouse hover
      onMouseLeave={() => setIsHovered(false)} // Mouse leave
    >
      {/* Search Icon */}
      <CiSearch style={{ opacity: 2, fontSize: 32, paddingRight: 2 }} />

      {/* Input field, only appears when hovered */}
      <input
        type="text"
        placeholder="Ara ..."
        aria-label="Search"
        className={`w-full outline-none bg-transparent text-gray-600 text-sm transition-all duration-300 ease-in-out ${
          isHovered ? "opacity-100 w-full" : "opacity-0 w-0"
        }`}
        value={searchItem}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
