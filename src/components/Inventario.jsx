import React, { useState } from "react";
import "./inventario.css";

export default function Inventario({ progresso, salvarOrdemInventario, abrirTerminalFinal }) {
  const [itens, setItens] = useState(progresso.pistasColetadas || []);
  const [itemArrastadoIndex, setItemArrastadoIndex] = useState(null);

  const aoIniciarArrasto = (e, index) => {
    setItemArrastadoIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const aoPassarPorCima = (e, index) => {
    e.preventDefault();
    if (itemArrastadoIndex === null || itemArrastadoIndex === index) return;

    const listaRemanejada = [...itens];
    const itemMovido = listaRemanejada[itemArrastadoIndex];
    
    listaRemanejada.splice(itemArrastadoIndex, 1);
    listaRemanejada.splice(index, 0, itemMovido);

    setItemArrastadoIndex(index);
    setItens(listaRemanejada);
  };

  const aoSoltarItem = () => {
    setItemArrastadoIndex(null);
    salvarOrdemInventario(itens); 
  };

  return (
    <div className="game-screen inventario-screen" style={{ background: "var(--bg)", padding: "1.5rem" }}>
      <div className="inventario-header">
        <h2 style={{ fontFamily: "var(--font-titulo)", color: "var(--primary-claro)" }}>
          MOCHILA DATA-CORE
        </h2>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
          Arraste e ordene as linhas de memória corrompidas para decifrar a palavra-chave.
        </p>
      </div>

      {itens.length === 0 ? (
        <div className="empty-inventory">
          <p>Nenhum fragmento estelar coletado ainda. Explore o mapa do SENAI e estabilize as fendas!</p>
        </div>
      ) : (
        <>
          <div className="drag-zone-list">
            {itens.map((pista, index) => (
              <div
                key={index}
                className={`inventory-card ${itemArrastadoIndex === index ? "dragging" : ""}`}
                draggable
                onDragStart={(e) => aoIniciarArrasto(e, index)}
                onDragOver={(e) => aoPassarPorCima(e, index)}
                onDragEnd={aoSoltarItem}
              >
                <div className="drag-handle">⋮⋮</div>
                <code className="code-payload">{pista}</code>
              </div>
            ))}
          </div>

          {itens.length >= 5 && (
            <div className="action-zone" style={{ marginTop: "2rem", textAlign: "center" }}>
              <button 
                onClick={abrirTerminalFinal} 
                className="btn btn-accent pulse-effect"
                style={{ width: "100%", maxWidth: "400px", fontWeight: "bold" }}
              >
                ACESSAR OVERRIDE DO ENIGMA FINAL
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}