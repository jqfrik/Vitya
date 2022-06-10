import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import Routes from "./routes/Routes";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rightToolbar: {
    flexGrow: 1,
  },
  title: {
    marginRight: theme.spacing(2),
  },
}));

export const DataContextProvider = React.createContext({ fsfsd: "fsdfsd" });

function App() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [userLogined, setUserLogined] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  let providerData = {
    userLogined,
    setUserLogined,
  };

  const onClickLogout = (e) => {
    e.preventDefault()
    setUserLogined(false)
    localStorage.clear()
    navigate("/login")
  }

  return (
    <DataContextProvider.Provider value={providerData}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Chat PM
            </Typography>
            <div className={classes.rightToolbar}>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
            </div>

            <Button color="inherit" onClick={onClickLogout}>Log out</Button>
            {!userLogined && (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/registration">
                  Registration
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Routes />
      </div>
    </DataContextProvider.Provider>
  );
}

export default App;
