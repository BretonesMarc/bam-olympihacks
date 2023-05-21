export const my_Contract_Address = '0xbC473cC89ac0d3B060Edd908fdC5fDdB707de89c'
export const my_Contract_ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'company',
        type: 'address',
      },
    ],
    name: 'addAuthorizedCompany',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_companyID',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_iso',
        type: 'string',
      },
    ],
    name: 'addCertifications',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_myCompanyID',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_companyID',
        type: 'uint256',
      },
    ],
    name: 'addPrivatePartner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_myCompanyID',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_companyID',
        type: 'uint256',
      },
    ],
    name: 'addPublicPartner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_companyID',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_statistics',
        type: 'uint256',
      },
    ],
    name: 'addStatistics',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_myCompanyID',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_companyID',
        type: 'uint256',
      },
    ],
    name: 'addTransparentPartner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'authorizedCompanies',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_location',
        type: 'string',
      },
    ],
    name: 'createCompany',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAddressesWithCompanies',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_companyID',
        type: 'uint256',
      },
    ],
    name: 'getCertifications',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCompanies',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCompany',
    outputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'location',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'certificatesNumber',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_companyID',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_partnerIndex',
        type: 'uint256',
      },
    ],
    name: 'getPartnerInfo',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'visibility',
            type: 'string',
          },
        ],
        internalType: 'struct CompanyFactory.Partners[]',
        name: '',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_companyID',
        type: 'uint256',
      },
    ],
    name: 'getPartners',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'visibility',
            type: 'string',
          },
        ],
        internalType: 'struct CompanyFactory.Partners[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_companyID',
        type: 'uint256',
      },
    ],
    name: 'getStatistics',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_companyID',
        type: 'uint256',
      },
    ],
    name: 'getVisibilityLevel',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'visibility',
            type: 'string',
          },
        ],
        internalType: 'struct CompanyFactory.Partners[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ownerOfContract',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'company',
        type: 'address',
      },
    ],
    name: 'removeAuthorizedCompany',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_myCompanyID',
        type: 'uint256',
      },
    ],
    name: 'seeRequests',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'userCompanies',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
