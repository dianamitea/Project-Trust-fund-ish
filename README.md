# Legacy Lock Vault

### 1. Project Description
Legacy Lock Vault is a decentralized time-locked vault application that allows users to securely lock their xEGLD for a specified duration. The smart contract acts as an escrow, recording the user's deposit and a calculated unlock timestamp (set to 5 minutes from the time of locking). Once the funds are locked, the contract enforces strict time-based access control, rejecting any withdrawal attempts until the internal blockchain timestamp surpasses the targeted unlock time. 

### 2. Platform
**MultiversX**

### 3. Deployed Contract Address (Devnet)
`erd1qqqqqqqqqqqqqpgq283wn5u9f4gazvxw0xjw0hhxd8ms8sr9xtjqs72hf4`

### 4. How to Run the Frontend Locally
To run this decentralized application on your local machine, ensure you have Node.js installed, then execute the following commands in your terminal:

1. Install the necessary dependencies:
   ```bash
   npm install

Start the development server connected to the MultiversX Devnet:
npm run start-devnet
Open your browser and navigate to http://localhost:3000 (or the port provided in the terminal). Use a MultiversX wallet extension (like the DeFi Wallet) connected to the Devnet to authenticate and interact.

The smart contract exposes the following primary endpoints:

1) lockFunds: Accepts an incoming payable transaction in xEGLD. It calculates and stores an unlock timestamp based on the block time and the requested lock duration.

2) withdraw: Validates the caller's address against the stored lock record and checks the current block timestamp. If the unlock time has passed, it releases the locked xEGLD back to the caller's wallet.

Team Members for the project : Mitea Diana-Maria & Farcas Andrei-Alexandru 
