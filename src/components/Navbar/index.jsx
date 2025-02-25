import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Navbar({ pokemonFilter, hideSearch, onShinyToggle, shinyChecked, hideShiny }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "2em" }}>
      <AppBar position="static" sx={{ backgroundColor: "#333" }}>

        <Toolbar>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box
              component="img"
              src="/assets/pokemon-logo.png"
              height="3em"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
            {!hideShiny && (
              <Tooltip title="Shiny?">
                <Switch
                  checked={shinyChecked} // Estado controlado passado como prop
                  onChange={(e) => onShinyToggle(e.target.checked)} // Atualiza o estado no componente pai
                  inputProps={{ "aria-label": "controlled" }}
                  color="secondary"
                />
              </Tooltip>
              
            )}
            {!hideSearch && (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Pesquisando..."
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => pokemonFilter(e.target.value)}
                />
              </Search>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
