import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  DashboardOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import { useContext } from "react";
import { UiContext } from "../../context/ui";
import { AuthContext } from "../../context/auth";
import { ItemMenu } from "./ItemMenu";
import router, { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

const listAdminPanel = [
  { text: "Dashboard", icon: <DashboardOutlined />, path: "/admin" },
  { text: "Productos", icon: <CategoryOutlined />, path: "/admin/products" },
  {
    text: "Ordenes",
    icon: <ConfirmationNumberOutlined />,
    path: "/admin/orders",
  },
  { text: "Usuarios", icon: <AdminPanelSettings />, path: "/admin/users" },
];

export const SideMenu = () => {
  const { toggleSideMenu, isMenuOpen } = useContext(UiContext);
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const router = useRouter();

  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };

  return (
    <Drawer
      open={isMenuOpen}
      onClose={toggleSideMenu}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility">
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {isLoggedIn && (
            <>
              <ListItem>
                <ListItemIcon>
                  <SentimentSatisfiedAltOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={`${user?.name} (${user?.role})`} />
              </ListItem>

              <ListItem button onClick={() => navigateTo(`/profile`)}>
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary={"Perfil"} />
              </ListItem>
            </>
          )}

          <ListItem
            button
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={() => navigateTo(`/`)}
          >
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={() => navigateTo(`/projects`)}
          >
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Projects"} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={() => navigateTo(`/contact`)}
          >
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary={"Contact"} />
          </ListItem>

          {isLoggedIn ? (
            <ListItem button onClick={logout}>
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={"Salir"} />
            </ListItem>
          ) : (
            <ListItem
              button
              onClick={() => navigateTo(`/auth/login?page=${router.asPath}`)}
            >
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary={"Ingresar"} />
            </ListItem>
          )}

          {/* Admin */}
          <Divider />

          {user?.role === "admin" ? (
            <>
              <ListSubheader>Admin Panel</ListSubheader>
              <ItemMenu lista={listAdminPanel} />
            </>
          ) : null}
        </List>
      </Box>
    </Drawer>
  );
};
