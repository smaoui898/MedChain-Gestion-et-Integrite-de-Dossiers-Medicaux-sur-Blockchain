# 🩺 MedChain — Gestion & Intégrité de Dossiers Médicaux sur Blockchain

[![Solidity](https://img.shields.io/badge/Solidity-^0.8.28-363636?logo=solidity)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-3.x-yellow?logo=ethereum)](https://hardhat.org/)
[![Ethers.js](https://img.shields.io/badge/Ethers.js-v6-blue)](https://docs.ethers.org/v6/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**MedChain** est une application web décentralisée (DApp) conçue pour résoudre les problématiques d'altération et de traçabilité des données de santé. 

En combinant une application de gestion médicale traditionnelle et la blockchain **Ethereum**, chaque mise à jour de dossier médical produit une empreinte cryptographique (**hash Keccak-256**) enregistrée de façon immuable dans un **Smart Contract**, permettant à tout moment de vérifier l'intégrité absolue d'un dossier.

---

## 🌟 Fonctionnalités Clés

- 🔒 **Immuabilité & Sécurité :** Aucun dossier médical en clair n'est stocké sur la blockchain (respect du RGPD et du secret médical) ; seuls les hashes cryptographiques et horodatages sont ancrés on-chain.
- 📜 **Versionnage automatique :** Chaque modification génère une nouvelle version du dossier horodatée (`block.timestamp`).
- 🔍 **Contrôle d'intégrité en temps réel :** Comparaison instantanée entre le texte du dossier médical et le hash enregistré pour détecter la moindre falsification.
- 🦊 **Intégration Web3 fluide :** Interface réactive connectée à MetaMask (Ethers.js v6) avec bascule automatique sur le réseau local Hardhat.
- 👥 **Portail Médical & Patient :** Architecture backend (Express / SQLite) avec authentification sécurisée JWT (rôles Médecin et Patient).

---

## 🏗️ Architecture du Projet

```text
TP_blockchain_medical_app/
├── Ethereum/                      # Écosystème Blockchain
│   ├── contracts/
│   │   └── MedicalRecord.sol      # Smart Contract d'ancrage et de vérification
│   ├── ignition/modules/
│   │   └── MedicalRecord.ts       # Module de déploiement Hardhat Ignition
│   ├── frontend/
│   │   └── medchain.html          # DApp Web3 d'interaction avec le contrat
│   ├── hardhat.config.ts          # Configuration du réseau Hardhat
│   └── test/                      # Tests automatisés
├── config/                        # Configuration base de données SQLite
├── routes/                        # Routes API (Auth, Médecin, Patient)
├── public/                        # Interface classique de l'application web
├── server.js                      # Serveur backend Node.js / Express
└── package.json
