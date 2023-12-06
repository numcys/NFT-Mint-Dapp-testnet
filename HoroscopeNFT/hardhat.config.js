require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");

const {PRIVATE_KEY } = process.env;
module.exports = {
   solidity: "0.8.20",
   defaultNetwork: "mumbai",
   networks: {
     hardhat: {},
     mumbai: {
       url: "https://rpc.ankr.com/polygon_mumbai",
       accounts: [process.env.PRIVATE_KEY],
     },
   },
};
