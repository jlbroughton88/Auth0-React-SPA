import React, { Component, createContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";

// Create the context
export const Auth0Context = createContext();

// Create a provider
export class Auth0Provider extends Component {
    state = {
        auth0Client: null,
        isLoading: true,
        isAuthenticated: false
    };

    config = {
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        clientID: process.env.REACT_APP_CLIENT_ID,
        redirect_uri: window.location.origin
    }

    componentDidMount() {
        this.initializeAuth0();
    }

    // Initialize the auth0 library
    initializeAuth0 = async () => {
        const auth0Client = await createAuth0Client(this.config);
        const isAuthenticated = await auth0Client.isAuthenticated();

        this.setState({ auth0Client, isLoading: false, isAuthenticated });
    }

    render() {
        const { isLoading, isAuthenticated } = this.state;
        const { children } = this.props;

        const configObject = { 
            isLoading,
            isAuthenticated
         }

        return (
            <Auth0Context.Provider value={configObject}>
                {children}
            </Auth0Context.Provider>
        )
    } 
}