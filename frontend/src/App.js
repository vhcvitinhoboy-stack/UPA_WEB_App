import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon not showing in React-Leaflet
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
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/locations';
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setLocations(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container mt-5"><h1>Carregando...</h1></div>;
  }

  if (error) {
    return <div className="container mt-5 text-danger"><h1>Erro ao carregar dados</h1><p>{error.message}</p></div>;
  }

  return (
    <>
      <header className="header-gov">
        <div className="container">
          <span className="logo-text">Saúde Pública</span>
        </div>
      </header>

      <main className="container mt-5">
        <h1 className="main-title">Unidades de Pronto Atendimento (UPA) e UBS</h1>
        
        <div className="card map-card mb-5">
          <div className="card-header">Mapa das Unidades</div>
          <div className="card-body" style={{ height: '450px', padding: 0 }}>
            {locations.length > 0 ? (
              <MapContainer center={[-11.87, -55.50]} zoom={12} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((location) => (
                  <Marker key={location.nome} position={[parseFloat(location.latitude), parseFloat(location.longitude)]}>
                    <Popup>
                      <strong>{location.nome}</strong><br />
                      {location.endereco}, {location.numero} - {location.bairro}<br />
                      Contato: {location.numero_de_contato}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            ) : (
              <p className="p-3">Nenhuma localização disponível para exibir no mapa.</p>
            )}
          </div>
        </div>

        <div className="row">
          {locations.map((location) => (
            <div key={location.nome} className="col-md-6 col-lg-4 mb-4">
              <div className="card location-card">
                <div className="card-header">{location.nome}</div>
                <div className="card-body">
                  <p className="card-text">
                    <strong>Endereço:</strong> {location.endereco}, {location.numero} - {location.bairro}<br />
                    <strong>CEP:</strong> {location.cep}<br />
                    <strong>Contato:</strong> {location.numero_de_contato}<br />
                    <strong>Horário:</strong> {location.horario_de_funcionamento}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer-gov">
        <div className="container">
          &copy; {new Date().getFullYear()} Secretaria de Saúde - Todos os direitos reservados.
        </div>
      </footer>
    </>
  );
}

export default App;