import { Dispatch, SetStateAction, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type University = "general" | "admu" | "dlsu" | "up" | "ust";
type SortBy = "latest" | "most-liked" | "most-discussed";
type TimeRange = "all" | "week" | "month";

interface FilterBarProps {
  selectedUniversities: University[];
  setSelectedUniversities: Dispatch<SetStateAction<University[]>>;
  sortBy: SortBy;
  setSortBy: Dispatch<SetStateAction<SortBy>>;
  timeRange: TimeRange;
  setTimeRange: Dispatch<SetStateAction<TimeRange>>;
}

function Combobox({
  value,
  onChange,
  options,
  placeholder,
  align = "center",
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  align?: "start" | "center" | "end";
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-white border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs font-bold uppercase hover:translate-y-0.5 hover:shadow-none transition justify-between min-w-[90px] sm:min-w-[120px] md:min-w-[140px] max-w-[120px] sm:max-w-[160px] md:max-w-none"
        >
          <span className="truncate">
            {options.find((opt) => opt.value === value)?.label || placeholder}
          </span>
          <ChevronsUpDownIcon className="h-3 w-3 shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-[180px] sm:w-[220px] p-0 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
        <Command className="border-none">
          <CommandList>
            <CommandEmpty className="py-3 text-center text-xs font-bold uppercase text-slate-400">
              No option found.
            </CommandEmpty>
            <CommandGroup className="p-1">
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={(current) => {
                    onChange(current);
                    setOpen(false as boolean);
                  }}
                  className="px-3 py-2 text-xs font-bold uppercase cursor-pointer hover:bg-slate-100 data-[selected=true]:bg-slate-100 aria-selected:bg-slate-100"
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-3 w-3",
                      value === opt.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function MultiSelectCombobox({
  selectedValues,
  onChange,
  options,
  placeholder,
  align = "start",
}: {
  selectedValues: string[];
  onChange: (values: string[]) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  align?: "start" | "center" | "end";
}) {
  const [open, setOpen] = useState(false);

  const toggleValue = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const getButtonText = () => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) {
      return (
        options.find((o) => o.value === selectedValues[0])?.label || placeholder
      );
    }
    return `${selectedValues.length} selected`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-white border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs font-bold uppercase hover:translate-y-0.5 hover:shadow-none transition justify-between min-w-[90px] sm:min-w-[120px] md:min-w-[140px] max-w-[120px] sm:max-w-[160px] md:max-w-none"
        >
          <span className="truncate">{getButtonText()}</span>
          <ChevronsUpDownIcon className="h-3 w-3 shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-[180px] sm:w-[220px] p-0 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
        <Command className="border-none">
          <CommandList>
            <CommandEmpty className="py-3 text-center text-xs font-bold uppercase text-slate-400">
              No option found.
            </CommandEmpty>
            <CommandGroup className="p-1">
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={() => toggleValue(opt.value)}
                  className="px-3 py-2 text-xs font-bold uppercase cursor-pointer hover:bg-slate-100 data-[selected=true]:bg-slate-100 aria-selected:bg-slate-100"
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center border-2 border-black",
                      selectedValues.includes(opt.value)
                        ? "bg-black text-white"
                        : "bg-white [&_svg]:invisible"
                    )}
                  >
                    <CheckIcon className="h-4 w-4" />
                  </div>
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function FilterBar({
  selectedUniversities,
  setSelectedUniversities,
  sortBy,
  setSortBy,
  timeRange,
  setTimeRange,
}: FilterBarProps) {
  const universityOptions = [
    { value: "general", label: "General" },
    { value: "admu", label: "ADMU" },
    { value: "dlsu", label: "DLSU" },
    { value: "up", label: "UP" },
    { value: "ust", label: "UST" },
  ];

  const sortOptions = [
    { value: "latest", label: "Latest" },
    { value: "most-liked", label: "Most Liked" },
    { value: "most-discussed", label: "Most Discussed" },
  ];

  const timeOptions = [
    { value: "all", label: "All Time" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
  ];

  return (
    <div className="flex flex-wrap gap-2 items-center w-full">
      <MultiSelectCombobox
        selectedValues={selectedUniversities}
        onChange={(values) => setSelectedUniversities(values as University[])}
        options={universityOptions}
        placeholder="Filter by tag"
        align="start"
      />
      <Combobox
        value={sortBy}
        onChange={(v) => setSortBy(v as SortBy)}
        options={sortOptions}
        placeholder="Latest"
        align="center"
      />
      <Combobox
        value={timeRange}
        onChange={(v) => setTimeRange(v as TimeRange)}
        options={timeOptions}
        placeholder="All Time"
        align="end"
      />
    </div>
  );
}
