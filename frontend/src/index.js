import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from './containers/login'
import WrappedRegistrationForm from './containers/register'

ReactDOM.render(
    <Router>
        <div className='login-register'>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={WrappedRegistrationForm}/>
        </div>
    </Router>,
    document.getElementById('container')
);
