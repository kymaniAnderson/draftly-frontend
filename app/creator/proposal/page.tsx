"use client";

import { Stack, Box, Typography } from "@mui/material";
import ProtectedLayout from "@/components/ProtectedLayout";
import ProposalCard from "@/components/cards/ProposalCard";

interface Proposal {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const proposals: Proposal[] = [
  {
    id: 1,
    title: "Awesome Resumes",
    description:
      "Description for template is placed here and should be updated",
    imageUrl:
      "https://res.cloudinary.com/kymani-personal/image/upload/v1736293404/default-no-image.avif",
  },
  {
    id: 2,
    title: "Basic Bill of Sales",
    description:
      "Description for template is placed here and should be updated",
    imageUrl:
      "https://res.cloudinary.com/kymani-personal/image/upload/v1736293404/default-no-image.avif",
  },
  {
    id: 3,
    title: "Code Contract",
    description:
      "Description for template is placed here and should be updated",
    imageUrl:
      "https://res.cloudinary.com/kymani-personal/image/upload/v1736293404/default-no-image.avif",
  },
  {
    id: 4,
    title: "Powerful CVs",
    description:
      "Description for template is placed here and should be updated",
    imageUrl:
      "https://res.cloudinary.com/kymani-personal/image/upload/v1736293404/default-no-image.avif",
  },
];

export default function BrowseProposals() {
  return (
    <ProtectedLayout>
      <Stack spacing={4}>
        <Box component="section" sx={{ p: 1 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
            }}
            gutterBottom
          >
            BROWSE PROPOSALS
          </Typography>
          <Stack
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                sm: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              },
            }}
          >
            {proposals.map((proposal) => (
              <Box
                key={proposal.id}
                sx={{ flexBasis: "calc(25% - 16px)", boxSizing: "border-box" }}
              >
                <ProposalCard proposal={proposal} />
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    </ProtectedLayout>
  );
}
