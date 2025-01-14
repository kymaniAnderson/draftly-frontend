"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import GenerateProposalModal from "../modals/GenerateProposalModal";
interface Sections {
  id: string;
  title: string;
  description: string;
  templateId: string;
}

export default function TemplateCard({
  template,
}: {
  template: {
    id: string;
    name: string;
    rating: number;
    hashtags: string[];
    sections: Sections[];
  };
}) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Card sx={{ maxWidth: "100%", borderRadius: "1rem", boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {template.name}
        </Typography>
        <Box display="flex" alignItems="center">
          <Rating name="rating" value={template.rating} readOnly />
        </Box>
        <Box mt={1}>
          {template?.hashtags?.map((hashtag) => (
            <Chip
              key={hashtag}
              label={`#${hashtag}`}
              color="secondary"
              size="small"
              sx={{ marginRight: 0.5, borderRadius: "0.5rem" }}
            />
          ))}
        </Box>
        <Box mt={2}>
          <Typography variant="h6" component="div">
            SECTIONS
          </Typography>
          <Stack spacing={2}>
            {template?.sections?.map((section) => (
              <Box key={section.id}>
                <Typography variant="body1" component="div">
                  {section.title}
                </Typography>
                <Typography variant="body2" component="div">
                  {section.description}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleOpenModal}
          sx={{ marginTop: 2 }}
        >
          Generate Proposal
        </Button>
        <GenerateProposalModal
          open={openModal}
          handleClose={handleCloseModal}
          templateId={template.id}
        />
      </CardContent>
    </Card>
  );
}
