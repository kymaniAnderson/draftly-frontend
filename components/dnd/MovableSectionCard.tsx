import React, { ChangeEvent, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Stack,
  Card,
  CardContent,
  TextField,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";

export default function MovableSectionCard({
  id,
  title,
  content,
  onSave,
}: {
  id: string;
  title: string;
  content: string;
  onSave: (title: string | null, content: string | null) => void;
}) {
  const [editedTitle, setEditedTitle] = useState<string | null>(title);
  const [editedContent, setEditedContent] = useState<string | null>(content);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEditedTitle(e.target.value);

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEditedContent(e.target.value);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      sx={{
        marginBottom: 4,
        padding: "1rem",
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box></Box>
        <IconButton sx={{ cursor: "move" }} {...listeners}>
          <DehazeIcon />
        </IconButton>
      </Box>
      <CardContent>
        <Stack spacing={2}>
          <TextField
            label="Title"
            fullWidth
            variant="outlined"
            value={editedTitle}
            onChange={handleTitleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Content"
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={editedContent}
            onChange={handleContentChange}
          />
          <Button
            variant="outlined"
            onClick={() => onSave(editedTitle, editedContent)}
          >
            Save
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
