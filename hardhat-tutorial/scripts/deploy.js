const { ethers } = require("hardhat");

async function main() {
  const whitelistContract = await ethers.getContractFactory("Whitelist");

  //10 is the max number of tokens that can be whitelisted
  //inside the deploy method we pass constructor arguments
  const deployedWhitelistContract = await whitelistContract.deploy(10);

  await deployedWhitelistContract.deployed();

  console.log("whitelisted address: ", deployedWhitelistContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
