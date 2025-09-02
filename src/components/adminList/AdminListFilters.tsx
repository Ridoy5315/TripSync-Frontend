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
import { useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export default function AdminListFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const selectedStatus = searchParams.get("adminGender") || undefined;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set("search", e.target.value);
    } else {
      params.delete("search");
    }
    setSearchParams(params);
  };

  const isAdminGenderOptions = [
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" },
  ];

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("adminGender", value);
    setSearchParams(params);
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("adminGender");
    setSearchParams(params);
  };
  return (
    <div>
      {/* Search Input */}
      <div className="w-full max-w-sm">
        <Label className="mb-2 block">Search Admin</Label>
        <Input
          type="text"
          placeholder="Search by name, email, address..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {/* filter */}
      <div className="max-w-[200px] w-full">
        <div className="flex justify-between">
          <Label className="mb-2">Gender</Label>
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
              <SelectLabel>gender</SelectLabel>
              {isAdminGenderOptions?.map(
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
