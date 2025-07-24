import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const excludedKeys = ["symbol", "companyName", "as_of_today_date"]; // Add more if needed

const isChartData = (value: any) =>
  typeof value === "object" &&
  value !== null &&
  Array.isArray(value) &&
  value.length > 0 &&
  typeof value[0] === "object" &&
  "date" in value[0];

export default function StockAccordion({ stocks }: { stocks: any[] }) {
  if (!stocks || stocks.length === 0) return null;

  const asOfDate = stocks[0]?.as_of_today_date;

  return (
    <div className="w-full py-4">
      <Accordion type="single" collapsible>
        {Object.keys(stocks[0]).map((key, index) => {
          const firstValue = stocks[0][key];
          const isObject = typeof firstValue === "object" && !Array.isArray(firstValue) && firstValue !== null;
          const shouldSkip = excludedKeys.includes(key) || isChartData(firstValue);

          if (shouldSkip) return null;

          return (
            <AccordionItem key={index} value={key} className="mt-4">
              <AccordionTrigger className="group cursor-pointer flex items-center justify-between w-4/12 gap-2">
                <span className="group-hover:text-[var(--variant-4)] font-bold text-2xl transition-all duration-300">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <ChevronDown className="group-hover:text-[var(--variant-4)] h-6 w-6 transition-transform duration-500 data-[state=open]:rotate-180" />
              </AccordionTrigger>

              <AccordionContent className="w-full overflow-hidden transition-all duration-500 ease-in-out">
                {isObject ? (
                  <Table className="mt-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="pl-6 w-1/5 text-start">As of {asOfDate}</TableHead>
                        {stocks.map((stock, idx) => (
                          <TableHead key={idx} className="pr-6 w-1/5 text-center">
                            {stock.symbol ?? "--"}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.keys(firstValue).map((metricKey) => (
                        <TableRow key={metricKey}>
                          <TableCell className="font-medium text-start pl-6">
                            {metricKey}
                          </TableCell>
                          {stocks.map((stock, idx) => (
                            <TableCell key={idx} className="text-center pr-6">
                              {stock[key]?.[metricKey] ?? "--"}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="mt-4">{firstValue}</p>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
