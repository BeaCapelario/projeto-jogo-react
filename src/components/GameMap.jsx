import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./gamemap.css";
import "./fases.css";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const playerIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/isometric/50/spider.png", 
  iconSize: [35, 35]
});

const portalIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/neon/96/portal.png", 
  iconSize: [40, 40]
});

const COORDENADAS_SENAI = {
  q1: { lat: -22.91379, lng: -47.06810, nomeLocal: "Laboratório Frontend" },
  q2: { lat: -22.91395, lng: -47.06830, nomeLocal: "Biblioteca Secreta" },
  q3: { lat: -22.91410, lng: -47.06805, nomeLocal: "Oficina de Automação" },
  q4: { lat: -22.91360, lng: -47.06790, nomeLocal: "Anfiteatro Digital" },
  q5: { lat: -22.91430, lng: -47.06840, nomeLocal: "Pátio Central" },
  q6: { lat: -22.91380, lng: -47.06860, nomeLocal: "Laboratório de Redes" },
  q7: { lat: -22.91400, lng: -47.06770, nomeLocal: "Maker Space" },
  q8: { lat: -22.91350, lng: -47.06820, nomeLocal: "Sala dos Professores Anciãos" },
  q9: { lat: -22.91420, lng: -47.06815, nomeLocal: "Almoxarifado de Peças" },
  q10: { lat: -22.91390, lng: -47.06800, nomeLocal: "Núcleo de Conectividade" }
};

function ChangeMapView({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.setView([coords.lat, coords.lng], 18);
  }, [coords, map]);
  return null;
}

export default function GameMap({ progresso, bancoQuestoes, setQuestaoAtiva }) {
  const centroSenai = { lat: -22.91395, lng: -47.06820 };
  const RAIO_METROS = 15;
  const [userCoords, setUserCoords] = useState(centroSenai);

  const obterDistancia = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const p1 = (lat1 * Math.PI) / 180;
    const p2 = (lat2 * Math.PI) / 180;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(p1) * Math.cos(p2) * Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  return (
    <div className="map-wrapper">
      <div className="dev-panel">
        <span className="dev-title">🚀 SIMULADOR GPS (TELEPORTE):</span>
        <div className="dev-buttons">
          {bancoQuestoes.map((p, i) => {
            const ponto = COORDENADAS_SENAI[p.id] || centroSenai;
            return (
              <button 
                key={p.id} 
                onClick={() => setUserCoords({ lat: ponto.lat, lng: ponto.lng })}
                className="btn-teleport"
              >
                Fenda {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      <MapContainer center={[userCoords.lat, userCoords.lng]} zoom={18} className="leaflet-container-actual">
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        <ChangeMapView coords={userCoords} />

        <Marker position={[userCoords.lat, userCoords.lng]} icon={playerIcon}>
          <Popup><span style={{ color: "#000" }}>Sua Projeção Hologrgráfica</span></Popup>
        </Marker>
        <Circle center={[userCoords.lat, userCoords.lng]} radius={RAIO_METROS} pathOptions={{ color: "#00f5d4", fillOpacity: 0.08 }} />

        {bancoQuestoes.map((ponto) => {
          const geoData = COORDENADAS_SENAI[ponto.id] || { lat: -22.91395, lng: -47.06820, nomeLocal: "Fenda Oculta" };
          const resolvido = progresso.quizesResolvidos.includes(ponto.id);
          const dist = obterDistancia(userCoords.lat, userCoords.lng, geoData.lat, geoData.lng);
          const dentroDoRaio = dist <= RAIO_METROS;

          return (
            <Marker key={ponto.id} position={[geoData.lat, geoData.lng]} icon={portalIcon}>
              <Popup>
                <div className="popup-inner" style={{ color: "#000", minWidth: "160px" }}>
                  <h4 style={{ margin: "0 0 5px 0" }}>{ponto.titulo}</h4>
                  <p style={{ margin: "0 0 8px 0", fontSize: "11px" }}>
                    <strong>Local:</strong> {geoData.nomeLocal}<br/>
                    <strong>Distância:</strong> {Math.round(dist)}m
                  </p>
                  {resolvido ? (
                    <span style={{ color: "green", fontWeight: "bold", display: "block", textAlign: "center" }}>✅ ESTABILIZADA</span>
                  ) : dentroDoRaio ? (
                    <button 
                      onClick={() => setQuestaoAtiva(ponto)} 
                      className="btn btn-accent" 
                      style={{ padding: "6px 0", fontSize: "11px", width: "100%", cursor: "pointer" }}
                    >
                      INTERCEPTAR FENDA
                    </button>
                  ) : (
                    <span style={{ color: "#d9534f", fontSize: "10px", fontWeight: "bold", display: "block", textAlign: "center" }}>
                      FORA DO ALCANCE DO GPS
                    </span>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}