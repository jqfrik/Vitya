import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Registration from "../../pages/Registration";
import Recovery from "../../pages/Recovery";
import {
  CircularProgress,
  makeStyles,
  Container,
  Grid,
} from "@material-ui/core";
import React from 'react'
import {DataContextProvider} from "../../App"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

function AppRoutes() {
  const classes = useStyles();
  let context = React.useContext(DataContextProvider)

  return (
    <Routes>
      <Route path="/" element={ <Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/recovery" element={<Recovery />}></Route>
    </Routes>
  );
}

export default AppRoutes;
