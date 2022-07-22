import { ethers, run, network } from "hardhat";

const main = async () => {
  //? Contract to deploy
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log("Contract deployed at:", simpleStorage.address);

  //? We only verify on a testnet!
  // if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
  //   //$ 6 blocks is sort of a guess
  //   await simpleStorage.deployTransaction.wait(6);
  //   await verify(simpleStorage.address, []);
  // }

  const currentValue = await simpleStorage.retrieve();
  console.log("Current value:", currentValue);

  //? Update current value
  const transactionResponse = await simpleStorage.store(21);
  await transactionResponse.wait();
  const updatedValue = await simpleStorage.retrieve();
  console.log("Updated value:", updatedValue);
};

const verify = async (contractAddress: string, args: any[]) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(e);
    }
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
