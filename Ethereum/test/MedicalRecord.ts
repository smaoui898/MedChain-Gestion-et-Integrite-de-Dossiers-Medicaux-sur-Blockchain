import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("MedicalRecord", function () {

  async function deployContract() {
    const MedicalRecord = await ethers.getContractFactory("MedicalRecord");
    const medicalRecord = await MedicalRecord.deploy();

    return medicalRecord;
  }

  it("doit enregistrer un hash", async function () {
    const medicalRecord = await deployContract();

    const patientId = 1;
    const hash = ethers.keccak256(
      ethers.toUtf8Bytes("Dossier patient 1")
    );

    await medicalRecord.storeHash(patientId, hash);

    const storedHash =
      await medicalRecord.getLatestHash(patientId);

    expect(storedHash).to.equal(hash);
  });

  it("doit vérifier un hash correct", async function () {
    const medicalRecord = await deployContract();

    const patientId = 1;
    const hash = ethers.keccak256(
      ethers.toUtf8Bytes("Dossier patient 1")
    );

    await medicalRecord.storeHash(patientId, hash);

    const result =
      await medicalRecord.verifyHash(patientId, hash);

    expect(result).to.equal(true);
  });

  it("doit détecter un hash incorrect", async function () {
    const medicalRecord = await deployContract();

    const patientId = 1;

    const hashCorrect = ethers.keccak256(
      ethers.toUtf8Bytes("Dossier original")
    );

    const hashIncorrect = ethers.keccak256(
      ethers.toUtf8Bytes("Dossier modifie")
    );

    await medicalRecord.storeHash(
      patientId,
      hashCorrect
    );

    const result =
      await medicalRecord.verifyHash(
        patientId,
        hashIncorrect
      );

    expect(result).to.equal(false);
  });

  it("doit gérer plusieurs versions", async function () {
    const medicalRecord = await deployContract();

    const patientId = 1;

    const hash1 = ethers.keccak256(
      ethers.toUtf8Bytes("Version 1")
    );

    const hash2 = ethers.keccak256(
      ethers.toUtf8Bytes("Version 2")
    );

    await medicalRecord.storeHash(patientId, hash1);
    await medicalRecord.storeHash(patientId, hash2);

    const count =
      await medicalRecord.getVersionCount(patientId);

    expect(count).to.equal(2);

    const latestHash =
      await medicalRecord.getLatestHash(patientId);

    expect(latestHash).to.equal(hash2);
  });

  it("doit refuser un patient sans dossier", async function () {
    const medicalRecord = await deployContract();

    await expect(
      medicalRecord.getLatestHash(999)
    ).to.be.revertedWith(
      "No medical record found"
    );
  });

  it("doit émettre l'événement RecordHashStored", async function () {
    const medicalRecord = await deployContract();

    const patientId = 1;

    const hash = ethers.keccak256(
      ethers.toUtf8Bytes("Dossier patient")
    );

    await expect(
      medicalRecord.storeHash(patientId, hash)
    ).to.emit(
      medicalRecord,
      "RecordHashStored"
    );
  });
});