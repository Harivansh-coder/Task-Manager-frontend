"use client";
import { deleteTask, getTask } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TaskTable from "./TaskTable";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { TaskDialog } from "../TaskDialog";
type TaskFilters = {
  status: string;
  priority: number | null;
};

export default function Tasks() {
  const [filters, setFilters] = useState<TaskFilters>({
    status: "", // "pending" | "finished"
    priority: null,
  });

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const priorityOptions = new Array(5).fill(0).map((_, i) => i + 1);

  const query = useQuery({
    queryKey: [filters],
    queryFn: () => getTask(filters),
    staleTime: 5000,
    retry: false,
  });

  async function deleteAll() {
    // Call the delete API
    await Promise.all(
      selectedRows.map((id) => {
        deleteTask(id);
      })
    );

    // Refetch the data
    query.refetch();
  }

  return (
    <div className="w-full p-6">
      <div className="flex items-center gap-3 justify-end py-4">
        {/* <Button
          variant="default"
          className=""
          onClick={() => {
            alert("Add Task");
          }}
        >
          Add Task
        </Button> */}
        <TaskDialog />

        <Button variant="destructive" className="" onClick={deleteAll}>
          Delete All
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="">
              Priority <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {priorityOptions.map((priority) => (
              <DropdownMenuCheckboxItem
                key={priority}
                className="capitalize"
                checked={filters.priority === priority}
                onCheckedChange={(value) =>
                  setFilters({
                    ...filters,
                    priority: value ? priority : null,
                  })
                }
              >
                {priority}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="">
              Status <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              className="capitalize"
              checked={filters.status === "pending"}
              onCheckedChange={(value) =>
                setFilters({
                  ...filters,
                  status: value ? "pending" : "",
                })
              }
            >
              Pending
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              className="capitalize"
              checked={filters.status === "finished"}
              onCheckedChange={(value) =>
                setFilters({
                  ...filters,
                  status: value ? "finished" : "",
                })
              }
            >
              Finished
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <TaskTable data={query.data ?? []} setSelectedRows={setSelectedRows} />;
    </div>
  );
}
