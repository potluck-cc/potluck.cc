import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

interface AppEntryProps {
  content: string;
  title: string;
  onClose?: () => void;
  action: {
    title: string;
    onClick?: () => void;
  };
}

export default function ({ content, title, action, onClose }: AppEntryProps) {
  const [open, isOpen] = useState(true);

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography gutterBottom variant="subtitle1">
          {content}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose && onClose();
            isOpen(false);
          }}
          color="primary"
          variant="contained"
        >
          Close
        </Button>

        <Button
          onClick={() => {
            action.onClick && action.onClick();
            isOpen(false);
          }}
          color="secondary"
          variant="contained"
        >
          {action.title}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
