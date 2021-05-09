import { Link } from "react-router-dom";
import React from 'react';

const Image = (props) => {
    const { image } = props;
    
    const session = () =>{
        localStorage.setItem('image', JSON.stringify(image));
    }

    return (
        <li className="card">
            <img src={image.link} alt={image.name} />
            <div className="data-container">
                <ul>
                    <Link to="/gallery/image" onClick={() => session()}>
                        test
                    </Link>
                </ul>
            </div>
        </li>
    );
};

export default Image;