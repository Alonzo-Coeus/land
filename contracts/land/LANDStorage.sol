// solium-disable linebreak-style
pragma solidity ^0.4.23;

import "../estate/IEstateRegistry.sol";

// solium-disable indentation
contract LANDStorage {
  mapping (address => uint) public latestPing;

  uint256 constant clearLow = 0xffffffffffffffffffffffffffffffff00000000000000000000000000000000;
  uint256 constant clearHigh = 0x00000000000000000000000000000000ffffffffffffffffffffffffffffffff;
  uint256 constant factor = 0x100000000000000000000000000000000;

  mapping (address => bool) internal _deprecated_authorizedDeploy;

  mapping (uint256 => address) public updateOperator;
  mapping (uint256 => address) public updateManager;

  IEstateRegistry public estateRegistry;

  mapping (address => bool) public authorizedDeploy;
}
