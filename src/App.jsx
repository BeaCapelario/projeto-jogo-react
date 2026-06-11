import React, { useState, useEffect } from "react";
import GameMap from "./components/GameMap";
import Inventario from "./components/Inventario";
import EnigmaFinal from "./components/EnigmaFinal";
import VisualNovelStage from "./components/VisualNovelStage";
import "./components/fases.css";

import bancoQuestoes from "../public/data/perguntas.json";

const ESTADO_INICIAL = {
  quizesResolvidos: [],
  pontosDesbloqueados: [],
  pistasColetadas: [],
};

export default function App() {
  const [telaAtiva, setTelaAtiva] = useState("mapa"); // mapa | inventario | enigma | vitoria
  const [questaoAtiva, setQuestaoAtiva] = useState(null); // Controla se o palco da VN está aberto

  const [progresso, setProgresso] = useState(() => {
    const salvo = localStorage.getItem("dyson_light_progress");
    return salvo ? JSON.parse(salvo) : ESTADO_INICIAL;
  });

  useEffect(() => {
    localStorage.setItem("dyson_light_progress", JSON.stringify(progresso));
  }, [progresso]);

  const handleReset = () => {
    if (window.confirm("Deseja expurgar os logs do sistema e reiniciar o Véu?")) {
      setProgresso(ESTADO_INICIAL);
      setQuestaoAtiva(null);
      setTelaAtiva("mapa");
    }
  };

  const handleFaseConcluida = (idFase, novaPista) => {
    setProgresso((prev) => {
      if (prev.quizesResolvidos.includes(idFase)) return prev;

      return {
        ...prev,
        quizesResolvidos: [...prev.quizesResolvidos, idFase],
        pistasColetadas: [...prev.pistasColetadas, novaPista],
      };
    });
    setQuestaoAtiva(null);
  }; // Chave fechada corretamente aqui!

  const handleSalvarOrdemInventario = (novasPistasOrdenadas) => {
    setProgresso((prev) => ({
      ...prev,
      pistasColetadas: novasPistasOrdenadas,
    }));
  };

  // Verificação de Vitória isolada no escopo principal do componente
  if (telaAtiva === "vitoria") {
    return (
      <div className="mochila-stage" style={{ textAlign: "center", padding: "2rem" }}>
        <div
          className="mochila-hud-box"
          style={{
            borderColor: "var(--success)",
            maxWidth: "600px",
            margin: "100px auto",
          }}
        >
          <h1 style={{ color: "var(--success)", fontFamily: "var(--font-titulo)" }}>
            🌌 CÉU RESTAURADO
          </h1>
          <p style={{ margin: "20px 0", fontSize: "1.2rem", lineHeight: "1.6" }}>
            O projeto Dyson-Light foi reestabelecido. O Véu de Neon dissipou-se e as estrelas
            voltaram a iluminar a consciência da humanidade.
          </p>
          <button className="btn btn-primary" onClick={() => setTelaAtiva("mapa")}>
            Acessar Terminais Residuais
          </button>
        </div>
      </div>
    );
  }

  // O bloco de renderização principal agora pertence genuinamente ao App()
  return (
    <>
      <nav
        className="game-navigation-hud"
        style={{
          display: "flex",
          gap: "10px",
          padding: "10px",
          background: "#110e19",
          borderBottom: "1px solid var(--primary-escuro)",
        }}
      >
        <button
          className={`btn ${telaAtiva === "mapa" ? "btn-primary" : ""}`}
          onClick={() => {
            setTelaAtiva("mapa");
            setQuestaoAtiva(null);
          }}
        >
          Mapa das Fendas
        </button>
        <button
          className={`btn ${telaAtiva === "inventario" ? "btn-primary" : ""}`}
          onClick={() => {
            setTelaAtiva("inventario");
            setQuestaoAtiva(null);
          }}
        >
          Mochila Data-Core ({progresso.pistasColetadas.length})
        </button>
        <button
          className="btn"
          style={{
            background: "#3a1d28",
            color: "var(--error)",
            marginLeft: "auto",
          }}
          onClick={handleReset}
        >
          Reiniciar Sistema
        </button>
      </nav>

      <main
        style={{
          height: "calc(100vh - 54px)",
          width: "100%",
          overflow: "auto",
        }}
      >
        {questaoAtiva ? (
          <VisualNovelStage
            fase={questaoAtiva}
            onVoltar={() => setQuestaoAtiva(null)}
            onFaseConcluida={handleFaseConcluida}
          />
        ) : (
          <>
            {telaAtiva === "mapa" && (
              <GameMap
                progresso={progresso}
                bancoQuestoes={bancoQuestoes}
                setQuestaoAtiva={setQuestaoAtiva}
              />
            )}

            {telaAtiva === "inventario" && (
              <Inventario
                progresso={progresso}
                salvarOrdemInventario={handleSalvarOrdemInventario}
                abrirTerminalFinal={() => setTelaAtiva("enigma")}
              />
            )}

            {telaAtiva === "enigma" && (
              <EnigmaFinal
                progresso={progresso}
                voltarAoInventario={() => setTelaAtiva("inventario")}
                onSucesso={() => setTelaAtiva("vitoria")}
              />
            )}
          </>
        )}
      </main>
    </>
  );
}