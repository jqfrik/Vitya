import {
  TextField,
  Grid,
  makeStyles,
  Container,
  Button,
  Typography,
  Snackbar,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";
import endpoints from "../../services/api/endpoints/auth";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  buttonSpacing: {
    marginLeft: theme.spacing(1),
  },
}));

function Registration() {
  const classes = useStyles();
  const navigate = useNavigate();
  //Фамилия имя,логин,пароль,почта,номер телефона

  const [fullName, setFullName] = React.useState("");
  const [login, setLogin] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [telephone, setTelephone] = React.useState("");
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState(
    "Не удалось залогиниться"
  );

  const onInputFullName = (e) => {
    setFullName(e.target.value);
  };

  const onInputLogin = (e) => {
    setLogin(e.target.value);
  };

  const onInputEmail = (e) => {
    setEmail(e.target.value);
  };

  const onInputPassword = (e) => {
    setPassword(e.target.value);
  };

  const onInputTelephone = (e) => {
    setTelephone(e.target.value);
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    let payload = {
      fullName,
      login,
      email,
      password,
      telephone,
    };
    endpoints
      .register(payload)
      .then((resp) => {
        if (resp.data.data) {
          navigate("/login");
        }
      })
      .catch((reason) => {
        setSnackBarMessage(reason.response.data.data);
        setSnackBarOpen(true);
        setTimeout(() => {
          setSnackBarOpen(false);
        }, 4000);
      });
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
          <Typography variant="h6">Create new account</Typography>
        </Grid>
      </Grid>
      <form onSubmit={onSubmitForm}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth={true}
              label="Full name"
              variant="filled"
              value={fullName}
              onInput={onInputFullName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth={true}
              label="Login"
              variant="filled"
              value={login}
              onInput={onInputLogin}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth={true}
              type="text"
              label="Email"
              variant="filled"
              value={email}
              onInput={onInputEmail}
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
            <TextField
              type="text"
              fullWidth={true}
              label="Telephone"
              variant="filled"
              value={telephone}
              onInput={onInputTelephone}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained"
              color="primary"
              type="submit">
              Registration
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Registration;
