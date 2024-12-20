import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTask } from "@/lib/api";

export function TaskDialog() {
  const [open, setOpen] = useState(false); // Dialog open state

  // Save the task to the database
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = (
      event.currentTarget.elements.namedItem("title") as HTMLInputElement
    ).value;
    const description = (
      event.currentTarget.elements.namedItem("description") as HTMLInputElement
    ).value;
    const dueTime = (
      event.currentTarget.elements.namedItem("dueTime") as HTMLInputElement
    ).value;
    const priority = (
      event.currentTarget.elements.namedItem("priority") as HTMLInputElement
    ).value;

    // Combine the time with today's date
    const today = new Date();
    const [hours, minutes] = dueTime.split(":").map(Number);
    const dueDateTime = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      hours,
      minutes
    );

    await createTask({
      title,
      description,
      dueTime: dueDateTime.toISOString(),
      priority: parseInt(priority),
    });

    // Close the dialog after task creation
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" defaultValue="A title" className="col-span-3" />

              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                defaultValue="A description"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueTime" className="text-right">
                Due Time
              </Label>
              <Input
                id="dueTime"
                type="time"
                defaultValue="12:00"
                className="col-span-3"
              />

              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Input
                id="priority"
                type="number"
                defaultValue="1"
                max="5"
                min="0"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
