"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";

export default function LinkRedirectPage() {
  const router = useRouter();
  const params = useParams();
  const alias = params.alias;

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(`/api/alias?alias=${alias}`, { method: "GET" });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message);
        } else {
          router.push(data[0].url);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetcher();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress sx={{ marginTop: "10%", marginBottom: "5%" }} />
      <p>Redirecting...</p>
    </Box>
  );
}
