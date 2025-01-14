"use client";

import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Stack, Box, Typography, CircularProgress } from "@mui/material";
import ProtectedLayout from "@/components/ProtectedLayout";
import ProposalCard from "@/components/cards/ProposalCard";

interface Proposal {
  id: string;
  title: string;
  userContext: string;
  content: Content[];
  templateId: string;
  userId: string;
}
interface Content {
  title: string;
  content: string;
}

export default function BrowseProposals() {
  const { user, isLoading } = useUser();
  const [proposals, setProposals] = useState<Proposal[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProposals = async () => {
      if (!isLoading) {
        try {
          setLoading(true);
          const response = await fetch(`/api/users/${user?.sub}`);
          const data = await response.json();
          setProposals(data?.proposals);
        } catch (err) {
          //TODO: Find a better way to do this
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProposals();
  }, [isLoading, user]);

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
            🔍 BROWSE PROPOSALS
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
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
              {proposals?.map((proposal) => (
                <Box
                  key={proposal?.id}
                  sx={{
                    flexBasis: "calc(25% - 16px)",
                    boxSizing: "border-box",
                  }}
                >
                  <ProposalCard proposal={proposal} />
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </Stack>
    </ProtectedLayout>
  );
}
