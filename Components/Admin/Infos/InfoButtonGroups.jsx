const InfoButtonGroups = ({ setSelectedInfo, selectedInfo, infos }) => {
  const baseClass =
    "py-2.5 px-5 me-2 mb-2 text-sm font-medium focus:outline-none rounded-full border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100";
  const activeClass =
    "font-bold text-color1 bg-color1 hover:bg-color3 text-gray-100";
  const inactiveClass =
    "font-semibold text-gray-900 bg-white text-[#A5A5A5] hover:bg-gray-100";

  return (
    <div className="flex flex-wrap">
      <button
        onClick={() => setSelectedInfo("new")}
        type="button"
        className={`${baseClass} ${
          selectedInfo === "new" ? activeClass : inactiveClass
        }`}
      >
        Yeni Bilgi
      </button>
      {infos.map((info) => (
        <button
          key={info._id}
          onClick={() => setSelectedInfo(info.name)}
          type="button"
          className={`${baseClass} ${
            selectedInfo === info.name ? activeClass : inactiveClass
          }`}
        >
          {info.name}
        </button>
      ))}
    </div>
  );
};

export default InfoButtonGroups;
