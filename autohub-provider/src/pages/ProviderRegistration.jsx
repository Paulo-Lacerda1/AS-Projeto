import React, { useState } from 'react';
import '../styles/ProviderRegistration.css'; // Certifica-te que este caminho está correto

const ProviderRegistration = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    serviceType: '',
    phone: '',
    address: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados registados:', formData);
    // Aqui podes fazer fetch/post para o backend
  };

  return (
    <div className="provider-container">
      <h1>Registar Provedor de Serviços</h1>
      <form onSubmit={handleSubmit}>
        <label>Nome da Empresa</label>
        <input
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Tipo de Serviço</label>
        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          required
        >
          <option value="">Selecione</option>
          <option value="transporte">Transporte</option>
          <option value="logistica">Logística</option>
          <option value="manutencao">Manutenção</option>
          <option value="outro">Outro</option>
        </select>

        <label>Telefone</label>
        <input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
        />

        <label>Endereço</label>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <label>Descrição</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />

        <button type="submit">Registar</button>
      </form>
    </div>
  );
};

export default ProviderRegistration;
