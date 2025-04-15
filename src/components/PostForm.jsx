import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createPostStart } from "../Reducers/post.reducer";

export default function PostForm({ open, handleClose }) {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    if (body.trim()) {
      dispatch(createPostStart({ body, userId: 1 }));
      handleClose();
      setBody("");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{
      sx: {
        width: { xs: "70%", sm: "40%" },
        maxWidth: "none", // override default maxWidth
      },
    }}>
      <DialogTitle>Create New Post</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Body"
          fullWidth
          variant="standard"
          multiline
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
