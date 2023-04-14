import { saveObjectAsJson } from "./save-object";
import { deploymentsPath } from "../helper-hardhat-config";
import { network } from "hardhat";

interface Serializable {
  [key: string]: any;
}

interface AnyContract {
  contractaddress: string;
  abi: any[];
}

export function saveContract(contract: AnyContract) {
  const networkName = network.name;
  const saveContractObj: Serializable = {};
  saveContractObj[networkName] = {
    address: contract.contractaddress,
    abi: contract.abi,
  };

  saveObjectAsJson(saveContractObj, "Lock", deploymentsPath);
}
