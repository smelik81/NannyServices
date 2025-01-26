import React, { useEffect } from 'react';
import { fetchNannies } from '../../redux/nannies/operation.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectNannies, selectLoading } from '../../redux/nannies/selector.js';

import css from './NanniesPage.module.css';
import { selectToken } from '../../redux/auth/selector.js';

const NanniesPage = () => {
  const dispatch = useDispatch();
  const nannies = useSelector(selectNannies);
  const loading = useSelector(selectLoading);
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(fetchNannies(token));
  }, [dispatch, token]);

  return <div className={css.container}>NanniesList</div>;
};

export default NanniesPage;
