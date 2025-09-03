import { X } from "lucide-react";
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
import { Input } from "../ui/input";

export default function RidersManagementFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedStatus = searchParams.get("isActiveValue") || undefined;
  const searchQuery = searchParams.get("search") || "";

  const isActiveOptions = [
    { label: "Block", value: "BLOCK" },
    { label: "Unblock", value: "UNBLOCK" },
  ];

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("isActiveValue", value);
    setSearchParams(params);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set("search", e.target.value);
    } else {
      params.delete("search");
    }
    setSearchParams(params);
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("isActiveValue");
    setSearchParams(params);
  };
  return (
    <div className="flex gap-10 items-center justify-end">
      {/* Search Input */}
      <div className="w-full max-w-sm">
        <Label className="mb-2 block">Search Rider</Label>
        <Input
          type="text"
          placeholder="Search by name, email..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {/* filter */}
      <div className="max-w-[200px] w-full">
        <div className="flex justify-between">
          <Label className="mb-2">Account Status</Label>
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
              <SelectLabel>status</SelectLabel>
              {isActiveOptions?.map(
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
    </div>
  );
}
