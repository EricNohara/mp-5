"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Container, Typography } from "@mui/material";
import styled from "styled-components";

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
`;

export default function AliasInputForm() {
  const router = useRouter();

  const [aliasUrl, setAliasUrl] = useState({ alias: "", url: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAliasUrl((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/alias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aliasUrl),
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Error: " + data.message);
    } else {
      router.push("/links");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ marginTop: "5rem", textAlign: "center" }}
      >
        Input Alias and URL
      </Typography>
      <InputForm onSubmit={handleSubmit}>
        <TextField
          label="alias"
          name="alias"
          required
          fullWidth
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="url"
          name="url"
          required
          fullWidth
          onChange={handleChange}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: "2rem" }}
        >
          Save
        </Button>
      </InputForm>
    </Container>
  );
}
