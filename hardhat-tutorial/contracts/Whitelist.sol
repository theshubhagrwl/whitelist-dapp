//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Whitelist {
    //max number of addresses that can be whitelisted
    uint8 public maxWhitelistAddresses;

    //number of addresses whitelisted till now
    uint8 public numAddressesWhitelisted;

    mapping(address => bool) public whitelistedAddress;

    constructor(uint8 _maxWhitelistAddresses) {
        maxWhitelistAddresses = _maxWhitelistAddresses;
    }

    function addAddressToWhitelist() public {
        require(!whitelistedAddress[msg.sender], "Sender already in whitelist");
        require(
            numAddressesWhitelisted < maxWhitelistAddresses,
            "Max whitelist addresses reached"
        );
        whitelistedAddress[msg.sender] = true;
        numAddressesWhitelisted += 1;
    }
}
