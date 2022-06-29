import Head from "next/head";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Web3Modal from "web3modal";
import { providers } from "ethers";
import { abi, WHITELIST_CONTRACT_ADDRESS } from "../constants";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [numOfWhitelisted, setNumOfWhitelisted] = useState(0);
  const [joinedWhitelist, setJoinedWhitelist] = useState(false);

  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    try {
      const provider = await web3ModalRef.current.connect();
      const web3Provider = new providers.Web3Provider(provider);

      const { chainId } = await web3Provider.getNetwork();
      if (chainId !== 4) {
        window.alert("Change network to Rinkeby");
        throw new Error("Change network to Rinkeby");
      }

      if (needSigner) {
        const signer = web3Provider.getSigner();
        return signer;
      }

      return web3Provider;
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfAddressIsWhitelisted = async () => {
    try {
      const signer = getProviderOrSigner(true);
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );
      const address = await signer.getAddress();

      const _joinedWhitelist = await whitelistContract.whitelistedAddresses(
        address
      );
      setJoinedWhitelist(_joinedWhitelist);
    } catch (error) {
      console.log(error);
    }
  };

  const getNumberOfWhitelisted = async () => {
    try {
      const provider = await getProviderOrSigner();
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        provider
      );
      const _numOfWhitelisted =
        await whitelistContract.numAddressesWhitelisted();
      setNumOfWhitelisted(_numOfWhitelisted);
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
      checkIfAddressIsWhitelisted();
      getNumberOfWhitelisted();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(
    (walletConnected) => {
      if (!walletConnected) {
        web3ModalRef.current = new Web3Modal({
          network: "rinkeby",
          providerOptions: {},
          disableInjectedProvider: false,
        });
        connectWallet();
      }
    },
    [walletConnected]
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Whitelist Dapp</title>
        <meta name="description" content="Whitelist Dapp" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Crypto Deves</h1>
        <div className={styles.description}>
          {numOfWhitelisted} already joined the whitelist
        </div>

        <img className={styles.image} src="./crypto-devs.svg" />
      </main>

      <footer className={styles.footer}>Made with &#10084; Crypto Devs</footer>
    </div>
  );
}
