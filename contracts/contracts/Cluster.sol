// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.20;
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Cluster is Ownable {

    mapping(string => Barcode) public barcodes;
    string[] private keys;

    struct Barcode {
        string id;
        string body;
    }

    constructor() Ownable() {}

    function addBarcode(string memory id, string memory body) public  {
        barcodes[id] = Barcode({
            id: id,
            body: body
        });
        keys.push(id);
    }

    function addBarcodes(string[] memory ids, string[] memory bodies) public  {
        for (uint i = 0; i < ids.length; i++) {
            barcodes[ids[i]] = Barcode({
                id: ids[i],
                body: bodies[i]
            });
            keys.push(ids[i]);
        }
    }

    function removeCode(string memory id) public onlyOwner  {
        delete barcodes[id];
    }

    function getBarcodeFromId(string memory id) public view returns (Barcode memory) {
        return barcodes[id];
    }

    function getAllBarcodes() public view returns (Barcode[] memory) {
        Barcode[] memory allBarcodes = new Barcode[](keys.length);
        for (uint i = 0; i < keys.length; i++) {
            allBarcodes[i] = barcodes[keys[i]];
        }
        return allBarcodes;
    }

    function getCountBarcodes() public view returns (uint) {
        return keys.length;
    }
}