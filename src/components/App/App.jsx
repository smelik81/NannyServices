import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loader from '../Loader/Loader.jsx';
import NanniesPage from '../../pages/NanniesPage/NanniesPage.jsx';
import HomePage from '../../pages/HomePage/HomePage.jsx';
import FavoritesPage from '../../pages/FavoritesPage/FavoritesPage.jsx';
import Layout from '../Layout/Layout.jsx';
import css from './App.module.css';
//import Navigation from '../Navigation/Navigation.jsx';

function App() {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nannies" element={<NanniesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;

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
