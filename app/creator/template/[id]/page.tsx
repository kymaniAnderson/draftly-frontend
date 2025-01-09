"use client";

import { Stack, Box, Typography } from "@mui/material";
import ProtectedLayout from "@/components/ProtectedLayout";

export default function Template() {
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
            EDIT YOUR TEMPLATE
          </Typography>
        </Box>
      </Stack>
    </ProtectedLayout>
  );
}
