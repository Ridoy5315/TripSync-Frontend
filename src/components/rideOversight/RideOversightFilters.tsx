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
    <div className="flex gap-10 items-center justify-end">
      
      {/* filter */}
      <div className="max-w-[200px] w-full">
        <div className="flex justify-between">
          <Label className="mb-2">Ride Request Status</Label>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleRideRequestClearFilter}
          >
            <X />
          </Button>
        </div>
        <Select
          onValueChange={handleRideRequestStatusChange}
          value={selectedStatus ? selectedStatus : ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              {statusOptions?.map((item: { value: string; label: string }) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* rider gender filter */}
      <div className="max-w-[200px] w-full">
        <div className="flex justify-between">
          <Label className="mb-2">Show rides by Rider Gender</Label>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleRiderGenderClearFilter}
          >
            <X />
          </Button>
        </div>
        <Select
          onValueChange={handleRiderGenderStatusChange}
          value={selectedGenderStatus ? selectedGenderStatus : ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Rider Gender</SelectLabel>
              {riderGenderOptions?.map((item: { value: string; label: string }) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* date */}
      <div className="flex flex-col">
        <div className="flex justify-between">
          <Label className="">Requested On</Label>
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
