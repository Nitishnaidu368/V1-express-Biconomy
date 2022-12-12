// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "./LibShare.sol";
import "./IPNDC_ERC721.sol";

contract PNDCGasless is ERC2771Context {
    IPNDC_ERC721 PNDC;

    constructor(address address_PNDC, address address_Forweder)
        ERC2771Context(address_Forweder)
    {
        PNDC = IPNDC_ERC721(address_PNDC);
    }

    function gaslessmint(
        address to,
        string memory uri,
        LibShare.Share[] memory royalties
    ) external {
        PNDC.safeMint(to, uri, royalties);
    }
}
