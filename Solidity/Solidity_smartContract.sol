// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract CompanyFactory {
    struct Company {
        string name;
        string location;
        address owner;
        address[] partners;
    }

    // Mapping from owner address to Company
    mapping(address => Company) public companies;

    // Array of owner addresses to help with getCompanies function
    address[] public owners;

    function createCompany(string memory _name, string memory _location) public {
        require(companies[msg.sender].owner == address(0), "Company with this owner already exists");
        
        Company memory newCompany = Company({
            name: _name,
            location: _location,
            owner: msg.sender,
            partners: new address[](0)
        });

        companies[msg.sender] = newCompany;
        owners.push(msg.sender);
    }

    function addPartner(address _partner) public {
        require(companies[msg.sender].owner != address(0), "Company does not exist");
        require(companies[_partner].owner != address(0), "Partner's company does not exist");

        companies[msg.sender].partners.push(_partner);
        companies[_partner].partners.push(msg.sender);
    }

    function getPartners() public view returns (address[] memory) {
        require(companies[msg.sender].owner != address(0), "Company does not exist");

        return companies[msg.sender].partners;
    }

    function getCompanies() public view returns (string[] memory, address[] memory) {
        string[] memory names = new string[](owners.length);
        address[] memory ownersList = new address[](owners.length);

        for (uint i = 0; i < owners.length; i++) {
            names[i] = companies[owners[i]].name;
            ownersList[i] = owners[i];
        }

        return (names, ownersList);
    }

    function getCompany(address ownerAddress) public view returns (string memory, string memory, address) {
        require(companies[ownerAddress].owner != address(0), "Company does not exist");

        Company memory company = companies[ownerAddress];
        return (company.name, company.location, company.owner);
    }
}
