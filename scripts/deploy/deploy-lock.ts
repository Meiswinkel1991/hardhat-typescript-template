import { ethers, artifacts } from "hardhat";
import { deployContract } from "../../helper-functions";

export async function deployLock() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.utils.parseEther("0.001");

  // const Lock = await ethers.getContractFactory("Lock");

  await deployContract("Lock", {
    args: [unlockTime],
    value: lockedAmount,
    toVerify: true,
  });

  // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  // await lock.deployed();

  // const contractArtifact = await artifacts.readArtifact("Lock");

  // return { contractaddress: lock.address, abi: contractArtifact.abi };
}
