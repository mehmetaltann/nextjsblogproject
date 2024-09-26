"use client";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import dynamic from "next/dynamic";
import InfoForm from "./InfoForm";
import InfoTable from "./InfoTable";
import { useState } from "react";
import { InfoType } from "@/lib/types/types";

const InfoButtonGroups = dynamic(() => import("./InfoButtonGroups"), {
  ssr: false,
});

const Infos = ({ allInfos }: { allInfos: InfoType[] }) => {
  const [selectedInfo, setSelectedInfo] = useState<string>("new");

  const filteredData = allInfos?.find((info) => info.name === selectedInfo);

  return (
    <AnimationWrapper
      keyValue="infoType"
      className="flex flex-col gap-1 w-full md:w-5/6 lg:w-4/6 xl:w-3/6 sm:pt-12 sm:pl-17 min-w-[415px]"
    >
      <h1 className="font-semibold text-2xl top-0">Genel Bilgiler</h1>
      <div className="w-full px-4 mx-auto py-8 flex flex-col">
        <InfoButtonGroups
          setSelectedInfo={setSelectedInfo}
          infos={allInfos}
          selectedInfo={selectedInfo}
        />
        {!filteredData ? (
          <InfoForm />
        ) : (
          <InfoTable
            selectedInfo={selectedInfo}
            infoData={filteredData}
            setSelectedInfo={setSelectedInfo}
          />
        )}
      </div>
    </AnimationWrapper>
  );
};

export default Infos;
