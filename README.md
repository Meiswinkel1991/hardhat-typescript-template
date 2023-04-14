# Hardhat Typescript Template

This is a template for a hardhat project in typescript. For the deployment of contracts it is possible to verify the contracts automatically and all addresses and the corresponding abis can be stored in a folder.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
npx hardhat node
```

## Deployment

The file `main.ts` is located in the `scripts/deploy` directory.

Add your contract for deployment.

Run:

```shell
npm run deploy
```

## Accounts

Automatically generate an account and display its address and funds for all networks.

Run:

```shell
npm run generate
npm run account
```
