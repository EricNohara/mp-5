"use client";

import { useState, useEffect } from "react";
import { Container, Typography, Link, List, ListItemText } from "@mui/material";
import { link } from "fs";

export default function LinksList() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch("/api/alias", { method: "GET" });
        const data = await res.json();

        setLinks(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetcher();
  });

  return (
    <Container>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ marginTop: "5rem", textAlign: "center" }}
      >
        Alias and URL List
      </Typography>
      <List>
        {links.map((link: { url: string; alias: string }, i) => (
          <ListItemText key={i}>
            {link.alias}:{" "}
            <Link
              underline="hover"
              align="center"
              href={link.url}
              target="_blank"
            >
              {link.url}
            </Link>
          </ListItemText>
        ))}
      </List>
    </Container>
  );
}
