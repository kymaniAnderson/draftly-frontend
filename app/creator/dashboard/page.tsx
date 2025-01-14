"use client";

import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Stack, Box, Typography, CircularProgress } from "@mui/material";
import ProtectedLayout from "@/components/ProtectedLayout";
import TemplateCard from "@/components/cards/TemplateCard";
import ProposalCard from "@/components/cards/ProposalCard";

interface Template {
  id: string;
  name: string;
  rating: number;
  hashtags: string[];
  sections: Sections[];
}
interface Sections {
  id: string;
  title: string;
  description: string;
  templateId: string;
}

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

export default function Dashboard() {
  const { user, isLoading } = useUser();
  const [templates, setTemplates] = useState<Template[] | null>([]);
  const [proposals, setProposals] = useState<Proposal[] | null>([]);
  const [loadingTemplates, setLoadingTemplates] = useState<boolean>(true);
  const [loadingProposals, setLoadingProposals] = useState<boolean>(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoadingTemplates(true);
        const response = await fetch("/api/templates");
        const data = await response.json();
        setTemplates(data);
      } catch (err) {
        //TODO: Find a better way to do this
        console.log(err);
      } finally {
        setLoadingTemplates(false);
      }
    };
    const fetchProposals = async () => {
      if (!isLoading) {
        try {
          setLoadingProposals(true);
          const response = await fetch(`/api/users/${user?.sub}`);
          const data = await response.json();
          setProposals(data?.proposals);
        } catch (err) {
          //TODO: Find a better way to do this
          console.log(err);
        } finally {
          setLoadingProposals(false);
        }
      }
    };

    fetchTemplates();
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
            🔥 HOT TEMPLATES
          </Typography>
          {loadingTemplates ? (
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
              {templates
                ?.filter((template) => template.rating >= 4)
                ?.slice(0, 4)
                ?.map((template) => (
                  <Box
                    key={template.id}
                    sx={{
                      flexBasis: "calc(25% - 16px)",
                      boxSizing: "border-box",
                    }}
                  >
                    <TemplateCard template={template} />
                  </Box>
                ))}
            </Stack>
          )}
        </Box>
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
            ⌛ RECENT PROPOSALS
          </Typography>
          {loadingProposals ? (
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
                  key={proposal.id}
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
