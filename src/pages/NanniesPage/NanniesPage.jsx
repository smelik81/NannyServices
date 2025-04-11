import React, { useEffect, useState } from 'react';
import { fetchNannies } from '../../redux/nannies/operation.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectNannies,
  selectLoading,
  selectStatus,
} from '../../redux/nannies/selector.js';

import css from './NanniesPage.module.css';
import { selectToken } from '../../redux/auth/selector.js';
import NanniesCard from '../../components/NanniesCard/NanniesCard.jsx';

const NanniesPage = () => {
  const dispatch = useDispatch();
  const nannies = useSelector(selectNannies);
  const loading = useSelector(selectLoading);
  const token = useSelector(selectToken);
  const status = useSelector(selectStatus);

  const [schowNanniesCard, setSchowNanniesCard] = useState(3);
  const [filteredNannies, setFilteredNannies] = useState([]);
  const [sortType, setSortType] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });

  useEffect(() => {
    setSchowNanniesCard(3);
    dispatch(fetchNannies(token));
  }, [dispatch, token]);

  useEffect(() => {
    let result = [...nannies];
    result = result.filter(
      nannie =>
        nannie.price_per_hour >= priceRange.min &&
        nannie.price_per_hour <= priceRange.max
    );
    console.log(result);

    switch (sortType) {
      case 'nameAsc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'ratingAsc':
        result.sort((a, b) => a.rating - b.rating);
        break;
      case 'ratingDesc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredNannies(result);
  }, [nannies, priceRange]);

  const handleLoadMore = () => {
    setSchowNanniesCard(prevCard => prevCard + 3);
  };

  const handleSortChange = e => {
    setSortType(e.target.value);
  };

  const handlePriceRangeChange = (min, max) => {
    setPriceRange({ min, max });
  };

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
      <div className={css.containerNannies}>
        {status === 'succeeded' &&
          nannies
            .slice(0, schowNanniesCard)
            .map(nannie => (
              <NanniesCard
                key={nannie.name || Math.random()}
                nannie={nannie}
                isAuthenticated={!!token}
              />
            ))}
      </div>
      <div className={css.containerButton}>
        {schowNanniesCard < filteredNannies.length && (
          <button className={css.buttonText} onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </div>
    </div>
  );
};

export default NanniesPage;
