// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

contract CompanyFactory {
    address public ownerOfContract;
    mapping(address => bool) public authorizedCompanies;

    struct Partners {
        uint id;
        string visibility;
    }

    struct Company {
        string name;
        string location;
        address owner;
        uint id;
        string uRL;
        // Number of iso certificates
        uint certificatesNumber;
        mapping(uint => string) certificates;
        uint partnersNumber;
        mapping(uint => Partners) partners;
        uint statisticsNumber;
        mapping(uint => uint) statistics;
    }

    uint numberOfCompanies = 0;
    mapping(uint => Company) companies;

    mapping(address => uint) public userCompanies;

    constructor() {
        ownerOfContract = msg.sender;
    }

    // modifier onlyOwner() {
    //     require(
    //         msg.sender == ownerOfContract,
    //         "Only the contract owner can call this function"
    //     );
    //     _;
    // }

    // modifier onlyAuthorizedCompany() {
    //     require(
    //         authorizedCompanies[msg.sender] == true,
    //         "Only authorized companies can call this function"
    //     );
    //     _;
    // }

    // function addAuthorizedCompany(address company) external {
    //     authorizedCompanies[company] = true;
    // }

    // function removeAuthorizedCompany(address company) external {
    //     authorizedCompanies[company] = false;
    // }

    // Create a new company
    function createCompany(
        string memory _name,
        string memory _location,
        string memory _uRL
    ) public {
        Company storage newCompany = companies[numberOfCompanies];
        newCompany.name = _name;
        newCompany.location = _location;
        newCompany.owner = msg.sender;
        newCompany.id = numberOfCompanies;
        newCompany.uRL = _uRL;

        userCompanies[msg.sender] = numberOfCompanies; // Stocker l'ID de la compagnie pour cet utilisateur
        numberOfCompanies = numberOfCompanies++;
    }

    function getVisibilityLevel(
        uint _companyID
    ) public view returns (Partners[] memory) {
        Company storage company = companies[_companyID];
        Partners[] memory partners = new Partners[](company.partnersNumber);
        for (uint i = 0; i < company.partnersNumber; i++) {
            partners[i] = company.partners[i];
        }
        return partners;
    }

    function addCertifications(string memory _iso) public {
        uint _companyID = userCompanies[msg.sender]; // Utiliser l'adresse du message pour trouver l'ID de la compagnie associée

        Company storage company = companies[_companyID];
        company.certificates[company.certificatesNumber++] = _iso;
    }

    function addStatistics(uint _statistics) public {
        uint _companyID = userCompanies[msg.sender]; // Utiliser l'adresse du message pour trouver l'ID de la compagnie associée

        Company storage company = companies[_companyID];
        company.statistics[company.statisticsNumber++] = _statistics;
    }

    function getStatistics() public view returns (uint[] memory) {
        uint _companyID = 0;
        for (uint i = 0; i < numberOfCompanies; i++) {
            if (userCompanies[companies[i].owner] == i) {
                _companyID = companies[i].id;
                break;
            }
        }
        Company storage company = companies[_companyID];
        uint[] memory statistics = new uint[](company.statisticsNumber);
        for (uint i = 0; i < company.statisticsNumber; i++) {
            statistics[i] = company.statistics[i];
        }
        return statistics;
    }

    function getCertifications() public view returns (string[] memory) {
        uint _companyID = 0;
        for (uint i = 0; i < numberOfCompanies; i++) {
            if (userCompanies[companies[i].owner] == i) {
                _companyID = companies[i].id;
                break;
            }
        }
        Company storage company = companies[_companyID];
        string[] memory certificates = new string[](company.certificatesNumber);
        for (uint i = 0; i < company.certificatesNumber; i++) {
            certificates[i] = company.certificates[i];
        }
        return certificates;
    }

    function getPartners() public view returns (Partners[] memory) {
        uint _companyID = 0;
        for (uint i = 0; i < numberOfCompanies; i++) {
            if (userCompanies[companies[i].owner] == i) {
                _companyID = companies[i].id;
                break;
            }
        }

        Company storage company = companies[_companyID];
        Partners[] memory partners = new Partners[](company.partnersNumber);
        for (uint i = 0; i < company.partnersNumber; i++) {
            partners[i] = company.partners[i];
        }
        return partners;
    }

    function compareStrings(
        string memory a,
        string memory b
    ) private pure returns (bool) {
        return (keccak256(abi.encodePacked(a)) ==
            keccak256(abi.encodePacked(b)));
    }

    function getCompany()
        public
        view
        returns (
            string memory name,
            string memory location,
            uint certificatesNumber,
            address,
            string memory uRL
        )
    {
        uint _companyID = userCompanies[msg.sender]; // Utiliser l'adresse du message pour trouver l'ID de la compagnie associée

        Company storage company = companies[_companyID];
        return (
            company.name,
            company.location,
            company.certificatesNumber,
            msg.sender,
            company.uRL
        );
    }

    function getCompanies()
        public
        view
        returns (
            string[] memory,
            address[] memory,
            uint[] memory,
            string[] memory
        )
    {
        string[] memory names = new string[](numberOfCompanies);
        address[] memory ownersList = new address[](numberOfCompanies);
        uint[] memory ids = new uint[](numberOfCompanies);
        string[] memory uRLs = new string[](numberOfCompanies);

        for (uint i = 0; i < numberOfCompanies; i++) {
            names[i] = companies[i].name;
            ownersList[i] = companies[i].owner;
            ids[i] = companies[i].id;
        }

        return (names, ownersList, ids, uRLs);
    }

    function addPublicPartner(uint _myCompanyID, uint _companyID) public {
        Company storage c = companies[_myCompanyID];
        c.partners[c.partnersNumber++] = Partners({
            id: _companyID,
            visibility: "public"
        });
    }

    function addTransparentPartner(uint _myCompanyID, uint _companyID) public {
        Company storage c = companies[_myCompanyID];
        c.partners[c.partnersNumber++] = Partners({
            id: _companyID,
            visibility: "transparent"
        });
    }

    function addPrivatePartner(uint _myCompanyID, uint _companyID) public {
        Company storage c = companies[_myCompanyID];
        c.partners[c.partnersNumber++] = Partners({
            id: _companyID,
            visibility: "private"
        });
    }

    function seeRequests(
        uint _myCompanyID
    ) public view returns (uint[] memory) {
        uint[] memory companyRequests;
        uint count = 0;

        for (uint i = 0; i < numberOfCompanies; i++) {
            if (_myCompanyID != i) {
                Company storage company = companies[i];
                for (uint j = 0; j < company.partnersNumber; j++) {
                    Partners storage partner = company.partners[j];
                    if (partner.id == _myCompanyID) {
                        // Ajouter la demande de partenariat à la liste
                        if (count == 0) {
                            // Si c'est la première demande, initialiser le tableau avec une taille de 1
                            companyRequests = new uint[](1);
                        } else {
                            // Sinon, étendre la taille du tableau de demandes
                            uint[] memory temp = new uint[](count + 1);
                            for (uint k = 0; k < count; k++) {
                                temp[k] = companyRequests[k];
                            }
                            companyRequests = temp;
                        }

                        // Ajouter la demande à la fin du tableau
                        companyRequests[count] = company.id;
                        count++;
                    }
                }
            }
        }

        return companyRequests;
    }

    function getPartnerInfo(
        uint _companyID,
        uint _partnerIndex
    ) public view returns (string[] memory, Partners[] memory, uint[] memory) {
        Company storage company = companies[_companyID];
        require(
            _partnerIndex < company.partnersNumber,
            "Invalid partner index"
        );

        Partners storage partner = company.partners[_partnerIndex];

        if (compareStrings(partner.visibility, "public")) {
            // Return certificates only
            return (getCertifications(), new Partners[](0), new uint[](0));
        } else if (compareStrings(partner.visibility, "transparent")) {
            // Return certificates and partners
            return (getCertifications(), getPartners(), new uint[](0));
        } else if (compareStrings(partner.visibility, "private")) {
            // Return certificates, partners, and statistics
            return (getCertifications(), getPartners(), getStatistics());
        } else {
            revert("Invalid visibility level");
        }
    }

    function getAddressesWithCompanies()
        public
        view
        returns (address[] memory)
    {
        uint count = 0;

        // Count the number of addresses with companies
        for (uint i = 0; i < numberOfCompanies; i++) {
            if (userCompanies[companies[i].owner] == i) {
                count++;
            }
        }

        // Create an array to store the addresses
        address[] memory addressesWithCompanies = new address[](count);

        // Populate the array with addresses
        uint index = 0;
        for (uint i = 0; i < numberOfCompanies; i++) {
            if (userCompanies[companies[i].owner] == i) {
                addressesWithCompanies[index] = companies[i].owner;
                index++;
            }
        }

        return addressesWithCompanies;
    }
}