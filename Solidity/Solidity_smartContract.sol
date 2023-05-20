// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract PlatformSharing {
    address public owner;
    mapping(address => bool) public authorizedCompanies;

    struct Company {
        string name;
        string location;
        uint256 statistics;
        bool isCertifiedISO;
        bool sponsorship;
        address owner;
        uint256 timestamp;
        mapping(address => bool) sentTemplates;
        mapping(address => bool) partners;
        mapping(address => VisibilityLevel) visibilityLevels;
    }

    mapping(uint => Company) public Companies;
    uint public Company_Counter;

    enum VisibilityLevel {
        Public,
        Transparent,
        Private
    }

    mapping(address => Company) public Allcompanies;

    event CertificationUpdated(address indexed company, bool isCertified);
    event StatisticsUpdated(address indexed company, uint256 statistics);
    event PartnershipOrSponsorshipUpdated(
        address indexed company,
        bool hasPartnership
    );
    event TemplateSent(address indexed sender, address indexed recipient);
    event VisibilityLevelUpdated(
        address indexed company,
        address indexed partner,
        VisibilityLevel level
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can call this function"
        );
        _;
    }

    modifier onlyAuthorizedCompany() {
        require(
            authorizedCompanies[msg.sender] == true,
            "Only authorized companies can call this function"
        );
        _;
    }

    function addAuthorizedCompany(address company) external onlyOwner {
        authorizedCompanies[company] = true;
    }

    function removeAuthorizedCompany(address company) external onlyOwner {
        authorizedCompanies[company] = false;
    }

    function createCompany(
        string memory _name,
        string memory _location,
        uint _statistics,
        bool _isCertifiedISO,
        bool _sponsorship
    ) public {
        Company_Counter++;
        Company storage newCompany = Companies[Company_Counter];
        newCompany.name = _name;
        newCompany.location = _location;
        newCompany.statistics = _statistics;
        newCompany.isCertifiedISO = _isCertifiedISO;
        newCompany.sponsorship = _sponsorship;
        newCompany.owner = msg.sender;
        newCompany.timestamp = block.timestamp;
    }

    function updateCertificationStatus(
        bool _isCertified
    ) external onlyAuthorizedCompany {
        Allcompanies[msg.sender].isCertifiedISO = _isCertified;
        emit CertificationUpdated(msg.sender, _isCertified);
    }

    function updateStatistics(
        uint256 _companyStatistics
    ) external onlyAuthorizedCompany {
        Allcompanies[msg.sender].statistics = _companyStatistics;
        emit StatisticsUpdated(msg.sender, _companyStatistics);
    }

    function updateSponsorship(
        bool _hasSponsorship
    ) external onlyAuthorizedCompany {
        Allcompanies[msg.sender].sponsorship = _hasSponsorship;
        emit PartnershipOrSponsorshipUpdated(msg.sender, _hasSponsorship);
    }

    function sendContractTemplate(
        address _recipient
    ) external onlyAuthorizedCompany {
        require(
            Allcompanies[_recipient].visibilityLevels[msg.sender] !=
                VisibilityLevel.Private,
            "Recipient's visibility level is private"
        );
        Allcompanies[msg.sender].sentTemplates[_recipient] = true;
        emit TemplateSent(msg.sender, _recipient);
    }

    function setVisibilityLevel(
        address _partner,
        VisibilityLevel _level
    ) external onlyAuthorizedCompany {
        Allcompanies[msg.sender].visibilityLevels[_partner] = _level;
        emit VisibilityLevelUpdated(msg.sender, _partner, _level);
    }

    function addPartner(
        address _partner,
        VisibilityLevel _level
    ) external onlyAuthorizedCompany {
        Allcompanies[msg.sender].partners[_partner] = true;
        Allcompanies[msg.sender].visibilityLevels[_partner] = _level;
        emit VisibilityLevelUpdated(msg.sender, _partner, _level);
    }

    function removePartner(address _partner) external onlyAuthorizedCompany {
        Allcompanies[msg.sender].partners[_partner] = false;
        emit VisibilityLevelUpdated(
            msg.sender,
            _partner,
            VisibilityLevel.Private
        );
    }

    function getCompany(
        address _company
    )
        external
        view
        returns (bool isCertifiedISO, uint256 statistics, bool sponsorship)
    {
        VisibilityLevel level = Allcompanies[_company].visibilityLevels[
            msg.sender
        ];
        if (level == VisibilityLevel.Private) {
            return (
                Allcompanies[_company].isCertifiedISO,
                Allcompanies[_company].statistics,
                Allcompanies[_company].sponsorship
            );
        } else if (level == VisibilityLevel.Transparent) {
            return (
                Allcompanies[_company].isCertifiedISO,
                0,
                Allcompanies[_company].sponsorship
            );
        } else if (level == VisibilityLevel.Public) {
            return (Allcompanies[_company].isCertifiedISO, 0, false);
        }
    }
}

/*contract YourContract {
    enum VisibilityLevel {
        Private,
        Public,
        Transparent
    }

    struct Company {
        bool isCertifiedISO;
        uint256 companyStatistics;
        bool hasPartnershipOrSponsorship;
        mapping(address => bool) sentTemplates;
        mapping(address => bool) partners;
        mapping(address => VisibilityLevel) visibilityLevels;
    }

    mapping(address => Company) companies;

    function createCompany(
        address companyAddress,
        bool isCertifiedISO,
        uint256 statistics,
        bool sponsorship
    ) external {
        Company memory newCompany;
        newCompany.isCertifiedISO = isCertifiedISO;
        newCompany.companyStatistics = companyStatistics;
        newCompany.hasPartnershipOrSponsorship = hasPartnershipOrSponsorship;

        companies[companyAddress] = newCompany;
    }
}*/
