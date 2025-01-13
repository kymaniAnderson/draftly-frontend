"use client";

import { Button, Card, CardContent, Typography } from "@mui/material";

interface Content {
  title: string;
  content: string;
}

export default function ProposalCard({
  proposal,
}: {
  proposal: {
    id: string;
    title: string;
    userContext: string;
    content: Content[];
    templateId: string;
    userId: string;
  };
}) {
  return (
    <Card sx={{ maxWidth: "100%", borderRadius: "1rem", boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {proposal.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Prompt: {proposal.userContext}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          href={`/creator/proposal/${proposal?.id}`}
          sx={{ marginTop: 2 }}
        >
          Edit Proposal
        </Button>
      </CardContent>
    </Card>
  );
}
