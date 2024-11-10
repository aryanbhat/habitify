import { useState } from "react";
import { EllipsisVerticalIcon } from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HabitValue } from "@/Types/type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "react-hot-toast";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { fetchHabitsList } from "@/stores/habitSlice/habitSlice";

export default function HabitDropDown({ data }: { data: HabitValue }) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAlertOpen(true);
    setIsDropdownOpen(false);
  };

  const handleDelete = async () => {
    try {
      if (user.uid) {
        await deleteDoc(doc(db, `users/${user.uid}/habits/${data.id}`));
        toast.success("habit deleted", { id: "HabitDropDown" });
        dispatch(fetchHabitsList(user.uid));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsAlertOpen(false);
    }
  };

  const handleDropdownOpenChange = (open: boolean) => {
    setIsDropdownOpen(open);
  };

  const handleAlertOpenChange = (open: boolean) => {
    setIsAlertOpen(open);
    if (!open) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={handleDropdownOpenChange}>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none">
          <EllipsisVerticalIcon className="text-white" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Habit Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={() => setIsDropdownOpen(false)}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={() => setIsDropdownOpen(false)}
        >
          Today's log
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-foreground focus:bg-destructive"
          onClick={handleDeleteClick}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
      <DeleteAlert
        isAlertOpen={isAlertOpen}
        handleAlertOpenChange={handleAlertOpenChange}
        handleDelete={handleDelete}
      />
    </DropdownMenu>
  );
}

interface DeleteAlertProps {
  isAlertOpen: boolean;
  handleAlertOpenChange: (open: boolean) => void;
  handleDelete: () => void;
}

function DeleteAlert({
  isAlertOpen,
  handleAlertOpenChange,
  handleDelete,
}: DeleteAlertProps) {
  return (
    <AlertDialog open={isAlertOpen} onOpenChange={handleAlertOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this habit?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            habit and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
