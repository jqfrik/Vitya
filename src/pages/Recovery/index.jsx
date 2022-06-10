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
import endpoint from "../../services/api/endpoints/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  buttonSpacing: {
    marginLeft: theme.spacing(1),
  },
}));

function Recovery() {
  const classes = useStyles();
  const [emailOrSms, setEmailOrSms] = React.useState("");
  const [fixedEmail,setFixedEmail] = React.useState("");
  const [firstStage,setFirstStage] = React.useState(true);
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState(
    "Не удалось залогиниться"
  );

  const onInputEmail = (e) => {
    setEmailOrSms(e.target.value);
  };
  const firstStageHandler = () => {
    let payload = {
      email:emailOrSms,
    };
    setFixedEmail(emailOrSms);
    endpoint
      .resetPasswordFirstStage(payload)
      .then((resp) => {
        setFirstStage(false)
        setEmailOrSms("")
      })
      .catch((reason) => {
        setSnackBarMessage(reason.response.data.data);
        setSnackBarOpen(true);
        setTimeout(() => {
          setSnackBarOpen(false);
        }, 4000);
      });
  }
  const secondStageHandler = () => {
    let payload = {
      email:fixedEmail,
      smsChecker:emailOrSms
    }
    endpoint.resetPasswordSecondStage(payload).then(resp => {

    }).catch(reason => {
      setSnackBarMessage(reason.response.data.data);
      setSnackBarOpen(true);
      setTimeout(() => {
        setSnackBarOpen(false);
      }, 4000);
    })
  }

  const onClickForgotPassword = (e) => {
    e.preventDefault();
    if(firstStage){
      firstStageHandler()
    }
    if(!firstStage){
      secondStageHandler()
    }
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
              type="email"
              label="Email"
              variant="filled"
              value={emailOrSms}
              onInput={onInputEmail}
            />
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
              { firstStage ? "Отправить Email" : "Отправить sms-checker" }
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Recovery;
