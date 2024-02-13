import { expect } from "chai";
import { ethers } from "hardhat";
import "@nomicfoundation/hardhat-ethers";
import { Cluster } from "../typechain-types";

describe("Cluster", function () {
  let contractDeployed: Cluster;
  const id = '1234567890123';
  const uri: string = `HRVHUB30
  HRK
  000000000012355
  ZELJKO SENEKOVIC
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
  const uriChanged: string = `HRVHUB31
  HRK
  000000000012355
  ZELJKO SENEKOVIC
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
  beforeEach(async () => {
    contractDeployed = await ethers.deployContract("Cluster");
  });

  it("Should add barcode", async function () {
    const addBarcodeTx = await contractDeployed.addBarcode(id, uri);
    await addBarcodeTx.wait();
    await expect(await contractDeployed.getBarcodeFromId(id)).deep.equal([
      id,
      uri,
    ]);
  });

  it("Should edit barcode", async function () {
    const addBarcodeTx = await contractDeployed.addBarcode(id, uri);
    await addBarcodeTx.wait();
    await expect(await contractDeployed.getBarcodeFromId(id)).deep.equal([
      id,
      uri,
    ]);
    const editBarcodeTx = await contractDeployed.addBarcode(id, uriChanged);
    await editBarcodeTx.wait();
    await expect(await contractDeployed.getBarcodeFromId(id)).deep.equal([
      id,
      uriChanged,
    ]);
  });

  it("Should remove barcode", async function () {
    const addBarcodeTx = await contractDeployed.addBarcode(id, uri);
    await addBarcodeTx.wait();
    const editBarcodeTx = await contractDeployed.removeCode(id);
    await editBarcodeTx.wait();
    await expect(await contractDeployed.getBarcodeFromId(id)).deep.equal([
      BigInt(0),
      "",
    ]);
  });

  it("Should accept only admin address", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    await expect(
      contractDeployed.connect(addr2).addBarcode(id, uri)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
