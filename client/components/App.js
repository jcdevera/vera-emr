import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter, Redirect } from "react-router-dom";

import Home from './Home';
import Navigation from './Navigation';
import ViewPatients from './pages/ViewPatients';
import CreatePatients from './pages/CreatePatients';
import PatientInfo from './pages/PatientInfo'
import styles from "../src/stylesheets/styles.css";
import SearchPatients from './pages/SearchPatients';

function App(){
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path ='/' exact component={Home}/>
        <Route path ='/createpatients' exact component={CreatePatients}/>
        <Route path ='/viewpatients/' exact component={ViewPatients}/>
        <Route path ='/api/:id' exact component={PatientInfo}/>
        <Route path ='/search' exact component={SearchPatients}/>
      </Switch>
    </Router>
  )
}

export default App;
