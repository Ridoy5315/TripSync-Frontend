import { ChevronDownIcon, X } from "lucide-react";
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
import { useSearchParams } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useState } from "react";

export default function RideOversightFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedStatus = searchParams.get("status") || undefined;
  const selectedGenderStatus = searchParams.get("riderGender") || undefined;

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const statusOptions = [
    { label: "Pending", value: "PENDING" },
    { label: "Canceled", value: "CANCELED" },
    { label: "Accepted", value: "ACCEPTED" },
    { label: "Rejected", value: "REJECTED" },
  ];

  const riderGenderOptions = [
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" },
    { label: "Other", value: "OTHER" },
  ];

  const handleRideRequestStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("status", value);
    setSearchParams(params);
  };

  const handleRideRequestClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("status");
    setSearchParams(params);
  };

  const handleRiderGenderStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("riderGender", value);
    setSearchParams(params);
  };

  const handleRiderGenderClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("riderGender");
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

  const handleClearFilterDate = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("date");
    setSearchParams(params);
  };
  return (
    <div className="lg:flex grid grid-cols-1 lg:gap-10 gap-3 items-center lg:justify-end justify-start">
      <div className="flex lg:gap-10 gap-3 items-center">
        {/* filter */}
        <div className="max-w-[200px] w-full">
          <div className="flex justify-between">
            <Label className="mb-2 lg:text-sm md:text-sm text-xs">
              Ride Request Status
            </Label>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleRideRequestClearFilter}
              className="lg:h-6 md:h-6 h-4"
            >
              <X />
            </Button>
          </div>
          <Select
            onValueChange={handleRideRequestStatusChange}
            value={selectedStatus ? selectedStatus : ""}
          >
            <SelectTrigger className="w-full lg:!h-9 md:!h-8 !h-7 lg:text-sm md:text-sm text-xs">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                {statusOptions?.map(
                  (item: { value: string; label: string }) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                      className="lg:text-sm text-xs"
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
            <Label className="mb-2 lg:text-sm md:text-sm text-xs">Requested On</Label>
            <Button size="icon" variant="ghost" onClick={handleClearFilterDate} className="lg:h-6 md:h-6 h-4">
              <X />
            </Button>
          </div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="lg:w-48 md:w-48 w-40  lg:!h-9 md:!h-8 !h-7 lg:text-sm md:text-sm text-xs justify-between font-normal"
              >
                {date ? date.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
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

      {/* rider gender filter */}
      <div className="max-w-[200px] w-full">
        <div className="flex justify-between">
          <Label className="mb-2 text-xs">
            Show rides by Rider Gender
          </Label>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleRiderGenderClearFilter}
            className="lg:h-6 md:h-6 h-4"
          >
            <X />
          </Button>
        </div>
        <Select
          onValueChange={handleRiderGenderStatusChange}
          value={selectedGenderStatus ? selectedGenderStatus : ""}
        >
          <SelectTrigger className="w-full lg:!h-9 md:!h-8 !h-7 lg:text-sm md:text-sm text-xs">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Rider Gender</SelectLabel>
              {riderGenderOptions?.map(
                (item: { value: string; label: string }) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className="lg:text-sm text-xs"
                  >
                    {item.label}
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
