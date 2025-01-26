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

  useEffect(() => {
    setSchowNanniesCard(3);
    dispatch(fetchNannies(token));
  }, [dispatch, token]);

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
              <NanniesCard key={nannie.name || Math.random()} nannie={nannie} />
            ))}
      </div>
    </div>
  );
};

export default NanniesPage;
