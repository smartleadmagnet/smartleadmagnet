"use client";
import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@smartleadmagnet/ui/components/ui/select";

export default function MagnetSearch({value}: {value: string | undefined}) {
  return (
    <form method="GET">
    <Select onValueChange={(value) => window.location.search = `?status=${value}`} value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="published">Published</SelectItem>
          <SelectItem value="pending">Draft</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </form>
  )
}
