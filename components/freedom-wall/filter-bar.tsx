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

type University = "all" | "admu" | "dlsu" | "up" | "ust";
type SortBy = "latest" | "most-liked" | "most-discussed";
type TimeRange = "all" | "week" | "month";

interface FilterBarProps {
  selectedUniversity: University;
  setSelectedUniversity: Dispatch<SetStateAction<University>>;
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
          className="w-[190px] justify-between"
        >
          {options.find((opt) => opt.value === value)?.label || placeholder}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={(current) => {
                    onChange(current);
                    setOpen(false as any);
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

export function FilterBar({
  selectedUniversity,
  setSelectedUniversity,
  sortBy,
  setSortBy,
  timeRange,
  setTimeRange,
}: FilterBarProps) {
  const universityOptions = [
    { value: "all", label: "All Universities" },
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
    <div className="flex flex-wrap gap-3 mb-6 border-b border-border pb-4 items-center">
      <Combobox
        value={selectedUniversity}
        onChange={(v) => setSelectedUniversity(v as University)}
        options={universityOptions}
        placeholder="Filter university"
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

