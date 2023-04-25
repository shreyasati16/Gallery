import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Link from "@mui/material/Link";
import { Link as Rlink, useNavigate } from "react-router-dom";
// import { Signup_getdata } from '../Services'
import { emailRegExp,nameRegExp, F_NAME, MIN_CHARACTER, NAME_regex_message, FIRST_NAME_REQUIRE, ENTER_YOUR_LAST_NAME, ENTER_YOUR_USERNAME, LAST_NAME_IS_REQUIRED, UNIQUE_USERNAME, USERNAME_ALREADY_USE, USERNAME_IS_REQUIRED, USERNAME_LENGTH, ENTER_YOUR_EMAIL, EMAIL_REGEX_VALDATION_MESSAGE, UNIQUE_EMAIL , EMAIL_VALIDATION, ENTER_A_VALID_EMAIL, ENTER_PASSWORD, PASSWORD_LENGTH, PASSWORD_REQUIRE,TOO_SHORT, TOO_LONG, EMAIL_ALREADY_IN_USE, PHONE_REQUIRE, PHONENO_INVALID, phoneRegExp, userNameMessage,userNameRegex, passwordMessage,passwordRegex} from "../Constants";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
    
  };
const validationSchema = yup.object({
    first_name: yup
      .string(F_NAME)
      .min(3,MIN_CHARACTER )
      .matches(
        nameRegExp,
        NAME_regex_message
      )
      .required(FIRST_NAME_REQUIRE),
    last_name: yup
      .string(ENTER_YOUR_LAST_NAME)
      .min(3,MIN_CHARACTER)
      .matches(
        nameRegExp,
        NAME_regex_message
      )
      .required(LAST_NAME_IS_REQUIRED),
      username: yup
      .string(ENTER_YOUR_USERNAME)
      .matches(userNameRegex,userNameMessage)
      .test(
          UNIQUE_USERNAME,
          USERNAME_ALREADY_USE,
          async (value, context) => {
              try {
                  await yup
                      .string(ENTER_YOUR_USERNAME)
                      .required(USERNAME_IS_REQUIRED)
                      .min(8,USERNAME_LENGTH )
                      .validate(value);    
              // Signup_getdata(value)
              const config = {
                headers: { "Content-Type": "application/json",
                 "ngrok-skip-browser-warning":"237"
               },
            };
            const response =  await axios.get(
                `${process.env.REACT_APP_API}/user/username-validator/0/?username=${value}`,
                config
            );
            if(response.status === 200){
              return true;
            }else{
        
            }
            console.log(response);
              } catch (error) {
                  if (error?.response?.data?.username[0])
                      error.message = error.response.data.username[0];
                  return context.createError({
                      message: error.message,
                  });
              }
          }
      ),
  email: yup
      .string(ENTER_YOUR_EMAIL)
      .matches(emailRegExp,EMAIL_REGEX_VALDATION_MESSAGE)
      .test(
          UNIQUE_EMAIL,
          EMAIL_ALREADY_IN_USE,
          async (value, context) => {
              try {
                  await yup
                      .string(ENTER_YOUR_EMAIL)
                      .required(EMAIL_VALIDATION)
                      .email(ENTER_A_VALID_EMAIL)
                      .validate(value);
                  const config = {
                      headers: { "Content-Type": "application/json",
                      "ngrok-skip-browser-warning":"237"
                     },
                  };
                  const response = await axios.get(
                    `${process.env.REACT_APP_API}/user/emailvalidator/0/?email=${value}`,
                      config
                  );
                  if(response.status === 200){
                    return true;
                  }else{
              
                  }
                  console.log(response);
                  return true;
              } catch (error) {
                  if (error?.response?.data?.email[0])
                      error.message = error.response.data.email[0];
                  return context.createError({
                      message: error.message,
                  });
              }
          }
      ),
    password: yup
      .string(ENTER_PASSWORD)
      .min(8,PASSWORD_LENGTH)
      .matches(passwordRegex,passwordMessage)
      .required(PASSWORD_REQUIRE),
      
    contact: yup
      .string()
      .required(PHONE_REQUIRE)
      .matches(phoneRegExp,PHONENO_INVALID)
      .min(10, TOO_SHORT)
      .max(10, TOO_LONG),
  });

  const blankInitialValues = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    contact: "",
  };

  const formik = useFormik({
    initialValues: blankInitialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
        console.log(values);
        try {
            const config = {
                headers: { "Content-Type": "multipart/form-data",
                 "ngrok-skip-browser-warning":"237"
               },
               
            };
            let formData = new FormData();
            
            Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
            });

            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/user/signup/`,
                formData,
                config
            );
            console.log(data);
            localStorage.clear("signup_vals");

            navigate("/");
            alert("Succesfull SignUp!");
        } catch (error) {
            console.log(error.response.status);
            if (error.response.status === 400) {
                const responseErrors = {};
                for (const [key, value] of Object.entries(
                    error.response.data
                )) {
                    responseErrors[key] = value[0];
                }
                formik.setErrors(responseErrors);
            }
            formik.setSubmitting(false);
        }
    },
});

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
    const saved = JSON.parse(localStorage.getItem("signup_vals"));
    if (saved) {
      formik.setValues(saved);
    }
  }, []);

  React.useEffect(() => {
    if (formik.values !== blankInitialValues)
      localStorage.setItem("signup_vals", JSON.stringify(formik.values));
  }, [formik.values]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="first_name"
                required
                fullWidth
                id="first_name"
                label="First Name"
                autoFocus
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.first_name && formik.errors.first_name}
                helperText={formik.touched.first_name && formik.errors.first_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="family-name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.last_name && formik.errors.last_name}
                helperText={formik.touched.last_name && formik.errors.last_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.errors.username && formik.touched.username}
                helperText={formik.errors.username}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email && formik.touched.email}
                helperText={formik.errors.email}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="new-password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
                onBlur={formik.handleBlur}
              />
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  style={{
                    marginLeft: 340,
                    position: "absolute",
                    marginBottom: 52,
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="contact"
                label="Contact"
                type="number"
                id="contact"
                autoComplete="contact"
                value={formik.values.contact}
                onChange={formik.handleChange}
                error={formik.touched.contact && formik.errors.contact}
                helperText={formik.touched.contact && formik.errors.contact}
                onBlur={formik.handleBlur}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={formik.isSubmitting}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Rlink to="/signin">
                <Link variant="body2">Already have an account? Sign in</Link>
              </Rlink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
