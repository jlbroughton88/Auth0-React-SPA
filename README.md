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

# We will: 
    - Use Auth0 SPA SDK's createAuthClient() method
    - Create an initializeAuth0 method where we create an auth0Client
    - Create an auth0Client property on our state.
    - Create a config property to store our credentials from Auth0 (Domain and ClientID)


    All this will be done inside the Auth0Provider class in our auth0-context.js file


    Add a loading property to our state so that we can wait for authentication to confirm.
    Whenever a single page app is loaded, our app needs to call the Auth0 API through the Auth0 SDK.
    This check to the API takes time. While we are waiting to get tghe auth data from the Auth0 API, we
    should know that our app is loading. We shouldnt show any user info until we know if they are logged in or not.
    
    To do this we will be updating the state, initializeAuth0, and configObject.

    Checking authentication on user
        We'll keep adding to our state with an isAuthenicated property. We can use this property across our entire application to
        check if a user is logged in or not. We can use this property to hide and show parts of our UI based on if the user is 
        logged in or our. We'll use the Auth0 SPA SDK's isAuthenticated() method.

        Add an isAuthenticated property to state and we'll add more to initializeAuth0().
    
    Grabbing an authenticated user
        - The last part of our initializeAuth0() is to go and grab the user if that user is logged in.
          lets add a user property to state and update our method.

    We have now created a React context that is a  React Class. This acts the same as most React classes. It carries its own state
    and has its own render() function. This Auth0Provider is also known as a higher-order component. This will wrap our overall <App />
    component and will pass down it's own state to every component inside of our React App. This is how we will be able to use
    Auth0Provider across our entire application.

    This Auth0Provider provides us with some important data like: 
        - isLoading
        - isAuthenticated
        - user
    
    We'll keep adding to this file to handle imnportant authentication things like:
        - Signup
        - Login
        - Handling the redirect after loggin in or signing up.

    The next step is to add a button to let our users sign up from our App.js.

    

    Logging In A User

        To log in users, we will be using Auth0's universal login. This is a convenient way to log a user in because we dont
        have to style our own login page. We will be redirecting users to an Auth0 hosted login page (Universal Login) and then that page
        will redirect our user back to our application. To start logging users in with Universal Login, we will have to do a few tasks:
            - Configure Universal Login from the Auth0 Dashboard
            - Create a login method inside our Auth0 Context
            - Use the login method inside our React components.

        Passing a login method to our components
            The Auth0 SPA SDK has a loginWithRedirect() method. We can pass this directly to our child components by passing it into value.

            We will be adding auth0Client and loginWithRedirect() to our render.

            We have directly passed the auth0Client method for loginWithRedirect() straight to child components. We are also 
            passing any arguments to it using (...p)

            While we're at it, lets pass some more of the library methods for use in our applications. 
            Specifically, we are going to pass: 
                - getTokenSilently(): Grab the token so we can use it for API calls.
                - getIdTokenClaims(): Get the information out of our token.
                - logout(): Call the logout and get redirected to Auth0 Logout