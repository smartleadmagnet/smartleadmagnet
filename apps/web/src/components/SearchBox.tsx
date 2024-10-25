"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Search } from "lucide-react";

interface SearchProps {
  placeholder?: string;
}

export default function SearchBox({ placeholder = "Search..." }: SearchProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const query = searchParams.get("query");

  useEffect(() => {
    if (query) {
      setInputValue(decodeURIComponent(query));
    }
  }, [query]);

  const handleSearch = useCallback(
    async (term: string) => {
      const params = new URLSearchParams(searchParams);
      params.delete("page");
      if (term) {
        params.set("query", encodeURIComponent(term));
      } else {
        params.delete("query");
      }
      await replace(`${pathname}?${params.toString()}`);
    },
    [replace, pathname, searchParams]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        className="py-5"
        placeholder={placeholder!}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600">
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
}
