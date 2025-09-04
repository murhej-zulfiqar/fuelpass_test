"use client"
import {Form, Formik, FormikProps, FormikValues} from "formik";
import {CircularProgress, Grid, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as React from "react";
import {loginValidationSchema} from "@/components/organisms/Login/validation";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {useLogin} from "@/hooks/userHooks";
import {LoginRequest} from "@/interfaces/users";


const Login: React.FC = () => {


    const login = useLogin();

    const initialValues: FormikValues = {
        username: "",
        password: "",
    }
    return (
        <Box sx={{
            width: "40%",
            height: '40vh',

        }}>
            <Paper sx={{padding: 4}} elevation={3}>
                <Typography variant="h3" fontWeight="bold" sx={{textAlign: "center", marginBottom: 2,}}>Welcome to
                    Fuelpass</Typography>
                {
                    login.isPending ?
                        <Grid container justifyContent="center" spacing={2}>
                            <CircularProgress size={50}/>
                        </Grid>
                        :
                        <Formik initialValues={initialValues} onSubmit={(values) => {
                            login.mutate(values as LoginRequest)
                        }}
                                validationSchema={loginValidationSchema()}>
                            {(formik: FormikProps<FormikValues>) => (
                                <Form>
                                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                                        <Grid size={12}>
                                            <TextField label="Username" fullWidth variant="outlined" name="username"
                                                       onChange={formik.handleChange}
                                                       error={formik.errors.username !== undefined}
                                                       helperText={formik.errors?.username as string}/>
                                        </Grid>
                                        <Grid size={12}>
                                            <TextField label="Password" fullWidth variant="outlined" name="password"
                                                       type="password"
                                                       onChange={formik.handleChange}
                                                       error={formik.errors?.password !== undefined}
                                                       helperText={formik.errors?.password as string}/>
                                        </Grid>
                                        <Grid size={8}>
                                            <Button fullWidth variant="contained" type="submit"
                                                    disabled={login.isPending}>Login</Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                }
            </Paper>
        </Box>
    )
}

export default Login