import { useRef } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import useCards from "@/hooks/useCards";
import { createList } from "@/utils/client";

type NewListDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function NewListDialog({ open, onClose }: NewListDialogProps) {
  // using a ref to get the dom element is one way to get the value of a input
  // another way is to use a state variable and update it on change, which can be found in CardDialog.tsx
  const textfieldRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const { fetchLists } = useCards();

  const handleAddList = async () => {
    try {
      if(textfieldRef.current?.value == ""){
        alert("Please enter Name of the list");
      }

      if(descriptionRef.current?.value == ""){
        alert("Please enter Description of the list");
      }

      await createList({ name: textfieldRef.current?.value ?? "" ,description: descriptionRef.current?.value ?? "" });
      fetchLists();
    } catch (error) {
      alert("Error: Failed to create list");
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a list</DialogTitle>
      <DialogContent className="grid grid-rows-2">

        <TextField
          inputRef={textfieldRef}
          label="List Name"
          variant="outlined"
          sx={{ mt: 2 }}
          autoFocus
        />

        <TextField
          inputRef={descriptionRef}
          label="Description"
          variant="outlined"
          sx={{ mt: 2 }}
          autoFocus
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddList}>add</Button>
        <Button onClick={onClose}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
}