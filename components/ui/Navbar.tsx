import { useContext, useState } from "react";
import NextLink from "next/link";
// material ui
import {
  Link as UiLink,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
  Grid,
  Input,
  InputAdornment,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  ClearOutlined,
  NightlightOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  WbSunnyOutlined,
} from "@mui/icons-material";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import { ActiveLink } from "./ActiveLink";
// context
// import { ThemeContext } from "../../pages/_app";
import { UiContext } from "../../context/ui";
import Link from "next/link";

const buttonItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Projects",
    path: "/projects",
  },
  {
    label: "Contact",
    path: "/projects",
  },
];

export const Navbar = () => {
  // const { toggleTheme, themeDark } = useContext(ThemeContext);
  const { toggleSideMenu } = useContext(UiContext);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // const handleTheme = () => {
  //   return themeDark ? <WbSunnyOutlined /> : <NightlightOutlined />;
  // };

  return (
    <AppBar>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <NextLink href="/">
          <Box display="flex" alignItems="center">
            <LogoDevIcon sx={{ color: "", fontSize: "45px" }} />
            <Typography variant="h6">|</Typography>
            <Typography variant="h6" sx={{ ml: 0.5 }}>
              app
            </Typography>
          </Box>
        </NextLink>

        {/* <Box flex={1} /> */}
        {/* Buttons */}
        <Box
          sx={{
            display: isSearchVisible ? "none" : { xs: "none", md: "block" },
          }}
        >
          {buttonItems.map((item, index) => {
            return (
              <ActiveLink
                key={index}
                path={item.path}
                label={`${item.label}`}
              />
            );
          })}
        </Box>

        {/* <Box flex={1} /> */}

        <Box>
          {/* <Button onClick={toggleTheme}>{handleTheme()}</Button> */}
          <Button onClick={toggleSideMenu} sx={{ marginLeft: "20px" }}>
            <MenuIcon />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
