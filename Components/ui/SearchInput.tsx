import { useContext, ChangeEvent, useState, useEffect, useRef } from "react";
import { ClientContext } from "@/store/ClientContext";
import { CiSearch } from "react-icons/ci";

const SearchInput = ({ inputWidth }: { inputWidth: string }) => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error(
      "useClientContext must be used within a ClientContextProvider"
    );
  }
  const { searchItem, setSearchItem } = context;

  const [isClicked, setIsClicked] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };

  const toggleSearchInput = () => {
    setIsClicked((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsClicked(false); // Dışarı tıklanınca kapat
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="flex items-center px-4 py-2 md:px-6 md:py-3 lg:px-3 lg:py-2 rounded-full border border-gray-400 overflow-hidden max-w-md mx-auto font-[sans-serif] transition-all duration-300 ease-in-out"
      ref={inputRef}
      style={{
        maxWidth: "300px",
      }}
    >
      <CiSearch
        style={{ opacity: 2, fontSize: 32, paddingRight: 2, cursor: "pointer" }}
        onClick={toggleSearchInput}
      />
      <input
        type="text"
        placeholder="Ara ..."
        aria-label="Search"
        className="outline-none bg-transparent text-gray-600 text-sm transition-all duration-300 ease-in-out"
        style={{
          width: isClicked ? inputWidth : "0px",
          opacity: isClicked ? 1 : 0,
          paddingLeft: isClicked ? "8px" : "0px",
        }}
        value={searchItem}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
