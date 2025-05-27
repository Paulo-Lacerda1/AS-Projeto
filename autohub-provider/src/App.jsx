import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Avaliacao from './pages/Avaliacao'; // ✅ importa a nova página
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/avaliacao" element={<Avaliacao />} /> {/* ✅ nova rota */}
        <Route path="/dashboard/:company" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
