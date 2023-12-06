import "./App.css";
 
import { useEffect, useState } from "react";
import { Contract, providers } from "ethers";
import NFT from "./abi/horoscopeNFT.json";
 
const NFT_CONTRACT_ADDRESS = "0x6ab3321Ef282b98C872A093F8834B2265ebDbc82";
 
function App() {
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const [date, setDate] = useState("1992-08-31");
  const [zodiacSign, setZodiacSign] = useState(null);
 
  // state for whether the app is minting or not.
  const [isMinting, setIsMinting] = useState(false);
 
  const [NFTContract, setNFTContract] = useState(null);
 
  const [account, setAccount] = useState(null);
 
  useEffect(() => {
    if (window.ethereum) {
      setIsWalletInstalled(true);
    }
  }, []);
 
  function handleDateInput({ target }) {
    setDate(target.value);
  }
 
  async function connectWallet() {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => {
        setAccount(accounts[0]);
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  }
 
  useEffect(() => {
    calculateZodiacSign(date);
  }, [date]);
 
 
  function calculateZodiacSign(date) {
    let dateObject = new Date(date);
    let day = dateObject.getDate();
    let month = dateObject.getMonth();
    if (month == 0) {
      if (day >= 20) {
        setZodiacSign("Aquarius");
      } else {
        setZodiacSign("Capricorn");
      }
    } else if (month == 1) {
      if (day >= 19) {
        setZodiacSign("Pisces");
      } else {
        setZodiacSign("Aquarius");
      }
    } else if (month == 2) {
      if (day >= 21) {
        setZodiacSign("Aries");
      } else {
        setZodiacSign("Pisces");
      }
    } else if (month == 3) {
      if (day >= 20) {
        setZodiacSign("Taurus");
      } else {
        setZodiacSign("Aries");
      }
    } else if (month == 4) {
      if (day >= 21) {
        setZodiacSign("Gemini");
      } else {
        setZodiacSign("Taurus");
      }
    } else if (month == 5) {
      if (day >= 21) {
        setZodiacSign("Cancer");
      } else {
        setZodiacSign("Gemini");
      }
    } else if (month == 6) {
      if (day >= 23) {
        setZodiacSign("Leo");
      } else {
        setZodiacSign("Cancer");
      }
    } else if (month == 7) {
      if (day >= 23) {
        setZodiacSign("Virgo");
      } else {
        setZodiacSign("Leo");
      }
    } else if (month == 8) {
      if (day >= 23) {
        setZodiacSign("Libra");
      } else {
        setZodiacSign("Virgo");
      }
    } else if (month == 9) {
      if (day >= 23) {
        setZodiacSign("Scorpio");
      } else {
        setZodiacSign("Libra");
      }
    } else if (month == 10) {
      if (day >= 22) {
        setZodiacSign("Sagittarius");
      } else {
        setZodiacSign("Scorpio");
      }
    } else if (month == 11) {
      if (day >= 22) {
        setZodiacSign("Capricorn");
      } else {
        setZodiacSign("Sagittarius");
      }
    }
  }
 
  useEffect(() => {
    function initNFTContract() {
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setNFTContract(new Contract(NFT_CONTRACT_ADDRESS, NFT.abi, signer));
    }
    initNFTContract();
  }, [account]);
 
  async function mintNFT() {
    setIsMinting(true);
    try {
      const transaction = await NFTContract.mintNFT(account, zodiacSign);
  
      // Wait for the transaction to be confirmed
      await transaction.wait();
  
      // Transaction is confirmed, you can perform any additional actions here if needed
    } catch (e) {
      // Handle errors
    } finally {
      setIsMinting(false);
    }
  }
  
  if (account === null) {
    return (
      <div className="App">
        {" "}
        <br />
        {isWalletInstalled ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <p>Install Metamask wallet</p>
        )}
      </div>
    );
  }
  return (
    <div className="App">
      <h1>Horoscope NFT Minting Dapp</h1>
      <p>Connected as: {account}</p>
 
      <input onChange={handleDateInput} value={date} type="date" id="dob" />
      <br />
      <br />
      { (
        <svg fill="#000000" width="800px" height="800px" viewBox="0 0 15 15" id="animal-shelter" xmlns="http://www.w3.org/2000/svg">
        <path d="M 7.528,0.895 9,2 h 1 L 11.473,0.896 C 11.689502,0.73373378 12,0.8884387 12,1.159 V 4.5 c 0,0.722 -0.522,1.184 -1,1.573 V 10 l 0.8,2.4 0.706,0.353 c 0.302922,0.151551 0.494181,0.461283 0.494,0.8 C 13,13.8 12.8,14 12.553,14 H 4.25 C 3.017,14 2,13 2,11.713 2,9.5424588 2.4530836,7.9300225 2.745,6.845 2.8910836,6.3020225 3.0352907,5.8946079 3.138,5.614 3.1956028,5.4566256 3.253276,5.3110749 3.33,5.165 3.7788405,4.3104525 5.0743666,4.9556117 4.672,5.833 4.6232251,5.9393571 4.5778358,6.0512046 4.539,6.15 4.4477518,6.3821288 4.325004,6.7430011 4.193,7.234 3.947004,8.1490011 3.674,9.521 3.558,11.367 3.926,9.307 5.98,7.239 7.635,5.758 7.29,5.432 7.001,5.038 7.001,4.5 l 0,-3.342 c 0,-0.2705613 0.3106215,-0.42543084 0.527,-0.263 z"/>
      </svg>
      ) }
 
      <br />
      <br />
      <button disabled={isMinting} onClick={mintNFT}>
        {isMinting ? "Minting..." : "Mint"}
      </button>
    </div>
  );
}
export default App;
