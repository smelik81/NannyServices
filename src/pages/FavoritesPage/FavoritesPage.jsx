import React from 'react';
import { useParams } from 'react-router-dom';
import css from './FavoritesPage.module.css';

const FavoritesPage = () => {
  const params = useParams();
  console.log(params);

  return <div>Favorites</div>;
};

export default FavoritesPage;
