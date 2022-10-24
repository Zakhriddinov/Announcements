import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import MyPosters from './pages/MyPosters';
import AllPostersPage from './pages/AllPostersPage';
import './App.css'
import PosterDetailsPage from './pages/PosterDetailsPage';
import ProfilePage from './pages/ProfilePage';
import CreatePosterPage from './pages/CreatePosterPage';
import EditPosterPage from './pages/EditPosterPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutesComponent from './components/ProtectedRoutesComponent';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posters" element={<AllPostersPage />} />
            <Route path="/posters/:pageNumParam" element={<AllPostersPage />} />
            <Route path="/posters/category/:categoryName" element={<AllPostersPage />} />
            <Route path="/posters/search/:searchQuery" element={<AllPostersPage />} />
            <Route path="/posters/category/:categoryName/:pageNumParam" element={<AllPostersPage />} />
            <Route path="/posters/search/:searchQuery" element={<AllPostersPage />} />
            <Route path="/posters/search/:searchQuery/:pageNumParam" element={<AllPostersPage />} />
            <Route path="/posters/category/:categoryName/search/:searchQuery" element={<AllPostersPage />} />
            <Route path="/posters/category/:categoryName/search/:searchQuery/:pageNumParam" element={<AllPostersPage />} />
            <Route path="/user-posters/:id" element={<MyPosters />} />
            <Route path="/poster-details/:posterId" element={<PosterDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoutesComponent />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/create-poster" element={<CreatePosterPage />} />
              <Route path="/edit-poster/:id" element={<EditPosterPage />} />
            </Route>
          </Routes>
        </main>
        <Footer />
        <ToastContainer />
      </BrowserRouter >
    </ >
  )
}

export default App