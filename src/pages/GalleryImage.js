import React from 'react';
import Navbar from '../components/indexNavBar';

const GalleryImage = () => {
    const image = JSON.parse(localStorage.getItem('image'));

    console.log(image)

    return (
        <div className="galeryImage">
            <Navbar></Navbar>
            <li className="cardImage">
                <img src={image.link} alt={image.name} />
            </li>
        </div>
    );
};

export default GalleryImage;