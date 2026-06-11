import React, { useState } from "react";
import TextoEfeito from "./TextoEfeito.jsx";
import './fases.css';

export default function VisualNovelStage({ fase, onVoltar, onFaseConcluida }) {
  const [resposta, setResposta] = useState("");
  const [mostrarSucesso, setMostrarSucesso] = useState(false); 

  const nomeDoPersonagem = fase.personagem || "Inteligência Nova Mono";
  const falaAgente = fase.falaInicial || "Conexão estabelecida com o satélite antigo. Remova o ruído.";
  const perguntaDesafio = fase.prompt || "";
  
  const pistaLiberada = `/* Fragmento ${fase.id} */ const Data_${fase.id} = () => "${fase.respostas[0]}";`;

  const enviarResposta = (e) => {
    e.preventDefault();
    
    const respostasValidas = fase.respostas.map(r => r.trim().toUpperCase());
    const respostaFormatada = resposta.trim().toUpperCase();

    if (respostasValidas.includes(respostaFormatada)) {
      setMostrarSucesso(true);
    } else {
      alert("FALHA NA INJEÇÃO: Sintaxe incorreta ou tag inválida para esta fenda!");
    }
  };

  const lidarComAvanco = () => {
    if (onFaseConcluida) {
      onFaseConcluida(fase.id, pistaLiberada);
    }
    setMostrarSucesso(false);
    setResposta("");
  };

  const estiloFundo = {
    backgroundColor: "var(--bg)",
    border: "2px solid var(--primary-escuro)"
  };

  return (
    <div className="vn-container" style={estiloFundo}>
      
      <div className="vn-sprite-stage">
        <div style={{ padding: "20px", background: "var(--bg2)", border: "1px dashed var(--secundary)", borderRadius: "8px", color: "var(--secundary)" }}>
          [ PROJEÇÃO HOLOGRÁFICA ATIVA ]
        </div>
      </div>

      <div className="vn-dialog-interface">
        <div className="vn-nametag">{nomeDoPersonagem}</div>
        
        <div className="vn-dialog-box">
          {mostrarSucesso ? (
            <div className="vn-success-inside-box" style={{ textAlign: "center", width: "100%" }}>
              <div className="vn-success-message" style={{ marginBottom: "15px" }}>
                <span className="success-pulse-icon" style={{ fontSize: "2rem" }}>⚡</span>
                <p><strong>CÓDIGO INJETADO COM SUCESSO!</strong> Fenda dimensional estabilizada.</p>
              </div>
              <button 
                type="button"
                className="btn vn-btn-accent" 
                onClick={lidarComAvanco}
                style={{ width: "100%", maxWidth: "200px" }}
              >
                AVANÇAR ▶
              </button>
            </div>
          ) : (
            <>
              <div className="vn-text-content-side">
                <TextoEfeito texto={falaAgente} velocidade={15} />
                <p className="vn-challenge-prompt" style={{ color: "var(--secundary)", marginTop: "10px" }}>
                  [{perguntaDesafio}] <span className="terminal-arrow">➡️</span>
                </p>
              </div>

              <div className="vn-interaction-zone">
                <form onSubmit={enviarResposta} className="vn-form-inline">
                  <input 
                    type="text" 
                    className="vn-input" 
                    placeholder="Insira a instrução de código..." 
                    value={resposta}
                    onChange={(e) => setResposta(e.target.value)}
                    required 
                    autoFocus
                  />
                  <button type="submit" className="btn btn-primary">INJETAR</button>
                  <button type="button" onClick={onVoltar} className="btn" style={{ background: "var(--bg2)", color: "#fff" }}>SAIR</button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}