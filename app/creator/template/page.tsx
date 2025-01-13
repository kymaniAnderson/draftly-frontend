"use client";

import { useEffect, useState } from "react";
import { Stack, Box, Typography, CircularProgress } from "@mui/material";
import ProtectedLayout from "@/components/ProtectedLayout";
import TemplateCard from "@/components/cards/TemplateCard";

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

export default function BrowseTemplates() {
  const [templates, setTemplates] = useState<Template[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/templates");
        const data = await response.json();
        setTemplates(data);
      } catch (err) {
        //TODO: Find a better way to do this
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

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
            🔍 BROWSE TEMPLATES
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
              {templates?.map((template) => (
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
      </Stack>
    </ProtectedLayout>
  );
}
