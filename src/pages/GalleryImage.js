import React from 'react';
import Navbar from '../components/indexNavBar';
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const GalleryImage = () => {
    const image = JSON.parse(localStorage.getItem('image'));

    console.log(image)
    const history = useHistory();

    const fileDownloadHandler = async (pictureUrl) => {
        const response = await fetch(pictureUrl);
        response.blob().then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = 'picture.jpeg';
            a.click();
        });
    }

    return (
        <div className="galeryImage">
            <Navbar></Navbar>
            <div className="retour">
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => history.push("/")}
                    >
                    Retour
                </Button>
            </div>
            <img src={image.link} alt={image.name} />
            <div className="information">
                <h4>Créateur : {image.users.identifier}</h4>
                <div className="categorie">
                    <h4>Catégories : {image.categories.map((res)=> <li>{res.name}</li>)}</h4>
                </div>
                <h4>Descriptions : {image.description}</h4>
                <div className="mot">
                    <h4>Mot clés : {image.mots.map((res) =><li>{res.libelle}</li>)}</h4>
                </div>
            </div>
            <div className="download">
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => fileDownloadHandler(image.link)}
                    >
                    Téléchager l'image
                </Button>
            </div>
        </div>
    );
};

export default GalleryImage;