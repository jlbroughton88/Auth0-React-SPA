import React, { useContext } from 'react';
import "bulma/css/bulma.css"
import { Auth0Context } from "./contexts/auth0-context";

function App() {

  const { isLoading, user, loginWithRedirect } = useContext(Auth0Context);


  return (
    <div className="App">
      <div className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            {!isLoading && !user && (
              <>
                <h1>Click Below!</h1>
                <button onClick={loginWithRedirect} className="button is-danger">
                  Login
                </button>
              </>
            )}
            {!isLoading && user && (
              <>
                <h1>You are logged in!</h1>
                <p>Hello, {user.given_name} {user.family_name}</p>

                {user.picture && <img src={user.picture} alt="My Avatar"/>}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
