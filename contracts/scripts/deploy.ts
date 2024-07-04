import { ethers } from "ethers";
import 'dotenv/config';
import { Cluster__factory } from "../typechain-types";

async function main() {
  const rpcUrl = process.env.RPC_URL;
  if (!rpcUrl) throw new Error("Invalid RPC URL");
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const lastBlock = await provider.getBlock("latest");
  console.log(`The latest block number is \n`);
  console.log({ lastBlock });

  const private_key = process.env.PRIVATE_KEY;
  if (!private_key || private_key.length != 64)
    throw new Error("Invalid private key");
  const deployer = new ethers.Wallet(private_key, provider);
  const balance = await provider.getBalance(deployer.address);
  console.log(`The address of the deployer is ${deployer.address}`);
  console.log(`the deployer balance is`);
  console.log(`${balance} BASE goerli`);

  const nftFactory = new Cluster__factory(deployer);
  const nftContract = await nftFactory.deploy();
  const nftContractAddress = await nftContract.getAddress();
  console.log(`The NFT contract address is ${nftContractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
