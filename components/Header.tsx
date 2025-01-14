"use client";

import { useState, MouseEvent } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import DrawIcon from "@mui/icons-material/Draw";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { format } from "date-fns";

export default function Header({
  user,
}: {
  user: {
    picture?: string | undefined;
    name?: string | undefined;
    email?: string | undefined;
  };
}) {
  const [anchorNav, setAnchorNav] = useState<HTMLElement | null>(null);

  const pages = [
    { name: "Dashboard", href: "/creator/dashboard" },
    { name: "Templates", href: "/creator/template" },
    { name: "Proposals", href: "/creator/proposal" },
    { name: "Logout", href: "/api/auth/logout" },
  ];
  const currentDate = format(new Date(), "MMMM dd, yyyy");

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorNav(null);
  };

  return (
    <AppBar position="static" sx={{ borderRadius: "1rem" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DrawIcon
            fontSize="large"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            component="h1"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
            }}
          >
            DRAFTLY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages?.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link href={page.href} passHref>
                    <Typography sx={{ textAlign: "center" }}>
                      {page.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <DrawIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            component="h1"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
            }}
          >
            DRAFTLY
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages?.map((page) => (
              <Link key={page.name} href={page.href} passHref>
                <Button
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "1rem",
                    },
                  }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <Avatar
              src={user?.picture ?? ""}
              alt={user?.name ?? "User"}
              sx={{ width: 40, height: 40, mr: 1 }}
            />
            <Box>
              <Typography variant="body1">{user?.email}</Typography>
              <Typography variant="body2">{currentDate}</Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
