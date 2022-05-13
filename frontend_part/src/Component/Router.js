import React from 'react';
import {Route,Router } from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';
import Login from './Login';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
const AllRouter=()=>{
    return(
        <Router history={history}>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/dashboard" component={Dashboard}/>
        </Router>
    )
}     


export default AllRouter;