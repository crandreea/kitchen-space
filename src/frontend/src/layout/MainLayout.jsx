import React from 'react';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';


import '../styles/Global.css';

const MainLayout = ({
                        children,
                        showHeader = true,
                        showFooter = true
                    }) => {
    return (
        <div className="main-layout">
            {showHeader && <Header />}

            <main className="main-content">
                {children}
            </main>

            {showFooter && <Footer />}
        </div>
    );
};

export default MainLayout;