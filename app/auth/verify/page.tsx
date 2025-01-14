"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";

export default function Verify() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const createUser = async () => {
    if (!user) return;

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authKey: user.sid,
          name: user.name || "",
          email: user.email,
        }),
      });

      if (!response.ok) throw new Error("Failed to create user");

      setSnackbarMessage("User account created successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      router.push("/creator/dashboard");
    } catch (err) {
      //TODO: Find better way to do this
      console.log(err);
      setSnackbarMessage("Failed to create user. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    if (!isLoading && user) {
      const checkUserExists = async () => {
        try {
          const response = await fetch(`/api/users/${user?.sid}`);
          if (!response.ok) throw new Error("Failed to fetch user data");

          const data = await response.json();
          if (!data?.id) {
            createUser();
          } else {
            router.push("/creator/dashboard");
          }
        } catch (err) {
          //TODO: Find better way to do this
          console.log(err);
          setSnackbarMessage("Error verifying user. Please try again.");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        }
      };
      checkUserExists();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading, router]);

  return (
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
      <CircularProgress />
      <Typography variant="h2" fontWeight="700" gutterBottom>
        Just one second!
      </Typography>
      <Typography variant="subtitle2" color={"textSecondary"} gutterBottom>
        Please wait while we bring up your account...
      </Typography>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
