"use client";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import dynamic from "next/dynamic";
import { useState } from "react";
import InfoForm from "./InfoForm";
import InfoTable from "./InfoTable";

const InfoButtonGroups = dynamic(() => import("./InfoButtonGroups"), {
  ssr: false,
});

const Infos = ({ type, allInfos }) => {
  const [selectedInfo, setSelectedInfo] = useState("new");

  let filteredData;

  filteredData = allInfos?.find((info) => info.name === selectedInfo);

  return (
    <AnimationWrapper
      keyValue={type}
      className="flex flex-col gap-1 w-full md:w-5/6 lg:w-4/6 xl:w-3/6 sm:pt-12 sm:pl-17 min-w-[415px]"
    >
      <h1 className="font-semibold text-2xl top-0">Genel Bilgiler</h1>
      <div className="w-full px-4 mx-auto py-8 flex flex-col">
        <InfoButtonGroups
          setSelectedInfo={setSelectedInfo}
          infos={allInfos}
          selectedInfo={selectedInfo}
        />

        {filteredData ? (
          <InfoTable
            selectedInfo={selectedInfo}
            infoData={filteredData}
            setSelectedInfo={setSelectedInfo}
          />
        ) : (
          <InfoForm />
        )}
      </div>
    </AnimationWrapper>
  );
};

export default Infos;
