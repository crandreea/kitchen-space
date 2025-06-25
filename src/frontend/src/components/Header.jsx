import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import KitchenSpaceLogo from '../data/logo.png';
import '../styles/Header.css';

const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId"); 

        navigate('/'); 
        window.location.reload();
    };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={"header"}>
            <div className={"navigation"}>
                <button
                    className="menu-button"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                >
                    {isMenuOpen ? '✕' : '☰'}
                </button>
                <ul className={`nav-left ${isMenuOpen ? 'open' : ''}`}>

                    <li className={"nav-item"}>
                        <Link to={'/'} className={'link'}>Home</Link>
                    </li>
                    <li className={"nav-item"}>
                        <Link to={'/about'} className={'link'}>About</Link>
                    </li>
                    <li className={"nav-item"}>
                        <Link to={'/recipes'} className={'link'}>Recipes</Link>
                    </li>
                </ul>
                <div className={"logo-container"}>
                    <Link to={'/'}><img src={KitchenSpaceLogo} alt="KitchenSpace Logo" className="logo"/></Link>
                </div>
                <ul className={"nav-right"}>
                    {localStorage.getItem("authToken") ? (
                        <> {/* Folosește un Fragment pentru a returna mai multe elemente */}
                            <li className={"nav-item-profile"}>
                                <Link to={'/profile'} className={'link'}>My Profile</Link> {/* Poți păstra My Profile */}
                            </li>
                            <li className={"nav-item-logout"}> {/* O nouă intrare pentru Logout */}
                                <button onClick={handleLogout} className={'link logout-button'}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <li className={"nav-item-signin"}>
                            <Link to={'/signup'} className={'link'}>Sign Up</Link>
                        </li>
                    )}
                </ul>

            </div>
        </header>
    )
}

export default Header;