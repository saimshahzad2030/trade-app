import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
interface CompanySummaryType {
  name: string;
  description: string;
  website: string;
  currency?: string;
  exchangeName?: string;
  employees: number | string;
  fiscalYearEnds: string;
  sector: string;
  industry: string;
}

const CompanySummary: React.FC<{ companySummary: CompanySummaryType }> = ({
  companySummary,
}) => {
  return (
    <div className="w-full max-w-2xl px-4 py-0 mx-auto   rounded-lg shadow-md   border-[0.1px] border-white">
      <Accordion type="single" collapsible className="text-white">
        <AccordionItem value="item-1">
          <AccordionTrigger>{companySummary.name}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-row w-full justify-between ">
              <div className="flex flex-col items-start w-7/12">
                <p className="line-clamp-4 text-[12px]">
                  {companySummary.description}
                </p>
                <p className="mt-4 text-xs">{companySummary.website}</p>
              </div>
              <div className="w-[38%] flex flex-col items-center">
                <div className="w-full flex flex-row items-start justify-between">
                  <div className="flex flex-col items-start w-6/12">
                    <h1 className="text-xs  ">{companySummary.employees}</h1>
                    <p className="text-[10px] text-gray-500">
                      Full Time Employees
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-6/12">
                    <h1 className="text-xs  ">
                      {companySummary.fiscalYearEnds}
                    </h1>
                    <p className="text-[10px] text-gray-500">
                      Fiscal Year Ends
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-row items-start justify-between mt-4">
                  <div className="flex flex-col items-start w-6/12">
                    <h1 className="text-xs  ">{companySummary.sector}</h1>
                    <p className="text-[10px] text-gray-500">Sector</p>
                  </div>
                  <div className="flex flex-col items-start w-6/12">
                    <h1 className="text-xs  line-clamp-1">
                      {companySummary.industry}
                    </h1>
                    <p className="text-[10px] text-gray-500">Industry</p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CompanySummary;
