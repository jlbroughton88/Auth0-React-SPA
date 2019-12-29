# Auth0-React-SPA

This app is created by following along with a tutorial on Auth0.

This application will be able to...
    -Use Auth0 to log in via email or social (Facebook,Twitter, Google and More)
    - Grab user data
    - Grab an authentication access token to call APIs\
    - Protect parts of the application using React Router

I will be utilizing Context for state management. 

Auth0-spa-js provides many benefits over the auth0.js library.
    - Targeted for SPA use
    - REq   uires less code for single page apps
    - Smaller size, only comes in at about 7kb.
    - Automatically manages token expiration and renewal.

The Authentication Flow for End-Users...
    1. User clicks login
    2. Auth0 redirects user to the application.
    3. Auth0 redirects user to the application.
    4. The app gets user info from Auth0.
    5. Show and hide parts of the app if the user is authenticated.



STEPS:
    Configure Auth0 Account
    Install the Auth0 SPA SDK
    Add it to React (We will use React Context and React Hooks)
        - Initialize the Auth0 SPA SDK: createAuth0Client()\
        - Use the library to login: auth0Client.loginWithRedirect()
        - Get the logged in user: auth0Client.isAuthenticated()
        - Check if the user is authenticated: auth0Client.isAuthenticated()
        - Get the authentiucation token: auth0Client.getTokenSilently()
    Display authentication data in the React components


I may need the auth tools from the SDK in multiple components around our application. We'll use a React Context so that
we have access to authg tools all over our application.
    - Need to wrap the Auth0Provider around our entire application to use it's context.


Instantiating the Auth0 SPA SDK

We will: 
    -Use Auth0 SPA SDK's createAuthClient() method
    - Create an initializeAuth0 method where we create an auth0Client
    - Create an auth0Client property on our state.
    - Create a config property to store our credentials from Auth0 (Domain and ClientID)

    All this will be done inside the Auth0Provider class in our auth0-context.js file