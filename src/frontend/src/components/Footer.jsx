import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import logo from '../data/KitchenSpaceLogo.png';


const Footer = () => {
    return (
        <footer className="footer-container">
            <div className={"footer-image"}>
                <img className={"footer-logo"} src={logo} alt="logo"/>
            </div>
            <div className={"footer-text"}>
                <p className={"text"}>&copy; {new Date().getFullYear()}KitchenSpace. All rights reserved.</p>
            </div>
            <div className={"footer-links"}>
                <a>Terms of service</a>
                <a>Privacy policy</a>
                <a>Contact us </a>
            </div>
        </footer>
    )
}

export default Footer;