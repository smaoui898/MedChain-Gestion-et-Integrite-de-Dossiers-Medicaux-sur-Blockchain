// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract MedicalRecord {

    struct RecordVersion { 
        bytes32 hash;
        uint256 timestamp;
    }

    mapping(uint256 => RecordVersion[]) private records;

    event RecordHashStored(
        uint256 indexed patientId,
        bytes32 hash,
        uint256 timestamp,
        uint256 version
    );

    function storeHash(
        uint256 patientId,
        bytes32 hash
    ) public {

        records[patientId].push(
            RecordVersion({
                hash: hash,
                timestamp: block.timestamp
            })
        );

        emit RecordHashStored(
            patientId,
            hash,
            block.timestamp,
            records[patientId].length
        );
    }

    function getLatestHash(
        uint256 patientId
    ) public view returns (bytes32) {

        require(
            records[patientId].length > 0,
            "No medical record found"
        );

        return records[patientId][records[patientId].length - 1].hash;
    }

    function verifyHash(
        uint256 patientId,
        bytes32 hash
    ) public view returns (bool) {

        require(
            records[patientId].length > 0,
            "No medical record found"
        );

        return getLatestHash(patientId) == hash;
    }

    function getVersionCount(
        uint256 patientId
    ) public view returns (uint256) {

        return records[patientId].length;
    }

    function getVersion(
        uint256 patientId,
        uint256 version
    )
        public
        view
        returns (bytes32 hash, uint256 timestamp)
    {
        require(
            version > 0 &&
            version <= records[patientId].length,
            "Invalid version"
        );

        RecordVersion memory record =
            records[patientId][version - 1];

        return (
            record.hash,
            record.timestamp
        );
    }
}