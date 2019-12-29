import React from "react";
import { useAuth0 } from "../contexts/auth0-context";
import "./Header.css";

export default function Header() {
    const { isLoading, user, loginWithRedirect, logout } = useAuth0();

    return (
        <header>
            <nav className="navbar is-dark">
                <div className="container">
                    <div className="navbar-menu is-active">
                        <div className="navbar-brand">
                            <button className="navbar-item">
                                My Cool App
                        </button>
                        </div>
                    </div>
                    <div className="navbar-end">
                        {!isLoading && !user && (
                            <button onClick={loginWithRedirect} className="navbar-item">
                                Login
                        </button>
                        )}
                    </div>
                    {!isLoading && user && (
                        <>
                            <button className="navbar-item">{user.name}</button>
                            <button onClick={() => logout({ returnTo: window.location.origin })}> Logout </button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}