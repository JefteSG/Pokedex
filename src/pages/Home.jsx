import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PokemonCard from '../components/PokemonCard'
import { Container } from '@mui/system'
import { Box, Grid, Switch, Tooltip } from '@mui/material'
import axios from 'axios'
import { Skeletons } from '../components/Skeletons'
import '../App.css';
import { ThemeProvider } from '@emotion/react'
import { useNavigate } from "react-router-dom";
import { theme } from '../components/Theme'

export const Home = ({ setPokemonData }) => {
    
    const [pokemons, setPokemons] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        getPokemons()
    }, [])
    
    const getPokemons = () => {
        var endpoints = []
        const languageCode = 'pt';
        for ( var i = 1; i < 120; i++){
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/?lang=${languageCode}`)
        }
        axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res)).catch((err) => console.log(err)) 

    }

    const pokemonFilter= (name) => {
        var filteredPokemons = []
        if(name===""){
            getPokemons()
        }
        for (var i in pokemons) {
            if(pokemons[i].data.name.includes(name)) {
                filteredPokemons.push(pokemons[i])
            }
        }
        setPokemons(filteredPokemons)
    }
    const pokemonPickHandler = (pokemonData) => {
        setPokemonData(pokemonData);
        navigate("/profile");
    };
    
    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };    

    return (
        <ThemeProvider theme={theme}>
            <div className='app'> 
                <Navbar pokemonFilter={pokemonFilter} /> 
                <Container maxWidth="false">
                <Tooltip title='Shiny?'> 
                    <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                    color="secondary"
                    />
                </Tooltip>
                
                    <Grid container spacing={2}>
                        {pokemons.length === 0 ? ( <Skeletons/> 
                        ) : ( 
                            pokemons.map((pokemon, key) => (
                            <Grid item xs={12} sm={6} md={4} lg={4} key={key}>
                                <Box onClick={() => pokemonPickHandler(pokemon.data)}>
                                    <PokemonCard name={pokemon.data.name} image={checked ? pokemon.data.sprites.front_shiny : pokemon.data.sprites.front_default} types={pokemon.data.types} />
                                </Box>
                            </Grid>    
                            ))
                        )}
                        
                        
                    </Grid>
                </Container>

            </div>
        </ThemeProvider>
    )
}