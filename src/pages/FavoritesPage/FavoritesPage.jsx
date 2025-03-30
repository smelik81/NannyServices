import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './FavoritesPage.module.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  const params = useParams();
  console.log(params);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favorites') || []));
  }, []);

  return <div>Favorites</div>;
};

export default FavoritesPage;
