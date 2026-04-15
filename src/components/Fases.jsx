import { useMemo, useState } from "react";
import QUESTOES from "../../public/data/perguntas.json";
import "./fases.css";

export default function Fases() {
  const [selecionada, setSelecionada] = useState(null);
  const [trancada, setTrancada] = useState(0);
  const [resolvidas, setResolvidas] = useState(() => new Set());

  const total = QUESTOES.length;

  const handleOpen = (q) => selecionada(q);
  const handleClose = () => selecionada(null);

  const handleCorrect = (id) => {
    setResolvidas((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    const idx = QUESTOES.findIndex((q) => q.id === id);
    if (idx > -1 && idx < QUESTOES.length - 1) {
      setTrancada((prev) => Math.max(prev, idx + 1));
    }
  };

  const progresso = useMemo(() => {
    const perguntasResolvidas = resolvidas.size;

    const porcentagem = Math.round((perguntasResolvidas / total) * 100);

    return {
      resolvida: perguntasResolvidas,
      total: total,
      porcentagem: porcentagem,
    };
  }, [resolvidas, total]);

  return (
    <main className="questoes">
      <header className="q-header">
        <h1 className="q-title">CODEX: HORIZONTE ROSA</h1>
        <p className="q-subtitle">Toque no ícone para abrir a pergunta</p>

        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progresso.porcentagem}
            aria-label={`Progresso: ${progresso.resolvida} de 
            ${progresso.total} resolvidas`}
            style={{ width: `${progresso.porcentagem}%` }}
          />

          <span className="progress-label">
            {progresso.resolvida} /{progresso.total}
          </span>
        </div>
      </header>
    </main>
  );
}
