import React from "react";

import Web3 from "web3";

import { Container } from "./styles";

function App() {
  const [userAddress, setUserAddress] = React.useState("");

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async function loadBlockchainData() {
    const accounts = await window.web3.eth.getAccounts();

    setUserAddress(accounts[0]);
  }

  React.useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  return (
    <Container>
      <h1>{userAddress}</h1>
    </Container>
  );
}

export default App;
