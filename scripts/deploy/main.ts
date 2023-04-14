import { deployLock } from "./deploy-lock";

async function main() {
  await deployLock();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
