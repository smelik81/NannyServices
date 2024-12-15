import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loader from '../Loader/Loader.jsx';
import NanniesPage from '../../pages/NanniesPage/NanniesPage.jsx';
import HomePage from '../../pages/HomePage/HomePage.jsx';
import css from './App.module.css';
import Layout from '../Layout/Layout.jsx';
//import Navigation from '../Navigation/Navigation.jsx';

function App() {
  return (
    <div className={css.container}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="nannies" element={<NanniesPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
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
