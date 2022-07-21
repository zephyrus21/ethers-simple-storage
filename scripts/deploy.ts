import "dotenv/config";
import { ethers } from "ethers";
("ethers");
import * as fs from "fs-extra";

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf-8");
  let wallet = ethers.Wallet.fromEncryptedJsonSync(
    encryptedJson,
    process.env.PASSWORD!
  );
  wallet = wallet.connect(provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const bin = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");
  const contractFactory = new ethers.ContractFactory(abi, bin, wallet);

  console.log("Deploying contract...");

  const contract = await contractFactory.deploy();
  const deploymentReceipt = await contract.deployTransaction.wait();
  console.log(`Contract deployed to ${contract.address}`);

  // Get Fav Number
  const currentFavNumber = await contract.retrieve();
  console.log(`Current fav number is ${currentFavNumber}`);
  const transactionStore = await contract.store("21");
  const updatedFavNumber = await contract.retrieve();
  console.log(`Updated fav number is ${updatedFavNumber}`);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
