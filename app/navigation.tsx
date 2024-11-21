"use client";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const router = useRouter();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          URL Shortener
        </Typography>
        <Button
          color="inherit"
          onClick={() => {
            router.push("/");
          }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          onClick={() => {
            router.push("/links");
          }}
        >
          Links
        </Button>
      </Toolbar>
    </AppBar>
  );
}
