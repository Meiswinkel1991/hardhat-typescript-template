import { artifacts, ethers, run, network } from "hardhat";
import { saveContract } from "./utils/save-contract";
import { developmentChains } from "./helper-hardhat-config";
import { BigNumber } from "ethers";

export const verify = async (contractAddress: string, args: any[]) => {
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

export interface DeploymentSetting {
  deployer?: string;
  args?: any[];
  value?: BigNumber;
  toVerify?: boolean;
}

export const deployContract = async (contractName: string, settings: DeploymentSetting) => {
  const args = settings.args || [];
  const value = settings.value || 0;
  const toVerify = settings.toVerify || false;

  const deployer = settings.deployer ? await ethers.getSigner(settings.deployer) : (await ethers.getSigners())[0];

  const Factory = await ethers.getContractFactory(contractName, deployer);
  const contract = await Factory.deploy(...args, { value: value });
  await contract.deployed();

  console.log(`Contract: ${contractName} deployed to ${contract.address} on ${network.name}`);

  const contractArtifact = await artifacts.readArtifact(contractName);

  saveContract({ contractaddress: contract.address, abi: contractArtifact.abi });

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY && toVerify) {
    await verify(contract.address, args);
  }
};
