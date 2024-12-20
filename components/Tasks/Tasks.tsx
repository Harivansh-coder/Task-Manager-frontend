"use client";
import { deleteMultipleTask, getTask } from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState<TaskFilters>({
    status: "",
    priority: null,
  });

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const priorityOptions = new Array(5).fill(0).map((_, i) => i + 1);

  const query = useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => getTask(filters),
    staleTime: 5000,
    retry: false,
  });

  async function deleteAll() {
    try {
      const remainingTasks = query.data?.filter(
        (task) => !selectedRows.includes(task._id)
      );
      queryClient.setQueryData(["tasks", filters], remainingTasks); // Optimistic update

      await deleteMultipleTask(selectedRows); // Batch delete API
      setSelectedRows([]);
    } catch (error) {
      console.error("Error deleting tasks", error);
      alert("Failed to delete tasks");
    }
  }

  return (
    <div className="w-full p-6">
      <div className="flex items-center gap-3 justify-end py-4">
        <TaskDialog />

        <Button variant="destructive" onClick={deleteAll}>
          Delete All
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Priority <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {priorityOptions.map((priority) => (
              <DropdownMenuCheckboxItem
                key={priority}
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
            <Button variant="outline">
              Status <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
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
      <TaskTable data={query.data ?? []} setSelectedRows={setSelectedRows} />
    </div>
  );
}
