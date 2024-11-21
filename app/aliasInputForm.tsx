"use client";
import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import styled from "styled-components";

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
`;

export default function AliasInputForm() {
  const [aliasUrl, setAliasUrl] = useState({ alias: "", url: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAliasUrl((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<SubmitEvent>) => {
    e.preventDefault();
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
