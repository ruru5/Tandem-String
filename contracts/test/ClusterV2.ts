import { expect } from "chai";
import { ethers } from "hardhat";
import "@nomicfoundation/hardhat-ethers";
import { ClusterV2 } from "../typechain-types";

describe("ClusterV2", function () {
  let contractDeployed: ClusterV2;
  const id = "1234567890123";
  const id_2 = "123";
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
    contractDeployed = await ethers.deployContract("ClusterV2");
  });

  it("Should add barcode", async function () {
    const [owner, wallet1, wallet2] = await ethers.getSigners();
    const addBarcodeTx = await contractDeployed
      .connect(wallet1)
      .addBarcode(id, uri, "wallet1");
    await addBarcodeTx.wait();
    const addBarcodeTxWallet2 = await contractDeployed
      .connect(wallet2)
      .addBarcode(id, uri, "wallet2");
    await addBarcodeTxWallet2.wait();
    await expect(
      await contractDeployed.getBarcodeFromId(wallet1, id)
    ).deep.equal([id, uri, "wallet1"]);
    await expect(
      await contractDeployed.getBarcodeFromId(wallet2, id)
    ).deep.equal([id, uri, "wallet2"]);
  });

  it("Should remove barcode", async function () {
    const [owner, wallet1, wallet2] = await ethers.getSigners();
    const addBarcodeTx = await contractDeployed
      .connect(wallet1)
      .addBarcode(id, uri, "wallet1");
    await addBarcodeTx.wait();
    const editBarcodeTx = await contractDeployed
      .connect(wallet1)
      .removeCode(id);
    await editBarcodeTx.wait();
    await expect(
      await contractDeployed.getBarcodeFromId(wallet1, id)
    ).deep.equal(["", "", ""]);
  });

  it("Should removeCode be available only for owner", async function () {
    const [owner, wallet1, wallet2] = await ethers.getSigners();
    const addBarcodeTx = await contractDeployed
      .connect(wallet1)
      .addBarcode(id, uri, "wallet1");
    await addBarcodeTx.wait();
    await expect(
      contractDeployed.connect(wallet1).removeCodeForOwner(wallet1, id)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should accept only admin address for removeCodeForOwner", async function () {
    const [owner, wallet1, wallet2] = await ethers.getSigners();
    const addBarcodeTx = await contractDeployed
      .connect(wallet1)
      .addBarcode(id, uri, "wallet1");
    await addBarcodeTx.wait();

    const editBarcodeTx = await contractDeployed.removeCodeForOwner(
      wallet1,
      id
    );
    await editBarcodeTx.wait();
    await expect(
      await contractDeployed.getBarcodeFromId(wallet1, id)
    ).deep.equal(["", "", ""]);
  });

  it("Should get all clients", async function () {
    const [owner, wallet1, wallet2] = await ethers.getSigners();
    const addBarcodeTx = await contractDeployed
      .connect(wallet1)
      .addBarcode(id, uri, "wallet1");
    await addBarcodeTx.wait();
    const addBarcodeTxWallet2 = await contractDeployed
      .connect(wallet2)
      .addBarcode(id, uri, "wallet2");
    await addBarcodeTxWallet2.wait();

    await expect(await contractDeployed.getAllClients()).deep.equal([
      wallet1.address,
      wallet2.address,
    ]);
  });

  it("Should get the count per clients", async function () {
    const [owner, wallet1, wallet2] = await ethers.getSigners();
    const addBarcodeTx = await contractDeployed
      .connect(wallet1)
      .addBarcode(id, uri, "wallet1");
    await addBarcodeTx.wait();
    const addBarcodeTxWallet1 = await contractDeployed
      .connect(wallet1)
      .addBarcode(id, uri, "wallet11");
    await addBarcodeTxWallet1.wait();
    const addBarcodeTxWallet2 = await contractDeployed
      .connect(wallet2)
      .addBarcode(id, uri, "wallet2");
    await addBarcodeTxWallet2.wait();

    await expect(
      await contractDeployed.getCountBarcodes(wallet1.address)
    ).equal(2);
    await expect(
      await contractDeployed.getCountBarcodes(wallet2.address)
    ).equal(1);
  });

  it("Should get all barcodes ", async function () {
    const [owner, wallet1, wallet2] = await ethers.getSigners();
    const addBarcodeTx = await contractDeployed
      .connect(wallet1)
      .addBarcode(id, uri, "wallet1");
    await addBarcodeTx.wait();
    const addBarcodeTxWallet1 = await contractDeployed
      .connect(wallet1)
      .addBarcode(id_2, uri, "wallet11");
    await addBarcodeTxWallet1.wait();
    const addBarcodeTxWallet2 = await contractDeployed
      .connect(wallet2)
      .addBarcode(id, uri, "wallet2");
    await addBarcodeTxWallet2.wait();

    expect(await contractDeployed.getAllBarcodes(wallet1)).deep.equal([
      [id, uri, "wallet1"],
      [id_2, uri, "wallet11"],
    ]);
    expect(await contractDeployed.getAllBarcodes(wallet2)).deep.equal([
      [id, uri, "wallet2"],
    ]);
  });

  it("Should add geo location", async function () {
    const [owner, wallet1, wallet2] = await ethers.getSigners();
    const addBarcodeTx = await contractDeployed
      .connect(wallet1)
      .addBarcode(id, uri, "wallet1");
    await addBarcodeTx.wait();
    const newLocal = {
      barcodeId: id,
      geo: "45.815399 15.966568",
      city: "Montreal",
      date: BigInt(Date.now()),
      amount: "10",
    };
    const addGeoLocationTx = await contractDeployed.addGeo(id, newLocal);
    await addGeoLocationTx.wait();

    const addBarcodeTxWallet2 = await contractDeployed
      .connect(wallet2)
      .addBarcode(id_2, uri, "wallet2");
    await addBarcodeTxWallet2.wait();
    const newLocal2 = {
      barcodeId: id_2,
      geo: "45.815399 15.966568",
      city: "Montreal3",
      date: BigInt(Date.now()),
      amount: "103",
    };
    const addGeoLocationTxWallet2 = await contractDeployed.addGeo(
      id_2,
      newLocal2
    );
    await addGeoLocationTxWallet2.wait();

    await expect(await contractDeployed.getGeo(wallet1)).deep.equal([
      [[id, newLocal.geo, newLocal.city, newLocal.date, newLocal.amount]],
    ]);
    await expect(await contractDeployed.getGeo(wallet2)).deep.equal([
      [[id_2, newLocal2.geo, newLocal2.city, newLocal2.date, newLocal2.amount]],
    ]);
  });
});
