import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

export default function Mapinha() {
  const centroInicial = [-22.913933, -47.0];
  const [posicao, setPosicao] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setErro("Seu navegador não tem geolocalização!");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosicao({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        setErro("Não possível obter sua localização...");
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0,
      },
    );
  }, []);

  const local = [-22.91379, 47.0681];
  const zoomInicial = local ? 15 : 13;

  return (
    <section className="mapinha">
      <h1> Mapinhaa~~ sz' </h1>

      {erro && <div className="erro">{erro}</div>}

      <MapContainer
        center={posicao ? local : centroInicial}
        zoom={zoomInicial}
        scrollWheelZoom={true}
        className="mapa"
      >
        <TileLayer
          attribution="&copy; OpenstreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {local && (
          <Marker position={local}>
            <Popup>Você está aqui </Popup>
          </Marker>
        )}
      </MapContainer>
    </section>
  );
}
