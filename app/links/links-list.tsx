"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Link,
  List,
  ListItemText,
  Button,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { ContentCopy } from "@mui/icons-material";

interface LinkItem {
  alias: string;
  url: string;
}

export default function LinksList() {
  const [links, setLinks] = useState<LinkItem[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch("/api/alias", { method: "GET" });
        const data = await res.json();

        setLinks(data.reverse());
      } catch (err) {
        console.error(err);
      }
    };

    fetcher();
  }, []);

  const handleDelete = async (alias: string, url: string) => {
    try {
      const res = await fetch("/api/alias", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alias: alias, url: url }),
      });

      const data = await res.json();

      alert(data.message);

      if (res.ok)
        setLinks((prevLinks) =>
          prevLinks.filter((link) => link.alias !== alias)
        );
    } catch (err) {
      console.error(err);
    }
  };

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
      <List
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {links.map((link: { url: string; alias: string }, i) => (
          <ListItemText key={i} sx={{ display: "flex" }}>
            <b>{link.alias}: </b>
            <Link
              underline="hover"
              align="center"
              href={`${window.location.origin}/r/${link.alias}`}
              target="_blank"
            >
              {`${window.location.origin}/r/${link.alias}`}
            </Link>
            <Button
              variant="contained"
              onClick={() =>
                navigator.clipboard.writeText(
                  `${window.location.origin}/r/${link.alias}`
                )
              }
              sx={{ marginLeft: "2rem" }}
            >
              <ContentCopy />
            </Button>
            <Button
              color="warning"
              variant="contained"
              onClick={() => handleDelete(link.alias, link.url)}
              sx={{ marginLeft: "2rem" }}
            >
              <Delete />
            </Button>
          </ListItemText>
        ))}
      </List>
    </Container>
  );
}
