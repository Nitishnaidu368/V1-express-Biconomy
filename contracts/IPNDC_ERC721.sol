// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "./LibShare.sol";

interface IPNDC_ERC721 {
    function safeMint(
        address to,
        string memory uri,
        LibShare.Share[] memory royalties
    ) external;
}
