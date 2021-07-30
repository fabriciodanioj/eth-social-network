import React from "react";

import Web3 from "web3";
import SocialNetwork from "./abis/SocialNetwork.json";

import { Container, Content } from "./styles";

import Header from "./components/Header";
import Post from "./components/Post";

import GlobalStyles from "./globalStyles";

function App() {
  const [userAddress, setUserAddress] = React.useState("");
  const [socialNetwork, setSocialNetwork] = React.useState(null);
  const [postCount, setPostCount] = React.useState(0);
  const [posts, setPosts] = React.useState([]);

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
    let contract = null;

    // Get user account
    const accounts = await window.web3.eth.getAccounts();
    setUserAddress(accounts[0]);

    // Get blockchain data
    const networkId = await window.web3.eth.net.getId();
    const networkData = SocialNetwork.networks[networkId];
    if (networkData) {
      //Get contract from blockchain
      contract = await window.web3.eth.Contract(
        SocialNetwork.abi,
        networkData.address
      );
      setSocialNetwork(contract);

      //Get post count
      let pc = await contract.methods.postCount().call();
      setPostCount(pc.toNumber());

      //List posts
      for (let i = 1; i <= pc.toNumber(); i++) {
        const post = await contract.methods.posts(i).call();

        setPosts((previousPost) => [...previousPost, post]);
      }
    } else {
      window.alert("SocialNetwork contract not deployed to detected network");
    }
  }

  React.useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  React.useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <>
      <GlobalStyles />
      <Container>
        <Header address={userAddress} />
        <Content>
          {posts &&
            posts.map((post) => (
              <Post
                author={post.author}
                content={post.content}
                tipAmount={post.tipAmount}
                id={post.id}
                key={post.id}
              />
            ))}
        </Content>
      </Container>
    </>
  );
}

export default App;
