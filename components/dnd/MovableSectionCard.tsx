import React, { ChangeEvent, useState } from "react";
import { Card, CardContent, TextField, Box, Button } from "@mui/material";

export default function MovableSectionCard({
  title,
  content,
  onSave,
}: {
  title: string;
  content: string;
  onSave: (title: string | null, content: string | null) => void;
}) {
  const [editedTitle, setEditedTitle] = useState<string | null>(title);
  const [editedContent, setEditedContent] = useState<string | null>(content);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEditedTitle(e.target.value);
  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEditedContent(e.target.value);

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
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
          rows={4}
          variant="outlined"
          value={editedContent}
          onChange={handleContentChange}
        />
        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            onClick={() => onSave(editedTitle, editedContent)}
          >
            Save
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
