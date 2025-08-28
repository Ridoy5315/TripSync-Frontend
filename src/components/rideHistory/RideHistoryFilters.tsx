import { useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDownIcon, Plus, X } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { Separator } from "../ui/separator";

export default function RideHistoryFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedStatus = searchParams.get("status") || undefined;
  const selectedFareRange = searchParams.get("fareRange") || undefined;

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const statusOptions = [
    { label: "Pending", value: "PENDING" },
    { label: "Canceled", value: "CANCELED" },
    { label: "Accepted", value: "ACCEPTED" },
    { label: "Rejected", value: "REJECTED" },
  ];

  const fareRangeOptions = [
    { label: "0 - 200", value: "0 - 200" },
    { label: "201 - 400", value: "201 - 400" },
    { label: "401 - 600", value: "401 - 600" },
    { label: "601 - 800", value: "601 - 800" },
    { label: "801 - 1000", value: "801 - 1000" },
    { label: "1001 - ", value: "1001 - " },
  ];

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("status", value);
    setSearchParams(params);
  };

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

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("status");
    setSearchParams(params);
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
          <Label className="mb-2">Tour type</Label>
          <Button size="icon" variant="ghost" onClick={handleClearFilter}>
            <X />
          </Button>
        </div>
        <Select
          onValueChange={handleStatusChange}
          value={selectedStatus ? selectedStatus : ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Divisions</SelectLabel>
              {statusOptions?.map((item: { value: string; label: string }) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* fare range */}
      <div className="max-w-[200px] w-full">
        <div className="flex justify-between">
          <Label className="mb-2">Tour type</Label>
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
              <SelectLabel>Tour type</SelectLabel>
              {fareRangeOptions?.map(
                (item: { value: string; label: string }) => (
                  <SelectItem key={item.value} value={item.value}>
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
          <Label className="">Tour type</Label>
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
