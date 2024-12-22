"use client";
import { getTask, deleteMultipleTask } from "@/lib/api";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TaskTable from "./TaskTable";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { CreateTaskDialog } from "../CreateTaskDialog";
import { ChevronDown } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import Loading from "../Loading";

type TaskFilters = {
  status: string;
  priority: number | null;
};

type RowSelection = Record<string, boolean>;

export default function Tasks() {
  // const queryClient = useQueryClient();

  const [filters, setFilters] = useState<TaskFilters>({
    status: "",
    priority: null,
  });

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [rowSelection, setRowSelection] = useState<RowSelection>({});

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const priorityOptions = new Array(5).fill(0).map((_, i) => i + 1);

  const query = useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => getTask(filters),
    staleTime: 5000,
    retry: false,
  });

  async function deleteAll() {
    try {
      setLoading(true);
      await deleteMultipleTask(selectedRows);
      query.refetch();
      setSelectedRows([]);
      setRowSelection({});

      toast({
        title: "Success",
        description: "Tasks deleted successfully",
        variant: "default",
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while deleting tasks",
        variant: "destructive",
      });
      setLoading(false);
    }
  }

  return (
    <div className="w-full p-6">
      <div className="flex items-center gap-3 justify-end py-4">
        <CreateTaskDialog onSuccess={() => query.refetch()} />

        <Button
          variant="destructive"
          onClick={deleteAll}
          disabled={selectedRows.length === 0}
        >
          Delete Selected
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

      {loading && <Loading />}
      <TaskTable
        data={query.data ?? []}
        setSelectedRows={setSelectedRows}
        rowSelection={rowSelection || {}}
        setRowSelection={setRowSelection}
      />
    </div>
  );
}
