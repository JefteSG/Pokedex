import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard";
import { Container } from "@mui/system";
import { Box, Grid } from "@mui/material";
import axios from "axios";
import { Skeletons } from "../components/Skeletons";
import "../App.css";
import { ThemeProvider } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { theme } from "../components/Theme";

export const Home = ({ setPokemonData }) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [shinyChecked, setShinyChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      const endpoints = [];
      const languageCode = "pt";
      for (let i = 1; i < 120; i++) {
        endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/?lang=${languageCode}`);
      }
      const responses = await axios.all(endpoints.map((endpoint) => axios.get(endpoint)));
      setAllPokemons(responses);
      setPokemons(responses);
    } catch (error) {
      console.error("Erro ao buscar Pokémons:", error);
    }
  };

  const pokemonFilter = (name) => {
    if (!name) {
      setPokemons(allPokemons);
    } else {
      const filtered = allPokemons.filter((pokemon) =>
        pokemon.data.name.toLowerCase().includes(name.toLowerCase())
      );
      setPokemons(filtered);
    }
  };

  const pokemonPickHandler = (pokemonData) => {
    setPokemonData(pokemonData);
    navigate("/profile");
  };

  const handleShinyToggle = (checked) => {
    setShinyChecked(checked); // Atualiza o estado do botão shiny
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Navbar 
          pokemonFilter={pokemonFilter} 
          hideSearch={false} 
          onShinyToggle={handleShinyToggle} 
          shinyChecked={shinyChecked} 
        />
        <Container maxWidth="false" sx={{ marginTop: "2em" }}>
            <Grid 
                container 
                spacing={2} 
                justifyContent="center" // Centraliza os itens no container
            >
                {pokemons.length === 0 ? (
                <Skeletons />
                ) : (
                pokemons.map((pokemon, index) => (
                    <Grid 
                    item 
                    xs={12} sm={4} md={4} lg={3} // Exibe mais cards por linha
                    key={index}
                    >
                    <Box onClick={() => pokemonPickHandler(pokemon.data)}>
                        <PokemonCard
                        name={pokemon.data.name}
                        image={
                            shinyChecked
                            ? pokemon.data.sprites.front_shiny
                            : pokemon.data.sprites.front_default
                        }
                        types={pokemon.data.types}
                        />
                    </Box>
                    </Grid>
                ))
                )}
            </Grid>
        </Container>

      </div>
    </ThemeProvider>
  );
};
