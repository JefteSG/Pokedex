import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chip, Container, Divider, Paper, Typography, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import PokemonTable from "../components/PokemonTable";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../components/Theme";

export const Profile = ({ pokemonData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!pokemonData) navigate("/");
  }, [pokemonData, navigate]);

  if (!pokemonData) return null;

  const { name, sprites, moves } = pokemonData;

  return (
    <ThemeProvider theme={theme}>
      <Navbar hideSearch hideShiny />
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 5, mt: 3, borderRadius: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
            <Typography variant="h4" textTransform="capitalize" color="primary">
              {name}
            </Typography>
            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              alignItems="center"
              gap={3}
              width="100%"
            >
              <Box
                component="img"
                src={sprites.front_default}
                alt={`${name} default`}
                sx={{
                  width: { xs: "70%", md: "50%" },
                  maxHeight: "300px",
                  objectFit: "contain",
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              />
              <PokemonTable pokemonData={pokemonData} />
            </Box>

            {/* Variações de Sprites */}
            <Box width="100%" mt={3}>
              <Divider textAlign="left" sx={{ mb: 2 }}>
                Variações
              </Divider>
              <Box display="flex" justifyContent="space-around" gap={2} flexWrap="wrap">
                {[
                  { src: sprites.front_female, alt: "Female" },
                  { src: sprites.front_shiny, alt: "Shiny" },
                  { src: sprites.front_shiny_female, alt: "Shiny Female" },
                ].map(
                  (sprite, index) =>
                    sprite.src && (
                      <Box
                        key={index}
                        component="img"
                        src={sprite.src}
                        alt={`${name} ${sprite.alt}`}
                        sx={{
                          width: { xs: "30%", sm: "20%" },
                          height: "auto",
                          objectFit: "contain",
                          borderRadius: 2,
                          boxShadow: 1,
                        }}
                      />
                    )
                )}
              </Box>
            </Box>

            {/* Movimentos */}
            <Box width="100%" mt={3}>
              <Divider textAlign="left" sx={{ mb: 2 }}>
                Ataques
              </Divider>
              <Box textAlign="center">
                {moves.map((moveData, index) => (
                  <Chip
                    key={index}
                    label={moveData.move.name}
                    sx={{ m: 0.5, textTransform: "capitalize" }}
                    color="primary"
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};
