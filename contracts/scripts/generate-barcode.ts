import { faker } from "@faker-js/faker";
import "dotenv/config";
import crypto from "crypto";
import hre from "hardhat";

export function createRandomUser() {
  const text = `HRVHUB30
  HRK
  000000000012355
  ${faker.internet.userName()}
  IVANECKA ULICA 125
  42000 VARAZDIN
  2DBK d.d.
  ALKARSKI PROLAZ 13B
  21230 SINJ
  HR1210010051863000160
  HR01
  7269-68949637676-00019
  COST
  Troskovi za 1. mjesec
  `;
  const hash = crypto.createHash("sha1").update(text).digest("hex");
  return {
    text: text,
    id: hash,
  };
}

export const USERS = faker.helpers.multiple(createRandomUser, {
  count: 50,
});

async function main() {
  const contract = await hre.ethers.getContractAt(
    "Cluster",
    process.env.CONTRACT_ADDRESS!
  );

  const transaction = await contract.addBarcodes(
    USERS.map((x) => x.id),
    USERS.map((x) => x.text)
  );
  await transaction.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
