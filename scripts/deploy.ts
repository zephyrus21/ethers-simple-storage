import { ethers } from "hardhat";

const main = async () => {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();

  console.log("Contract deployed at:", simpleStorage.address);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
