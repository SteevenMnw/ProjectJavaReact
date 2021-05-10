import React, { useEffect, useState } from 'react';
import Navbar from '../components/indexNavBar';
import { getAllImageOnline, getAllCategorie } from '../API/API_Access';
import CardImage from '../components/CardImage';
import { TextField } from "@material-ui/core";

const Gallery = () => {
    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [playOnce, setPlayOnce] = useState(true);
    const [rangeValue, setRangeValue] = useState(10);
    const [selectedCategorie, setselectedCategorie] = useState("");
    const [categorie, setCategorie] = useState([]);
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (playOnce) {
            getAllCategorie().then((res) => setCategorie(res));
            getAllImageOnline().then((res) => setData(res));
            setPlayOnce(false);
        }

        const sortedImages = () => {
          const imagesObj = Object.keys(data).map((i) => data[i]);
          const sortedArray = imagesObj.sort((a, b) => {
            return b.date - a.date;
          });
          setSortedData(sortedArray.slice(-rangeValue).reverse());
        };
        sortedImages();
      }, [data, playOnce, rangeValue, search]);

    return (
        <div className="Gallery">
            <Navbar></Navbar>
            <div className="images">
                <div className="sort-images">
                    <input type="range" min="1" max="200" value={rangeValue} onChange={(e) => setRangeValue(e.target.value)}/>
                    <ul>
                        {categorie.map((categorie) => {
                            return (
                                <li key={categorie.name}>
                                    <input type="radio" value={categorie.name} id={categorie.name} checked={categorie.name === selectedCategorie} onChange={(e) => setselectedCategorie(e.target.value)}/>
                                    <label htmlFor={categorie.name}>{categorie.name}</label>
                                </li>
                            )
                        })}
                    </ul>
                    <TextField
                        className="search"
                        label="Rechercher"
                        variant="outlined"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <ul className="images-list">
                    {search === "" ? 
                        selectedCategorie === "" ? 
                            sortedData
                                .filter((image) => image.categories.map((res) => res.name).includes(selectedCategorie) === false)
                                .map((image) => (
                                    <CardImage image={image} key={image.name} />
                        )) 
                        : 
                            sortedData
                                .filter((image) => image.categories.map((res) => res.name).includes(selectedCategorie))
                                .map((image) => (
                                    <CardImage image={image} key={image.name} />
                        ))
                    :
                        selectedCategorie === "" ? 
                            sortedData
                                .filter((image) => image.categories.map((res) => res.name).includes(selectedCategorie) === false && image.description.includes(search) === true 
                                    || image.categories.map((res) => res.name).includes(selectedCategorie) === false && image.name.includes(search) 
                                    || image.categories.map((res) => res.name).includes(selectedCategorie) === false && image.categories.map((res) => res.name).includes(search))
                                .map((image) => (
                                    <CardImage image={image} key={image.name} />
                        )) 
                        : 
                            sortedData
                                .filter((image) => image.categories.map((res) => res.name).includes(selectedCategorie) && image.description.includes(search) === true 
                                    || image.categories.map((res) => res.name).includes(selectedCategorie) && image.name.includes(search) 
                                    || image.categories.map((res) => res.name).includes(selectedCategorie) && image.categories.map((res) => res.name).includes(search))
                                .map((image) => (
                                    <CardImage image={image} key={image.name} />
                        ))

                }
                </ul>
            </div>
        </div>
    );
};
//image.description.includes("test") === true || image.name.includes("test") || image.categories.map((res) => res.name).includes("Visage")
export default Gallery;