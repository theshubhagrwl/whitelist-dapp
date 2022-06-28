//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Whitelist {
    //max number of addresses that can be whitelisted
    uint8 public maxWhitelistAddresses;

    constructor(uint8 _maxWhitelistAddresses) {
        maxWhitelistAddresses = _maxWhitelistAddresses;
    }
}
