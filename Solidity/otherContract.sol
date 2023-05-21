// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CompanySharing {
    address public owner;
    uint256 public companyCounter;
    uint256 public partnershipCounter;

    struct Company {
        string name;
        string location;
        uint256 statistics;
        bool isCertifiedISO;
        bool sponsorship;
        address owner;
    }

    mapping(uint => Company) public allCompanies;
    mapping(address => address[]) private partnerships;

    constructor() {
        owner = msg.sender;
        companyCounter = 0;
        partnershipCounter = 0;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can call this function"
        );
        _;
    }

    function createCompany(
        string memory _name,
        string memory _location,
        uint256 _statistics,
        bool _isCertifiedISO,
        bool _sponsorship
    ) public {
        companyCounter++;
        Company storage newCompany = allCompanies[companyCounter];
        newCompany.name = _name;
        newCompany.location = _location;
        newCompany.statistics = _statistics;
        newCompany.isCertifiedISO = _isCertifiedISO;
        newCompany.sponsorship = _sponsorship;
        newCompany.owner = msg.sender;
    }

    function getCompanies() public view returns (Company[] memory) {
        Company[] memory CompanyList = new Company[](companyCounter);
        for (uint i = 1; i <= companyCounter; i++) {
            CompanyList[i - 1] = allCompanies[i];
        }
        return CompanyList;
    }

    function addPartner(address _receiver) external {
        partnerships[msg.sender].push(_receiver);
        partnerships[_receiver].push(msg.sender);
        partnershipCounter += 2;
    }

    function getCompanysPartnerships(address company) external view returns (address[] memory) {
        return partnerships[company];
    }
}