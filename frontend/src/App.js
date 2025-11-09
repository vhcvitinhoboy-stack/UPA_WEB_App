import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css'; // We'll create this later for custom styles
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import L from 'leaflet'; // Import Leaflet for custom icon

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

    fetch(apiUrl) // Use the configured API URL
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
    return <div className="container mt-5">Carregando dados...</div>;
  }

  if (error) {
    return <div className="container mt-5 text-danger">Erro ao carregar dados: {error.message}</div>;
  }

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">UPA Web App</a>
        </div>
      </nav>

      <div className="container mt-4">
        <h1 className="mb-4">Localizações de Unidades de Saúde</h1>
        
        {/* Placeholder for the Map Component */}
        <div className="card mb-4">
          <div className="card-header">Mapa das Unidades</div>
          <div className="card-body" style={{ height: '400px' }}> {/* Set a height for the map */}
            {locations.length > 0 ? (
              <MapContainer center={[locations[0].latitude, locations[0].longitude]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((location, index) => (
                  <Marker key={index} position={[location.latitude, location.longitude]}>
                    <Popup>
                      <strong>{location.nome}</strong><br />
                      {location.endereco}, {location.numero} - {location.bairro}<br />
                      Contato: {location.numero_de_contato}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            ) : (
              <p>Nenhuma localização disponível para exibir no mapa.</p>
            )}
          </div>
        </div>

        {/* Locations List */}
        <div className="row">
          {locations.map((location, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">{location.nome}</h5>
                  <p className="card-text">
                    <strong>Endereço:</strong> {location.endereco}, {location.numero} - {location.bairro} <br />
                    <strong>CEP:</strong> {location.cep} <br />
                    <strong>Contato:</strong> {location.numero_de_contato} <br />
                    <strong>Horário:</strong> {location.horario_de_funcionamento} <br />
                    <strong>Coordenadas:</strong> {location.latitude}, {location.longitude}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;