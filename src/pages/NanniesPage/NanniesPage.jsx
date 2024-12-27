import React, { useEffect } from 'react';
import { fetchNannies } from '../../redux/nannies/operation.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectNannies, selectLoading } from '../../redux/nannies/selector.js';

import css from './NanniesPage.module.css';

const NanniesPage = () => {
  const dispatch = useDispatch();
  const nannies = useSelector(selectNannies);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchNannies());
  }, [dispatch]);

  return <div className={css.container}>NanniesList</div>;
};

export default NanniesPage;
