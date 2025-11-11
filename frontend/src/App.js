import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- Ícones ---
// Ícone para o marcador do mapa (cruz médica)
const medicalIcon = new L.Icon({
  iconUrl: 'https://img.icons8.com/color/48/000000/plus-2-math.png', // Um ícone de cruz simples
  iconRetinaUrl: 'https://img.icons8.com/color/96/000000/plus-2-math.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

// Fix para o ícone padrão do Leaflet que às vezes quebra no React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


function App() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://upa-web-app-backend-b8h3.onrender.com/api/locations';
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro na rede! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setLocations(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar dados da API:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  // Função para formatar o número de WhatsApp
  const formatWhatsAppNumber = (number) => {
    // Remove caracteres não numéricos e assume código do Brasil (55)
    const cleaned = ('' + number).replace(/\D/g, '');
    if (cleaned.length >= 10) {
      return `55${cleaned}`;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <h1 className="text-danger">Falha ao Carregar</h1>
        <p>Não foi possível conectar ao servidor para buscar as unidades de saúde. Por favor, tente novamente mais tarde.</p>
        <p><i>Detalhe do erro: {error.message}</i></p>
      </div>
    );
  }

  return (
    <>
      <header className="app-header">
        <div className="container d-flex align-items-center">
          <span className="header-icon">⚕️</span>
          <h1>Guia de Saúde Rápido</h1>
        </div>
      </header>

      <main className="container my-5">
        <div className="row">
          {/* Coluna do Mapa */}
          <div className="col-lg-7 mb-4">
            <div className="card map-card-modern">
              <div className="card-header">Mapa das Unidades</div>
              <div className="card-body p-0" style={{ height: '600px' }}>
                {locations.length > 0 ? (
                  <MapContainer center={[-11.87, -55.50]} zoom={12} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {locations.map((loc) => (
                      <Marker key={loc.nome} position={[parseFloat(loc.latitude), parseFloat(loc.longitude)]} icon={medicalIcon}>
                        <Popup><strong>{loc.nome}</strong></Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                ) : <p className="p-3">Nenhuma localização para exibir no mapa.</p>}
              </div>
            </div>
          </div>

          {/* Coluna da Lista de Unidades */}
          <div className="col-lg-5">
            {locations.map((location) => {
              const whatsappNumber = formatWhatsAppNumber(location.numero_de_contato);
              const is24h = location.horario_de_funcionamento.includes('24 horas');

              return (
                <div key={location.nome} className="card location-card-modern mb-3">
                  <div className={`card-header ${is24h ? 'bg-danger text-white' : ''}`}>
                    <h5 className="mb-0">{location.nome}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      📍 <strong>Endereço:</strong> {location.endereco}, {location.numero} - {location.bairro}
                    </p>
                    <p className="card-text">
                      🕒 <strong>Horário:</strong> {location.horario_de_funcionamento}
                    </p>
                    <div className="d-flex justify-content-between mt-3">
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-outline-primary btn-sm"
                      >
                        Ver no Mapa
                      </a>
                      {whatsappNumber && (
                        <a 
                          href={`https://wa.me/${whatsappNumber}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-success btn-sm"
                        >
                          WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          &copy; {new Date().getFullYear()} Guia de Saúde. Cuidando de você.
        </div>
      </footer>
    </>
  );
}

export default App;
