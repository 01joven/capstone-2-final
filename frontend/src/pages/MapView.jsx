import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { memorialAPI } from '../services/api';
import './MapView.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapView = () => {
  const [memorials, setMemorials] = useState([]);

  useEffect(() => {
    memorialAPI.getAll().then(({ data }) => setMemorials(data));
  }, []);

  return (
    <Layout>
      <div className="map-page">
        <div className="map-sidebar card">
          <h3>Memorial Locations</h3>
          <div className="map-sidebar-list">
            {memorials.map((m) => (
              <div key={m.id} className="map-sidebar-item">
                <h4>{m.name}</h4>
                <p>{m.category}</p>
                <Link to={`/reservations/${m.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="map-container">
          <MapContainer center={[14.5995, 120.9842]} zoom={11} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {memorials.map((m) => (
              <Marker key={m.id} position={[parseFloat(m.latitude), parseFloat(m.longitude)]}>
                <Popup>
                  <strong>{m.name}</strong>
                  <br />
                  {m.category} — ₱{parseFloat(m.price).toLocaleString()}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </Layout>
  );
};

export default MapView;
