import React, { useState } from "react";
import "./EnigmaFinal.css"; 

export default function EnigmaFinal({ progresso, voltarAoInventario, onSucesso }) {
  const [tentativa, setTentativa] = useState("");
  const [erro, setErro] = useState(false);

  const CODIGO_CORRETO = "ordem"; 

  const validarCod = (e) => {
    e.preventDefault();
    
    const inputLimpo = tentativa.toLowerCase().trim();

    if (inputLimpo === CODIGO_CORRETO) {
      onSucesso();
    } else {
      setErro(true);
      setTimeout(() => setErro(false), 2000);
    }
  };

  return (
    <div className="game-screen final-enigma" style={{ background: "var(--bg)", padding: "2rem 1rem" }}>
      <header className="game-header" style={{ marginBottom: "2rem" }}>
        <button className="btn-hud" onClick={voltarAoInventario}>
          ⬅️ Ver Pistas / Inventário
        </button>
        <h2 style={{ fontFamily: "var(--font-titulo)", color: "var(--secundary)" }}>
          TERMINAL CRÍTICO: CORE OVERRIDE
        </h2>
      </header>

      <div className="cyber-card container-center" style={{
        maxWidth: "600px",
        margin: "0 auto",
        background: "var(--bg2)",
        border: "2px solid var(--secundary)",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 0 20px rgba(255, 138, 180, 0.2)"
      }}>
        <h3 style={{ fontFamily: "var(--font-titulo)", color: "var(--accent)", marginBottom: "1rem" }}>
          INSIRA A CHAVE DA GRANDE CONSTELAÇÃO
        </h3>
        <p style={{ marginBottom: "1.5rem", fontSize: "0.95rem", lineHeight: "1.6" }}>
          O Véu de Neon está sobrecarregado. Use a caixa de texto abaixo para injetar o anagrama decifrado através da ordem dos seus fragmentos de código.
        </p>
        
        <form onSubmit={validarCod} className="terminal-form">
          <input 
            type="text" 
            className={`cyber-input terminal-input ${erro ? "shake-error" : ""}`}
            placeholder="DIGITE A PALAVRA-CHAVE TRANS-ESTELAR..." 
            value={tentativa}
            onChange={e => setTentativa(e.target.value)}
            style={{
              width: "100%",
              letterSpacing: "2px",
              textAlign: "center",
              textTransform: "uppercase",
              fontWeight: "bold"
            }}
            autoFocus
          />
          
          {erro && (
            <p className="error-text" style={{ 
              color: "var(--error)", 
              fontWeight: "bold", 
              textAlign: "center",
              marginTop: "0.5rem",
              fontFamily: "var(--font-texto)"
            }}>
              CÓDIGO INCORRETO. ACESSO NEGADO AO VÉU.
            </p>
          )}

          <button 
            type="submit" 
            className="btn" 
            style={{ 
              background: "var(--success)", 
              color: "var(--bg)",
              fontWeight: "bold",
              marginTop: "1rem",
              width: "100%"
            }}
          >
            EXECUTAR DESTRUIÇÃO DO VÉU
          </button>
        </form>
      </div>

      <div style={{
        maxWidth: "600px",
        margin: "2rem auto 0 auto",
        fontFamily: "var(--font-texto)",
        fontSize: "0.85rem",
        color: "var(--primary-claro)",
        border: "1px dashed var(--primary-escuro)",
        padding: "1rem",
        borderRadius: "4px"
      }}>
        <strong>STATUS DOS SATÉLITES:</strong> {progresso.quizesResolvidos.length} / 10 Sincronizados. <br/>
        🧬 Se você reordenou os blocks na mochila corretamente, as primeiras letras dos comentários revelam a palavra.
      </div>
    </div>
  );
}