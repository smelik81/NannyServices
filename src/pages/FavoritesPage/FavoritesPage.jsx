import React, { useEffect, useState } from 'react';
/* import { useParams } from 'react-router-dom'; */
import css from './FavoritesPage.module.css';
import { selectIsLogedIn } from '../../redux/auth/selector.js';
import { useSelector } from 'react-redux';
import NanniesCard from '../../components/NanniesCard/NanniesCard.jsx';

const CARDS_PER_PAGE = 3;

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const isLogedIn = useSelector(selectIsLogedIn);
  const [schowFavoritesCard, setSchowFavoritesCard] = useState(CARDS_PER_PAGE);

  /*  const params = useParams();
  console.log(params); */

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favorites') || []));
    setLoading(false);
  }, []);

  useEffect(() => {
    // Получаем избранные няни из localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
    setLoading(false);
  }, []);

  // Обновляем список избранного при изменениях в localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const savedFavorites =
        JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(savedFavorites);
    };

    // Слушаем события изменения localStorage
    window.addEventListener('storage', handleStorageChange);

    // Также можно создать собственное событие для обновления при изменении внутри текущей вкладки
    window.addEventListener('favoritesUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesUpdated', handleStorageChange);
    };
  }, []);

  const handleLoadMore = () => {
    setSchowFavoritesCard(prevCard => prevCard + CARDS_PER_PAGE);
  };

  if (loading) {
    return <div className={css.loading}>Loading favorites...</div>;
  }

  const myFavoritesNannies = favorites.slice(0, schowFavoritesCard);

  return (
    <div className={css.containerNanniesPage}>
      <div className={css.containerFilters}>
        <h3 className={css.title}>Filters</h3>
        <input
          className={css.inputFilters}
          type="text"
          name="filters"
          placeholder=""
        />
      </div>
      {favorites.length === 0 ? (
        <div className={css.emptyState}>
          <p>You haven't added any nannies to your favorites yet.</p>
          <p>
            Go to the Nannies page and click the heart icon to add nannies to
            your favorites.
          </p>
        </div>
      ) : (
        <div className={css.containerNannies}>
          {myFavoritesNannies.map(nannie => (
            <NanniesCard
              key={nannie.id}
              nannie={nannie}
              isAuthenticated={isLogedIn}
            />
          ))}
        </div>
      )}
      <div className={css.containerButton}>
        {schowFavoritesCard < favorites.length && (
          <button className={css.buttonText} onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
