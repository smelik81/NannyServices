import { Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../Loader/Loader.jsx';
import NanniesPage from '../../pages/NanniesPage/NanniesPage.jsx';
import HomePage from '../../pages/HomePage/HomePage.jsx';
import FavoritesPage from '../../pages/FavoritesPage/FavoritesPage.jsx';
import Layout from '../Layout/Layout.jsx';
import {
  selectIsLogedIn,
  selectRefreshing,
} from '../../redux/auth/selector.js';
import { refreshUser } from '../../redux/auth/operation.js';
import { Toaster } from 'react-hot-toast';
//import Navigation from '../Navigation/Navigation.jsx';
import css from './App.module.css';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isRefreshing = useSelector(selectRefreshing);
  const isLogedIn = useSelector(selectIsLogedIn);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <>
      <Toaster />
      <div>Refreshing user please wait...</div>
    </>
  ) : (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nannies" element={<NanniesPage />} />
          <Route
            path="/favorites"
            element={
              isLogedIn ? <FavoritesPage /> : <Navigate to="/" replace />
            }
          />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;

/*useEffect(() => {
    if (!isLogedIn) {
      navigate('nannies');
    }
  }, [isLogedIn, isRefreshing, navigate]);*/

{
  /*  <div>
   <header className="header">
     <Navigation />
   </header>

   <Routes>
     <Route path="/" element={<HomePage />} />
     <Route path="/nannies" element={<NanniesPage />} />
   </Routes>
 </div> */
}

{
  /* <div className={css.container}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="nannies" element={<NanniesPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div> */
}
