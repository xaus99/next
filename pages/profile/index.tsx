import type { NextPage } from "next";
import { DefaultLayout, ShopLayout } from "../../components/layouts";
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
// import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { tesloApi } from "../../api";
import toast from "react-hot-toast";

type FormData = {
  newPassword: string;
  email: string;
};

const Profile: NextPage = () => {
  // const { data } = useSession();
  const { loginUser, isLoggedIn } = useContext(AuthContext);
  console.log({ loginUser }, "==================> Profile");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      newPassword: "123456",
    },
  });

  const onChangePassword = async ({ newPassword }: FormData) => {
    try {
      await tesloApi.post("/user/change-password", {
        newPassword,
      });
      toast.success("Contraseña cambiada correctamente");
      // setValue("newPassword", "");
    } catch (error) {
      console.log("Error al cambiar la contraseña...", error);
    }
  };

  // const OnSubmit = handleSubmit((onChangePassword) => {
  //   console.log(onChangePassword);
  // });
  return (
    <ShopLayout title={"Perfil"} pageDescription={"Perfil"}>
      <form onSubmit={handleSubmit(onChangePassword)} noValidate>
        <Grid
          container
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          alignContent={"center"}
        >
          <Box sx={{ width: "250px" }}>
            <Grid
              item
              xs={12}
              sx={{ marginY: 5, justifyContent: "center", display: "flex" }}
            >
              <Avatar
                alt="Remy Sharp"
                src="image/default.jpg"
                sx={{
                  width: "150px",
                  height: "150px",
                  border: 5,
                  color: "#e1e1e1",
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                marginTop: 2,
              }}
            >
              <TextField
                type="name"
                // label={`${}`}
                variant="filled"
                disabled
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                marginTop: 2,
              }}
            >
              <TextField
                type="email"
                // label={`${data?.user?.email}`}
                variant="filled"
                disabled
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                marginTop: 2,
              }}
            >
              <TextField
                type="password"
                label="Password"
                variant="filled"
                {...register("newPassword", {
                  required: "Este campo es requerido",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                // disabled={showError}
              >
                {/* {showError ? "Espera un momento" : "Ingresar"} */}
                Cambiar Contraseña
              </Button>
            </Grid>
          </Box>
        </Grid>
      </form>
    </ShopLayout>
  );
};

export default Profile;
