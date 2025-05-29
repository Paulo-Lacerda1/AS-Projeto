import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Avaliacao from './pages/Avaliacao'; // ✅ importa a nova página
import Dashboard from './pages/Dashboard';
import ServiceManagement from './pages/ServiceManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/avaliacao" element={<Avaliacao />} /> {/* ✅ nova rota */}
        <Route path="/dashboard/:company" element={<Dashboard />} />
        <Route path="/service_management/:company" element={<ServiceManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
