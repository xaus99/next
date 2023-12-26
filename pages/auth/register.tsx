import { useState, useContext } from "react";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { AuthContext } from "../../context/auth";
import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";
import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const destination = router.query.page?.toString() || "/";
  const { registerUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setShowError(true);
      toast.error(`${message}`);
      setTimeout(() => setShowError(false), 5000);
    } else {
      toast.success("Usuario creado correctamente");
      router.replace(destination);
    }

    // await signIn("credentials", { redirect: false, email, password });
  };

  return (
    <AuthLayout title={"Register"}>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Crear cuenta
              </Typography>
              <Chip
                label="Error al registrar usuario"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none", marginTop: 1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Nombre completo"
                variant="filled"
                fullWidth
                {...register("name", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                disabled={showError}
              >
                {showError ? "Espera un momento" : "Registrar"}
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={
                  router.query.page
                    ? `/auth/login?page=${router.query.page}`
                    : `/auth/login`
                }
              >
                ¿Ya tienes cuenta?
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
