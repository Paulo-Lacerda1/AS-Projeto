import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Avaliacao from './pages/Avaliacao'; // ✅ importa a nova página

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/avaliacao" element={<Avaliacao />} /> {/* ✅ nova rota */}
      </Routes>
    </Router>
  );
}

export default App;
