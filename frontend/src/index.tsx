import { createRoot } from 'react-dom/client';
import './styles/styles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Loginpage from './pages/Login/Loginpage';
import InfoDetailsPage from './pages/InfoDetailsPage/InfoDetailsPage';
import AddClientPage from './pages/AddClientPage/AddClientPage';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='homepage' element={<Homepage />} />
      <Route path='loginpage' element={<Loginpage />} />
      <Route path='infodetailspage' element={<InfoDetailsPage />} />
      <Route path='addclientpage' element={<AddClientPage />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
