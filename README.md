# Auth0-React-SPA

This app is created by following along with a tutorial on Auth0.
https://auth0.com/blog/authenticating-your-first-react-app/

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

            Once our login is set up, and the user is able to log in with their preferred method, we need to handle the authentication.

            Auth0 will redirect a user back to our application and we can handle that in our Auth0Provider code.

            Notice there is a "code" in the url after logging in, we will need to take this and use it to authenticate our user.
            We'll arrange our Auth0 context so that it can check for the string "code=" in the URL. Lets replace our original
            initializeAuth0 method.

            After this, create the handleRedirectCallback method.

            We are checking for "code=" in the URL. If that does exist, then we are going to go straight to the handleRedirectCallback() method. 
            This will call Auth0's handleRedirectCallback() method and then go grab the user's info. We will setState and React will pass all this info down to our app.
            
            At the bottom of this method, we need to update the URL to remove the "code=". Tyhis code can only be used once, so we need to remove it from the URL to prevent
            handleRedirectCallback() from running again in the case that the user refreshes the page. We'll use the window.history.replace() to remove the code. 

            We will then update the handleRedirectCallback and include "window.history.replaceState() after setting the state"

            Restart the server with npm start. Once up and running again, we can click login, log in on the Universal login page, and get redirected back to our app. 
            Nothing will have changed in the UI, but in React Dev Tools, we can see that we have a user in our app.

            Next, lets grab the user out of the Auth0 Context and display it in our app. We'll uypdate App.js to show or hide the login button.

            Showing the login button if there is no user...

            We are pulling isLoading and the user directly out of the Auth0 Context. We could use isAuthenticated also.

            We are using React Fragments to wrap our code here since React always wants one parent element. The <> </> syntax is a React Fragment short syntax introduced recently.

            Showing the user information if they are logged in...

            Lets write some code to show the user's name and avatar if the app is not loading and there is a user.

            By using object destructuring, lets get our user's info to show on the screen.

            Now when we are logged in we will see our user's info. We are showing their avatar using user.picture.

            Our app has authentication functioning now. We have been able to:
                - Show a login button
                - Log a user in with social auth.
                - Display the user's info.

            Logout For Our React App...

            We have users logged in. We'll give them a way to logout now. We already have the functionality to log a user out thanks to the logout() method.

            We also have already passed it to our application through React Context. Within the configObject, we are going to add a couple of things.

            Add the logout button to app.js

            When using the logout method, we need to provide a place for Auth0 to return our users. We do that with the returnTo property. The flow for loggin gout is similar to logging in.

                - Redirect users to Auth0.
                - Auth0 sends the user back to our app.

            This is where our applications URL (http://localhost:3002) in the Allowed Logout URLs comes into play.

            We can now log in and log out of our app!

            Renaming the Auth0 Context to useAuth0

            Our Auth0 Context file is the main file we need to impliment our entire Auth0 SPA SDK strategy. 

            We can tweak this one more time to make it a bit more readable. To make this change, we will update auth0-context.js.

            We have now added useContext and then used it directly in this file. Now we dont have to useContext() in our other components.

            Using our new useAuth0()
        
            We can now update App.js with the useAuth0().

            Our code is that much nicer now and we have to write less in our React components.

            WE have everything we need 5to work with authentication in our React applications. Lets take a look at three more common tasks that we need next: 

                - Getting user information in other components
                - Grabbing an auth token to use when calling APIs.
                - Protecting specific React roiutes (ie /dashboard page)

            
            Getting User Info in React Components...

            Lets add a <Header/> component and see how we can use 5the user info there. The technique is similar to what we did in App.js. Create a new folder in src/ and we
            will name it components. Within the components folder, create a new file called Header.js.

                Creating a header component...

                We're going to drop a log of code here. The main things to note are that we are using useAuth() just like we did in App.js. We are also using Bulma classes for creating a navbar.
                Create a CSS file to style the buttons too.

            MUST HAVE REAL API KEY TO STAY LOGGED IN ON REFRESH
            Email method works.