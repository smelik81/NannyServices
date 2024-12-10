import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loader from '../Loader/Loader.jsx';
import NanniesPage from '../../pages/NanniesPage/NanniesPage.jsx';
import FavoritesPage from '../../pages/FavoritesPage/FavoritesPage.jsx';
import HomePage from '../../pages/HomePage/HomePage.jsx';
import Layout from '../Layout/Layout.jsx';
import './App.css';

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/nannies"
          element={
            <Layout>
              <NanniesPage />
            </Layout>
          }
        />
        <Route
          path="/nannies/:id"
          element={
            <Layout>
              <FavoritesPage />
            </Layout>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
