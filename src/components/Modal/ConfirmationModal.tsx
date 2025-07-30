import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
 
export default function ConfirmationModal({
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  children,
}: {
  onConfirm: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">{description}</p>
        <DialogFooter>
          <Button className="cursor-pointer" variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
          className="cursor-pointer"
            variant="destructive"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}