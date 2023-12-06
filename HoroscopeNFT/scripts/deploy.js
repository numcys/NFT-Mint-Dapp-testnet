async function main() {
  const Horoscope = await ethers.deployContract("contracts/horoscopeNFT.sol:horoscopeNFT");
  await Horoscope.deployed();
  console.log("Deploying Contract...")
  console.log("Contract deployed to address:",  Horoscope.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

