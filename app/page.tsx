"use client";

import { Button, Typography, Box } from "@mui/material";

export default function Landing() {
  return (
    <main>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        textAlign="center"
        bgcolor="#f5f5f5"
        padding={4}
      >
        <Typography variant="h1" fontWeight="700" gutterBottom>
          Welcome to Draftly
        </Typography>

        <Typography variant="h6" color="textSecondary" gutterBottom>
          Create proposals on the fly with AI assistance.
        </Typography>

        <Typography variant="body1" gutterBottom>
          Ready to start your journey with us?
        </Typography>
        <Button
          variant="outlined"
          href="/api/auth/login?returnTo=/creator/dashboard"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Box>
    </main>
  );
}
