import { useEffect, useState, useId, useRef } from "react";

export default function QuestionDialog({
  questoes: questao,
  onClose,
  progresso,
  setProgresso,
}) {
  const titleId = useId();
  const inputRef = useRef(null);

  const closeTimerRef = useRef(null);
  const errorTimerRef = useRef(null);

  const [resposta, setResposta] = useState("");
  const [feedback, setFeedback] = useState({ type: "info", msg: "" });
  const [erro, setErro] = useState(false);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, []);

  const normalize = (s) =>
    (s ?? "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[.,;:!?()\"'´^~]/g, "")
      .trim()
      .toLowerCase();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!resposta.trim()) return;

    const acertou = questao.respostas?.some(
      (r) => normalize(r) === normalize(resposta),
    );

    if (acertou) {
      setFeedback({
        type: "success",
        msg: "SINCRO COMPLETA! Fragmento extraído.",
      });

      const primeiraresposta = normalize(questao.respostas[0]);
      const novaPista = `/* ${questao.id} */ const ${primeiraresposta} = () => "${questao.titulo}";`;

      setProgresso((prev) => {
        if (prev.quizesResolvidos.includes(questao.id)) return prev;

        return {
          ...prev,
          quizesResolvidos: [...prev.quizesResolvidos, questao.id],
          pistasColetadas: [...prev.pistasColetadas, novaPista],
        };
      });

      closeTimerRef.current = setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setErro(true);
      setFeedback({
        type: "error",
        msg: "SINAL CORROMPIDO. Sintaxe inválida.",
      });

      errorTimerRef.current = setTimeout(() => {
        setErro(false);
      }, 400);
    }
  };

  const handleInputChange = (e) => {
    setResposta(e.target.value);
    if (feedback.type === "error") {
      setFeedback({ type: "info", msg: "" });
    }
  };

  return (
    <div
      className="dialog-overlay"
      role="dialog"
      aria-labelledby={titleId}
      aria-modal="true"
    >
      <div className="dialog-content">
        <div className="dialog-header">
          <h3 id={titleId} className="dialog-title">
            {questao.titulo}
          </h3>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Fechar"
          >
            &times;
          </button>
        </div>

        <div className="dialog-body">
          <p>{questao.prompt}</p>
          {questao.dica && (
            <p style={{ color: "var(--primary-claro)", fontSize: "0.85rem" }}>
              Dica: {questao.dica}
            </p>
          )}

          <form onSubmit={handleSubmit} className="terminal-form">
            <input
              ref={inputRef}
              type="text"
              className={`cyber-input ${erro ? "shake-error" : ""}`}
              placeholder="Digite a chave de acesso..."
              value={resposta}
              onChange={handleInputChange}
              autoFocus
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                Sincronizar
              </button>
              <button
                type="button"
                className="btn btn-accent"
                onClick={onClose}
              >
                Abortar
              </button>
            </div>
          </form>

          {feedback.msg && (
            <p className={`feedback-text ${feedback.type}`} role="alert">
              {feedback.msg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
