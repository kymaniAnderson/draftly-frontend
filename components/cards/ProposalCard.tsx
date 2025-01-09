"use client";

import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";

export default function ProposalCard({
  proposal,
}: {
  proposal: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
  };
}) {
  return (
    <Link href={`/creator/proposal/${proposal?.id}`} passHref>
      <Card sx={{ maxWidth: "100%", borderRadius: "1rem", boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="140"
          image={proposal.imageUrl}
          alt={proposal.title}
        />
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            {proposal.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {proposal.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
