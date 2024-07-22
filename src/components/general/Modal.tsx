import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  title: string;
  description: string;
  action: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  submitAction: (success: boolean) => void;
}

export default function Modal({
  title,
  description,
  action,
  open,
  setOpen,
  submitAction,
}: ModalProps) {
  const handleSubmit = (success: boolean) => {
    submitAction(success);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end w-full gap-2">
          <Button variant="outline" onClick={() => handleSubmit(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleSubmit(true)}>{action}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
