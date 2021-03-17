import React from 'react';
import { Redirect, Route, Router } from 'react-router';

const Login = () => {
    const i = 0

    return (
        <div className="login">
            <h1>Login</h1>
            <Router>
                <Route exact path="/">
                    {i === 1 ? <Redirect to="/Home" /> : <h1>oups</h1>}
                </Route>
            </Router>

        </div>
    );
};

export default Login;