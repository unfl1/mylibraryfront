import React, { useState } from 'react';
import Nav from '../components/Nav';
import PostList from '../components/PostList';
import Footer from '../components/Footer';
import Info from '../components/Info';
import PopupAd from '../components/PopupAd';

function HomePage() {
    const [showPopup, setShowPopup] = useState(true);


    const handleClosePopup = () => {
        setShowPopup(false);
    };


    return (
        <div className="min-h-screen flex flex-col">
            <header>
                <Nav />
            </header>
            <main className="flex-grow">
                <div className="container mx-auto px-4">
                     <Info />
                </div>
                <div className="container mx-auto px-4">
                    <PostList />
                </div>
            </main>
            <footer className="mt-auto">
                <Footer />
            </footer>
            {showPopup && <PopupAd onClose={handleClosePopup}  />}
        </div>
    );
}

export default HomePage;