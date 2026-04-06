import { useState } from "react";

type AccordionSection = {
  title: string;
  options: string[];
};

type FilterAccordionProps = {
  sections: AccordionSection[];
};

const FilterAccordion = ({ sections }: FilterAccordionProps) => {
  // Store only one open section at a time
  const [openSection, setOpenSection] = useState<number | null>(null);

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleSection = (index: number) => {
    setOpenSection((prev) => (prev === index ? null : index));
  };

  const toggleFilter = (value: string) => {
    setSelectedFilters((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="w-full md:max-w-[300px]">
      <h1 className="text-[20px] text-[#303030] font-geist font-semibold border-b pb-3">
        Filter ({selectedFilters.length})
      </h1>

      <div className="space-y-6 mt-6">
        {sections.map((section, index) => {
          const isOpen = openSection === index;

          return (
            <div key={index} className="border-b pb-3">
              <button
                onClick={() => toggleSection(index)}
                className="w-full flex items-center justify-between text-left"
              >
                <span className="text-[18px] font-semibold">
                  {section.title}
                </span>

                <span
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  ⌃
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100 mt-4"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden space-y-4">
                  {section.options.map((option, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(option)}
                        onChange={() => toggleFilter(option)}
                        className="w-5 h-5"
                      />
                      <span className="text-[15px] font-geist">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterAccordion;