import "dotenv/config";
import { ethers } from "ethers";
("ethers");
import * as fs from "fs-extra";

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const bin = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");
  const contractFactory = new ethers.ContractFactory(abi, bin, wallet);

  console.log("Deploying contract...");

  const contract = await contractFactory.deploy();
  const deploymentReceipt = await contract.deployTransaction.wait();
  console.log(`Contract deployed to ${contract.address}`);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
