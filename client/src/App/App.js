import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Profile from '../Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/' 
          element={
            <Profile />
          } 
        />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
