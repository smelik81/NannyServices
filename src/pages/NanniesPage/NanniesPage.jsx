import React, { useEffect, useRef, useState } from 'react';
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
import { ChevronDown, ChevronUp } from 'lucide-react';

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSchowNanniesCard(3);
    dispatch(fetchNannies(token));
  }, [dispatch, token]);

  useEffect(() => {
    setFilteredNannies(nannies);
  }, [nannies]);

  useEffect(() => {
    let result = [...nannies];
    result = result.filter(
      nannie =>
        nannie.price_per_hour >= priceRange.min &&
        nannie.price_per_hour <= priceRange.max
    );

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
  }, [nannies, priceRange, sortType]);

  const handleLoadMore = () => {
    setSchowNanniesCard(prevCard => prevCard + 3);
  };

  const handleSortChange = value => {
    setSortType(value);
    setIsFilterOpen(false);
  };

  const handlePriceRangeChange = e => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const getSortLabel = () => {
    switch (sortType) {
      case 'nameAsc':
        return 'Name (A to Z)';
      case 'nameDesc':
        return 'Name (Z to A)';
      case 'ratingAsc':
        return 'Rating (Low to High)';
      case 'ratingDesc':
        return 'Rating (High to Low)';
      default:
        return 'Select sorting';
    }
  };

  return (
    <div className={css.containerNanniesPage}>
      <div className={css.containerFilters} ref={filterRef}>
        <h3 className={css.title}>Filters</h3>
        <div className={css.filtersWrapper}>
          <button
            className={css.filterButton}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            {<span>{getSortLabel()}</span>}
            {isFilterOpen ? (
              <ChevronUp className={css.filterIcon} />
            ) : (
              <ChevronDown className={css.filterIcon} />
            )}
          </button>

          {isFilterOpen && (
            <div className={css.filterDropdown}>
              <div className={css.filterSection}>
                <h4 className={css.filterSectionTitle}>Sort by Name</h4>
                <button
                  className={`${css.filterOption} ${
                    sortType === 'nameAsc' ? css.active : ''
                  }`}
                  onClick={() => handleSortChange('nameAsc')}
                >
                  A to Z
                </button>
                <button
                  className={`${css.filterOption} ${
                    sortType === 'nameDesc' ? css.active : ''
                  }`}
                  onClick={() => handleSortChange('nameDesc')}
                >
                  Z to A
                </button>
              </div>

              <div className={css.filterSection}>
                <h4 className={css.filterSectionTitle}>Sort by Rating</h4>
                <button
                  className={`${css.filterOption} ${
                    sortType === 'ratingDesc' ? css.active : ''
                  }`}
                  onClick={() => handleSortChange('ratingDesc')}
                >
                  Highest First
                </button>
                <button
                  className={`${css.filterOption} ${
                    sortType === 'ratingAsc' ? css.active : ''
                  }`}
                  onClick={() => handleSortChange('ratingAsc')}
                >
                  Lowest First
                </button>
              </div>

              <div className={css.filterSection}>
                <h4 className={css.filterSectionTitle}>Price Range</h4>
                <div className={css.priceInputs}>
                  <input
                    type="number"
                    name="min"
                    value={priceRange.min}
                    onChange={handlePriceRangeChange}
                    placeholder="Min"
                    className={css.priceInput}
                  />
                  <span>to</span>
                  <input
                    type="number"
                    name="max"
                    value={priceRange.max}
                    onChange={handlePriceRangeChange}
                    placeholder="Max"
                    className={css.priceInput}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={css.containerNannies}>
        {status === 'succeeded' &&
          filteredNannies
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
