import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { ChevronDownIcon, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSearchParams } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { fareRangeOptions } from "@/utils/fareRangeOptions";

export default function CompletedRidesFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFareRange = searchParams.get("fareRange") || undefined;

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleFareRangeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("fareRange", value);
    setSearchParams(params);
  };

  const handleDateChange = (value: Date | undefined) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, "0");
      const day = String(value.getDate()).padStart(2, "0");
      const formatted = `${year}-${month}-${day}`;
      params.set("date", formatted);
    } else {
      params.delete("date");
    }

    setSearchParams(params);
    setDate(value);
  };

  const handleClearFilterRange = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("fareRange");
    setSearchParams(params);
  };

  const handleClearFilterDate = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("date");
    setSearchParams(params);
  };
  return (
    <div className="flex gap-10 items-center justify-end">
      <div className="max-w-[200px] w-full">
        <div className="flex justify-between">
          <Label className="mb-2">Select fare range</Label>
          <Button size="icon" variant="ghost" onClick={handleClearFilterRange}>
            <X />
          </Button>
        </div>
        <Select
          value={selectedFareRange ? selectedFareRange : ""}
          onValueChange={handleFareRangeChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fare Range</SelectLabel>
              {fareRangeOptions?.map(
                (item: { value: string; label: string }) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className="flex justify-center items-center"
                  >
                    {item.label}
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* date */}
      <div className="flex flex-col">
        <div className="flex justify-between">
          <Label className="">Ride requested date</Label>
          <Button size="icon" variant="ghost" onClick={handleClearFilterDate}>
            <X />
          </Button>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-48 justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                handleDateChange(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
