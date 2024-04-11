import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Loader } from 'react-feather';
import { useAuth0 } from "@auth0/auth0-react";

const Layout = () => {
    const [tab,setTab] = useState('coins')
    const { loginWithRedirect , isAuthenticated , logout , user } = useAuth0();
    return (
        <div>
            <nav>
                {
                    isAuthenticated && <p>{user.name}</p>
                }
            </nav>
            {
                isAuthenticated ? 
                <nav>
                <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
                </nav>
                :
                <nav className='login'>
                <button onClick={() => loginWithRedirect()}>Log In</button>
                </nav>
            }

            <Loader className='spinicon'></Loader>
            <h1 className='brand'>CoinFlow 🚀</h1>
            <nav>
                <ul className='tabs'>
                    <li><Link to="/" className={tab == 'coins' ? 'active' : ''} onClick={()=> setTab('coins')}>Top Coins</Link></li>
                    <li><Link to="/watchlist" className={tab == 'watchlist' ? 'active' : ''} onClick={()=> setTab('watchlist')}>Watchlist</Link></li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    );
}

export default Layout;
