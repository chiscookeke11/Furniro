"use client"


import { useState } from "react";
import AdditionalInfo from "./AdditionalInfo";
import DetailedDescription from "./DetailedDescription";
import Reviews from "./Reviews";

interface DetailedInfoSectionProps {
    detailed_description: string,
    image1: string,
}

export default function DetailedInfoSection({ detailed_description, image1 }: DetailedInfoSectionProps) {

    const [activeTab, setActiveTab] = useState<string>("Description")
    const tabs = ["Description", "Additional Information", "Reviews"]




    const renderTabContent = () => {
        switch (activeTab) {
            case "Description":
                return <DetailedDescription detailed_description={detailed_description} image1={image1} />;

            case "Additional Information":
                return <AdditionalInfo />;

            case "Reviews":
                return <Reviews />;

            default:
                return "Select a tab";
        }
    }



    return (
        <section className="w-full h-full min-h-[30vh] py-[80px]  px-[4%]  border-t-[1px] border-b-[1px] border-[#D9D9D9] "  >

            <div className="mx-auto mb-5  w-fit flex items-center justify-center gap-6 md:gap-10 lg:gap-16  text-[#9F9F9F] " >
            {tabs.map((tab, index) => (
                <button onClick={() => setActiveTab(tab)} key={index} className={`cursor-pointer font-medium text-sm md:text-lg lg:text-2xl  ${activeTab === tab ? "text-[#000000] " : null}`}  >{tab}</button>
            ))}
            </div>
            {renderTabContent()}
        </section>
    )
}