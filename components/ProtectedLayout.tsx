"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Container, Box, Skeleton } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";
import Header from "@/components/Header";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  const gravatarRetroUrl = (url: string): string => {
    const baseUrl = url.split("?")[0];
    const params = new URLSearchParams(url.split("?")[1]);
    params.set("d", "retro");
    return `${baseUrl}?${params.toString()}`;
  };

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Header
          user={{
            picture: gravatarRetroUrl(user?.picture ?? "") ?? undefined,
            email: user?.email ?? undefined,
            name: user?.name ?? undefined,
          }}
        />
        <Box sx={{ mt: 4 }}>
          <Skeleton variant="text" width="60%" height={40} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ mt: 2, borderRadius: 2 }}
          />
          <Skeleton variant="text" width="40%" height={40} sx={{ mt: 2 }} />
        </Box>
      </Container>
    );
  } else {
    return (
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Header
          user={{
            picture: gravatarRetroUrl(user?.picture ?? "") ?? undefined,
            email: user?.email ?? undefined,
            name: user?.name ?? undefined,
          }}
        />
        <Box
          sx={{
            mt: 4,
            px: { xs: 2, sm: 4 },
            py: 2,
            borderRadius: "1rem",
            boxShadow: 3,
          }}
        >
          {children}
        </Box>
      </Container>
    );
  }
}
