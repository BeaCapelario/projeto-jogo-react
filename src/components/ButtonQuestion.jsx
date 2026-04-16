export default function ButtonQuestion({
  questoes,
  onOpen,
  modalOpen,
  bloqueada,
  solu,
}) {
  const queID = `dialog-${questoes.id}`;

  const baseIcon = questoes.icon ?? "magic-book.png";
  const icon = bloqueada ? "necromancer.png" : solu ? "gem.png" : baseIcon;

  const aria = bloqueada
    ? `${questoes.titulo} (bloqueada, resolva a anterior)`
    : solu
      ? `${questoes.titulo} (resolvida)`
      : `${questoes.titulo} (disponivel)`;

  return (
    <li className="icon-grid-item">
      <button
        type="button"
        className={`icon-button 
            ${bloqueada ?? "icon-button--locked"} 
            ${solu ?? "icon-button--solved"}`}
        aria-haspopup="dialog"
        aria-controls={queID}
        aria-label={aria}
        aria-disabled={bloqueada || undefined}
        onClick={() => onOpen(questoes)}
        disabled={bloqueada}
      >
        <img
          className="icon-button-img"
          aria-hidden="true"
          src={icon}
          alt={`imagem de um ${icon}`}
        ></img>
        <span className="visually-hidden">{questoes.titulo}</span>
      </button>
    </li>
  );
}
