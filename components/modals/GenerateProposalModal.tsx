import React, { useState, ChangeEvent } from "react";
import { Stack, Modal, Box, Typography, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/navigation";

export default function GenerateProposalModal({
  open,
  handleClose,
  templateId,
}: {
  open: boolean;
  handleClose: () => void;
  templateId: string;
}) {
  const router = useRouter();
  const [context, setContext] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContext(e.target.value);
  };

  const handleGenerateAIProposal = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/proposals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          userContext: context,
          content: [],
          templateId: templateId,
          //TODO: add userId
          userId: "",
        }),
      });

      if (!response.ok) throw new Error("Failed to create proposal");

      const data = await response.json();
      console.log(data);

      router.push(`/creator/proposal/${data.id}`);
    } catch (err) {
      //TODO: Find a better way to do this
      console.log(err);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          borderRadius: "0.5rem",
          padding: "2rem",
          backgroundColor: "background.paper",
        }}
      >
        <Typography id="title" variant="h6" component="h2" sx={{ mb: "2rem" }}>
          Generate Proposal
        </Typography>

        <Stack spacing={4}>
          <TextField
            fullWidth
            value={title}
            onChange={handleTitleChange}
            label="Title"
            variant="outlined"
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            value={context}
            onChange={handleContextChange}
            label="Details necessary for generation!"
            variant="outlined"
          />
        </Stack>

        <Box display="flex" justifyContent="flex-end" sx={{ marginTop: 2 }}>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={handleGenerateAIProposal}
          >
            Generate with AI
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
}
