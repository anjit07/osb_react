import styled from "@emotion/styled";
import { Box, Button, Card, CardContent, CardHeader, Container, Divider, Grid, Stack, TextField } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";


const LoginLayout = styled(Box)(
  () => `
      overflow: auto;
      flex: 5;
      overflow-x: hidden;
      align-items: center;
  `
);


function Login() {

  const { register,formState: { errors }, handleSubmit} = useForm<{ phoneNumber: string, password: string }>({mode:"all"});
  const navigate = useNavigate(); 

  const onSubmit = (data:{ phoneNumber: string; password: string }) => {
    console.log("Submitted Data:", data);
    navigate("/dashboard/client");
  };


  return <>
    <LoginLayout mt={15}>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Container maxWidth="lg" >
        <Grid container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3} >
          <Grid item xs={4}>
            <Card>
              <CardHeader title="Sign In" />
              <Divider />
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box sx={{ width: 350 }}>
                    <Stack
                      spacing={3}
                      direction="column"
                      sx={{ mb: 8 }}
                      alignItems="center">
                      <TextField
                        id="outlined-number-input"
                        error={!!errors.phoneNumber}
                        fullWidth
                        inputProps={{
                          maxLength: 10,
                        }}
                        label="Phone Number"
                        type="input"
                        autoComplete="number"
                        helperText={errors?.phoneNumber?.message}
                        {...register("phoneNumber",
                          {
                            required: "Phone number is required",
                            maxLength: {
                              value: 10,
                              message: "Phone number cannot exceed 10 digits",
                            },
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "Only numbers are allowed",
                            }
                        })}
                      />

                      <TextField
                        id="outlined-password-input"
                        error={!!errors.password}
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        helperText={errors?.password?.message}
                        {...register("password"
                          , {
                            required: "Password is required",
                            minLength: {
                              value: 3,
                              message: "Password must be at least 3 characters",
                            }
                        })}
                      />
                      <Button type="submit" variant="contained" fullWidth>Sign in</Button>
                    </Stack>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </LoginLayout>
  </>
}

export default Login;