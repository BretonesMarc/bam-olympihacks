// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

contract CompanyFactory {
    struct Partners {
        uint id;
        string visibility;
    }

    struct Company {
        string name;
        string location;
        address owner;
        uint id;

        // Number of iso certificates
        uint certificatesNumber;
        mapping(uint => string) certificates;

        uint partnersNumber;
        mapping(uint => Partners) partners;
    }

    uint numberOfCompanies = 0;
    mapping(uint => Company) companies;

    mapping(address => uint) public userCompanies; 

    function getAddressesWithCompanies() public view returns (address[] memory) {
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

    // Create a new company
    function createCompany(string memory _name, string memory _location) public {
        require(userCompanies[msg.sender] == 0, "You can only create one company");

        uint companyID = numberOfCompanies++;

        Company storage newCompany = companies[companyID];
        newCompany.name = _name;
        newCompany.location = _location;
        newCompany.owner = msg.sender;
        newCompany.id = companyID;

        userCompanies[msg.sender] = companyID; // Stocker l'ID de la compagnie pour cet utilisateur
    }

  function addCertifications(uint _companyID, string memory _iso) public {
        Company storage company = companies[_companyID];
        company.certificates[company.certificatesNumber++] = _iso;
    }

    function getCertifications(uint _companyID) public view returns (string[] memory) {
        Company storage company = companies[_companyID];
        string[] memory certificates = new string[](company.certificatesNumber);
        for (uint i = 0; i < company.certificatesNumber; i++) {
            certificates[i] = company.certificates[i];
        }
        return certificates;
    }

    function getPartners(uint _companyID) public view returns(Partners[] memory) {
        Company storage company = companies[_companyID];
        Partners[] memory partners = new Partners[](company.partnersNumber);
        for (uint i = 0; i < company.certificatesNumber; i++) {
            partners[i] = company.partners[i];
        }
        return partners;
    }

    function getCompany(uint _companyID) public view returns (string memory name, string memory location, uint certificatesNumber) {
        Company storage company = companies[_companyID];
        return (company.name, company.location, company.certificatesNumber);
    }

      function getCompanies() public view returns (string[] memory, address[] memory) {
        string[] memory names = new string[](numberOfCompanies);
        address[] memory ownersList = new address[](numberOfCompanies);

        for (uint i = 0; i < numberOfCompanies; i++) {
            names[i] = companies[i].name;
            ownersList[i] = companies[i].owner;
        }

        return (names, ownersList);
    }

    function addPartner(uint _myCompanyID, uint _companyID) public {
        Company storage c = companies[_myCompanyID];
        c.partners[c.partnersNumber++] = Partners({id: _companyID, visibility: "public"});
    }

    function seeRequests(uint _myCompanyID) public view returns (uint[] memory) {
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
}
