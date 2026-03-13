# ✨ Night Raven Quest: O Espelho da Verdade

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellowgreen?style=for-the-badge)](#)

> **Uma experiência de Caça ao Tesouro Interativa (PWA) que une o mundo real ao universo mágico de Night Raven College.**

---

## 📖 Visão Geral e Contexto

O **Espelho das Trevas** de *Night Raven College* foi estilhaçado por uma névoa de **Blot**. O jogador (Yu) deve percorrer o campus (mapeado no ambiente físico do SENAI) para coletar os **7 Fragmentos de Cristal Estelar** guardados pelos líderes dos dormitórios. 

Somente a união desses fragmentos permitirá a restauração do portal e a estabilidade mágica da escola. A aplicação utiliza geolocalização em tempo real para transformar o espaço físico em um tabuleiro de jogo interativo.

---

## 🛠️ Arquitetura e Tecnologias

O projeto foi construído com foco em performance mobile, acessibilidade e resiliência offline:

* **Frontend:** React.js com hooks personalizados para controle de estado do jogo.
* **Mobile-First & PWA:** Interface responsiva com suporte a *Service Workers* para funcionamento em áreas de baixa conectividade.
* **Geolocalização:** Integração com a `Geolocation API` (navigator.geolocation) para rastreio em tempo real e cálculo de proximidade.
* **Persistência Local:** Utilização de `LocalStorage` e `IndexedDB` para salvar:
    * Progresso de pontos desbloqueados e inventário.
    * Cache de assets críticos (ícones, mapas e sons).
* **Acessibilidade:** Suporte total a navegação via teclado e marcações ARIA para leitores de tela.

---

## 🎮 Módulos e Mecânicas de Gameplay

### 1. Módulo de Navegação (Mapa)
* **Modo GPS:** Os Pontos de Interesse (POIs) tornam-se ativos em um raio de 5 a 10 metros. O ponto alvo pulsa ao entrar no alcance.
* **Modo Sequencial (Fallback):** Se o GPS estiver inativo, o guia **Grim** oferece desbloqueio manual após a conclusão do desafio anterior.

### 2. Minijogos (Desafios dos Guardiões)
| Dinâmica | Mecânica Técnica | Descrição |
| :--- | :--- | :--- |
| **Limpeza de Blot** | Canvas/Touch Swipe | Jogador remove manchas de tinta da tela em menos de 10s. |
| **Ritmo Mágico** | Timing Click | Tocar em círculos concêntricos em sincronia com o pulso visual. |
| **Quiz dos Guardiões** | Logic Quiz | Perguntas de múltipla escolha com recompensas variáveis (Pista completa vs. incompleta). |

### 3. Inventário e Clímax
* **Gerenciamento:** Armazena o status de cada fragmento coletado.
* **Enigma Final (Drag & Drop):** Uma tela contendo um vitral quebrado onde o jogador deve arrastar as pistas para os slots corretos baseando-se nas dicas textuais.

---

## 🏰 Estrutura da Jornada (Os 7 Dormitórios)

| Ordem | Dormitório | Líder | Fragmento | Pista do Enigma |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **Heartslabyul** | Riddle | Soberania | "A coroa acima de todos" |
| 2 | **Savanaclaw** | Leona | Garra | [Símbolo do Instinto] |
| 3 | **Octavinelle** | Azul | Benevolência | "O gelo abaixo do fogo" |
| 4 | **Scarabia** | Kalim | Celebração | [Símbolo da Lealdade] |
| 5 | **Pomefiore** | Vil | Beleza | "O espelho reflete a verdade" |
| 6 | **Ignihyde** | Idia | Chama | [Símbolo da Inovação] |
| 7 | **Diasomnia** | Malleus | Destino | "O portal se abre no centro" |

---
