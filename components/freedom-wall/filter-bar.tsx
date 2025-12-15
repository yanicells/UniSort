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
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex-1 min-w-0 sm:flex-none sm:w-[160px] md:w-[190px] justify-between text-xs sm:text-sm"
        >
          <span className="truncate">
            {options.find((opt) => opt.value === value)?.label || placeholder}
          </span>
          <ChevronsUpDownIcon className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={(current) => {
                    onChange(current);
                    setOpen(false as boolean);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
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
}: {
  selectedValues: string[];
  onChange: (values: string[]) => void;
  options: { value: string; label: string }[];
  placeholder: string;
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
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex-1 min-w-0 sm:flex-none sm:w-[160px] md:w-[190px] justify-between text-xs sm:text-sm"
        >
          <span className="truncate">{getButtonText()}</span>
          <ChevronsUpDownIcon className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={() => toggleValue(opt.value)}
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      selectedValues.includes(opt.value)
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible"
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
    <div className="flex flex-nowrap gap-1.5 sm:gap-3 mb-6 border-b border-border pb-3 sm:pb-4 items-center overflow-x-auto">
      <MultiSelectCombobox
        selectedValues={selectedUniversities}
        onChange={(values) => setSelectedUniversities(values as University[])}
        options={universityOptions}
        placeholder="Filter by tag"
      />
      <Combobox
        value={sortBy}
        onChange={(v) => setSortBy(v as SortBy)}
        options={sortOptions}
        placeholder="Sort posts"
      />
      <Combobox
        value={timeRange}
        onChange={(v) => setTimeRange(v as TimeRange)}
        options={timeOptions}
        placeholder="Time range"
      />
    </div>
  );
}
