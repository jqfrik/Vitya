import {
  TextField,
  Grid,
  makeStyles,
  Container,
  Button,
  Typography,
  Snackbar,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { DataContextProvider } from "../../App"
import endpoints from "../../services/api/endpoints/auth"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  buttonSpacing: {
    marginLeft: theme.spacing(1),
  },
}));

function Login(props) {
  const classes = useStyles();
  const navigate = useNavigate();

  const context = React.useContext(DataContextProvider)

  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [snackBarMessage,setSnackBarMessage] = React.useState("Не удалось залогиниться")

  const onInputLogin = (e) => {
    setLogin(e.target.value);
  };

  const onInputPassword = (e) => {
    setPassword(e.target.value);
  };

  const onClickLogin = async (e) => {
    e.preventDefault();
    let payload = {
      login,
      password,
    };

    endpoints
      .authentication(payload)
      .then((resp) => {
        const data = resp.data;
        localStorage.setItem("authToken", data.access_token);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("userName", data.login);
        context.setUserLogined(true)
        navigate("/");
      })
      .catch((reason) => {
        setSnackBarMessage(reason.response.data.data) 
        setSnackBarOpen(true);
        setTimeout(() => {
          setSnackBarOpen(false);
        }, 4000);
      });
  };

  const onClickRegistration = (e) => {
    e.preventDefault();
    navigate("/registration")
  };

  const onClickForgotPassword = (e) => {
    e.preventDefault();
    navigate("/recovery")
  };

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        message={snackBarMessage}
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Login</Typography>
        </Grid>
      </Grid>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth={true}
              type="login"
              label="Login"
              variant="filled"
              value={login}
              onInput={onInputLogin}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              type="password"
              fullWidth={true}
              label="Password"
              variant="filled"
              value={password}
              onInput={onInputPassword}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={onClickLogin}
            >
              Login
            </Button>
            <Button
              color="inherit"
              type="submit"
              className={classes.buttonSpacing}
              component={Link}
              to="/registration"
              onClick={onClickRegistration}
            >
              Create an account
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              type="submit"
              className={classes.buttonSpacing}
              component={Link}
              to="/recovery"
              onClick={onClickForgotPassword}
            >
              Забыли пароль
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Login;
