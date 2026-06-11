import React, { useState, useEffect } from "react";
import './textoefeito.css';

export default function TextoEfeito({ texto = "", velocidade = 30 }) {
  const [textoExibido, setTextoExibido] = useState("");

  useEffect(() => {
    setTextoExibido("");
    
    if (!texto) return;

    let i = 0;
    const temporizador = setInterval(() => {
      setTextoExibido((prev) => prev + texto.charAt(i));
      i++;

      if (i >= texto.length) {
        clearInterval(temporizador);
      }
    }, velocidade);

    return () => clearInterval(temporizador);
  }, [texto, velocidade]);

  return (
    <span className="terminal-text-effect">
      {textoExibido}
      <span className="terminal-cursor">_</span>
    </span>
  );
}