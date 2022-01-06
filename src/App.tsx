import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';

import {Home} from './pages/Home';

import {NewRoom} from './pages/NewRoom';

function App() {

  return (
    <BrowserRouter>      
      <Routes>        
        <AuthContextProvider>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
        </AuthContextProvider>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
