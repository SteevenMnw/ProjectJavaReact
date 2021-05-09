import React, { useEffect, useState } from 'react';
import Navbar from '../components/indexNavBar';
import { getAllImage } from '../API/API_Access';
import CardImage from '../components/CardImage';

const Gallery = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getAllImage()
            .then((res) => setData(res));
        console.log(data)
    }, []);

    return (
        <div className="Gallery">
            <Navbar></Navbar>
            <div className="images">
                <ul className="images-list">
                {data.map((image) => ( 
                    <CardImage image={image} key={image.name}/>
                ))}
                </ul>
            </div>
        </div>
    );
};

export default Gallery;