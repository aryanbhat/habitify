import { useState } from "react";
import { GripVertical, Check, X, ArrowUp, ArrowDown } from "lucide-react";
import { HabitValue } from "@/Types/type";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ReorderHabitsModalProps {
  isOpen: boolean;
  habits: HabitValue[];
  onSave: (reorderedHabits: HabitValue[]) => void;
  onCancel: () => void;
}

export default function ReorderHabitsModal({
  isOpen,
  habits,
  onSave,
  onCancel,
}: ReorderHabitsModalProps) {
  const [reorderedHabits, setReorderedHabits] = useState([...habits]);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;

    const newHabits = [...reorderedHabits];
    const draggedHabit = newHabits[draggedItem];
    newHabits.splice(draggedItem, 1);
    newHabits.splice(index, 0, draggedHabit);

    setReorderedHabits(newHabits);
    setDraggedItem(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newHabits = [...reorderedHabits];
    [newHabits[index - 1], newHabits[index]] = [
      newHabits[index],
      newHabits[index - 1],
    ];
    setReorderedHabits(newHabits);
  };

  const moveDown = (index: number) => {
    if (index === reorderedHabits.length - 1) return;
    const newHabits = [...reorderedHabits];
    [newHabits[index], newHabits[index + 1]] = [
      newHabits[index + 1],
      newHabits[index],
    ];
    setReorderedHabits(newHabits);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reorder Habits</DialogTitle>
          <DialogDescription>
            Drag habits to reorder them, or use the arrow buttons
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onCancel}>
            <X size={18} className="mr-2" />
            Cancel
          </Button>
          <Button onClick={() => onSave(reorderedHabits)}>
            <Check size={18} className="mr-2" />
            Save Order
          </Button>
        </div>

        <div className="space-y-3">
          {reorderedHabits.map((habit, index) => (
            <div
              key={habit.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`bg-secondary rounded-lg p-4 cursor-move transition-all border-2 ${
                draggedItem === index
                  ? "border-primary scale-105 shadow-lg"
                  : "border-transparent hover:border-border"
              }`}
            >
              <div className="flex items-center gap-4">
                <GripVertical className="text-muted-foreground" size={24} />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{habit.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    Position {index + 1}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                  >
                    <ArrowUp size={18} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveDown(index)}
                    disabled={index === reorderedHabits.length - 1}
                  >
                    <ArrowDown size={18} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}