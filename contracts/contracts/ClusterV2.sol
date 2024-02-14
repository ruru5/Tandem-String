// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.20;
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract ClusterV2 is Ownable {

    mapping(address => mapping(string => Barcode)) public barcodes;
    mapping(address => string[]) private keys;
    mapping(string => GeoLocationData[]) private geo;
    address[] private clients;

    struct Barcode {
        string id; 
        string body;  
        string customKey;  
        uint date;
    }

    struct GeoLocationData {
        string barcodeId;
        string geo;
        string city;
        uint date;
        string amount;
    }

    constructor() Ownable() {}

    function addBarcode(string memory id, string memory body, string memory customKey, uint date) public  {
        if (keys[msg.sender].length == 0) {
            clients.push(msg.sender);
        }

        barcodes[msg.sender][id] = Barcode({
            id: id,
            body: body,
            customKey: customKey,
            date: date
        });
        keys[msg.sender].push(id);
    }

    function addBarcodes(string[] memory ids, string[] memory bodies, string[] memory customKey, uint[] memory date) public  {
        for (uint i = 0; i < ids.length; i++) {
            addBarcode(ids[i], bodies[i], customKey[i], date[i]);
        }
    }

    function removeCodeForOwner(address clientAddress, string memory id) public onlyOwner {
        delete barcodes[clientAddress][id];
    }

    function removeCode(string memory id) public  {
        delete barcodes[msg.sender][id];
    }

    function getBarcodeFromId(address clientAddress, string memory id) public view returns (Barcode memory) {
        return barcodes[clientAddress][id];
    }

    function getAllBarcodes(address clientAddress) public view returns (Barcode[] memory) {
        Barcode[] memory allBarcodes = new Barcode[](keys[clientAddress].length);
        for (uint i = 0; i < keys[clientAddress].length; i++) {
            allBarcodes[i] = barcodes[clientAddress][keys[clientAddress][i]];
        }
        return allBarcodes;
    }

    function getCountBarcodes(address clientAddress) public view returns (uint) {
        return keys[clientAddress].length;
    }

    function getAllClients() public view onlyOwner returns (address[] memory) {
        return clients;
    }

    function addGeo(string memory barcodeId, GeoLocationData memory geoData) public {
        geo[barcodeId].push(geoData);
    }
    
    function getGeo(address clientAddress) public view returns (GeoLocationData[][] memory) {
        GeoLocationData[][] memory allGeo = new GeoLocationData[][](keys[clientAddress].length);
        for (uint i = 0; i < keys[clientAddress].length; i++) {
            allGeo[i] = geo[keys[clientAddress][i]];
        }
        return allGeo;
    }
}