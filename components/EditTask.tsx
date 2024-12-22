"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getTaskById, updateTask } from "@/lib/api";
import { useToast } from "@/components/hooks/use-toast";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Loading from "@/components/Loading";

export default function EditTask() {
  const search = useSearchParams();
  const id = search.get("id");

  const { toast } = useToast();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("pending"); // Controlled state for status

  useEffect(() => {
    if (id) {
      getTaskById(id)
        .then((data) => {
          setTask(data);
          setStatus(data.status); // Initialize status
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch task");
          setLoading(false);
        });
    }
  }, [id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!task || !id) return;

    const title = (
      event.currentTarget.elements.namedItem("title") as HTMLInputElement
    ).value;
    const description = (
      event.currentTarget.elements.namedItem("description") as HTMLInputElement
    ).value;
    const endTime = (
      event.currentTarget.elements.namedItem("endTime") as HTMLInputElement
    ).value;
    const priority = parseInt(
      (event.currentTarget.elements.namedItem("priority") as HTMLInputElement)
        .value
    );

    try {
      const updatedTask = await updateTask(id, {
        title,
        description,
        endTime: endTime ? new Date(task.endTime).toISOString() : "",
        priority,
        status, // Use controlled status state
      });

      setTask(updatedTask); // Update the state with the new task data
      toast({
        title: "Success",
        description: "Task updated successfully",
      });
    } catch (err) {
      console.error("Failed to update task", err);
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    }
  }

  if (loading) return <Loading />;

  if (error) return <p>{error}</p>;
  if (!task) return <p>No task found</p>;

  return (
    <div className="p-4 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Edit Task</h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" defaultValue={task.title} />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" defaultValue={task.description} />
        </div>
        <div>
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            id="startTime"
            defaultValue={new Date(task.startTime).toLocaleString()}
            readOnly
          />
        </div>
        <div>
          <Label htmlFor="endTime">End Time</Label>
          <Input
            id="endTime"
            type="datetime-local"
            defaultValue={task.endTime ? task.endTime.slice(0, 16) : ""}
          />
        </div>
        <div>
          <Label htmlFor="priority">Priority</Label>
          <Input
            id="priority"
            type="number"
            min="0"
            max="5"
            defaultValue={task.priority}
          />
        </div>
        <div>
          <Label>Status</Label>
          <RadioGroup value={status} onValueChange={setStatus}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pending" id="pending" />
              <Label htmlFor="pending">Pending</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="finished" id="finished" />
              <Label htmlFor="finished">Finished</Label>
            </div>
          </RadioGroup>
        </div>
        <Button type="submit">Update Task</Button>
      </form>
    </div>
  );
}
