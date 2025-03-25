import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import KitchenSpaceLogo from '../data/logo.png';
import '../styles/Header.css';

const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                        <Link to={'/about'} className={'link'}>Recipes</Link>
                    </li>
                </ul>
                <div className={"logo-container"}>
                    <Link to={'/'}><img src={KitchenSpaceLogo} alt="KitchenSpace Logo" className="logo"/></Link>
                </div>
                <ul className={"nav-right"}>
                    <li className={"nav-item-signin"}>
                        <Link to={'/signup'} className={'link'}>Sign In</Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header;