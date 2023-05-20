// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { ethers } from 'ethers';  // Import ethers

// // You'll need to replace these with the actual values
// const ABI = [
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "_partner",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "enum CompanySharing.VisibilityLevel",
// 				"name": "_visibilityLevel",
// 				"type": "uint8"
// 			}
// 		],
// 		"name": "addPartner",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "string",
// 				"name": "_name",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "_location",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_statistics",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "bool",
// 				"name": "_isCertifiedISO",
// 				"type": "bool"
// 			},
// 			{
// 				"internalType": "bool",
// 				"name": "_sponsorship",
// 				"type": "bool"
// 			}
// 		],
// 		"name": "createCompany",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "constructor"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"name": "companies",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "name",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "location",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "statistics",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "bool",
// 				"name": "isCertifiedISO",
// 				"type": "bool"
// 			},
// 			{
// 				"internalType": "bool",
// 				"name": "sponsorship",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "companyCounter",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "_company",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "_partner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "getCompany",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			},
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "owner",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ]; // replace with actual ABI
// const contractAddress = '0x1baD6ac10A04b28536F2078E2ea5c3E42a64b7fa'; // replace with actual contract address

// export default function SingleOrganization() {
//   const { id } = useParams();
//   const [organization, setOrganization] = useState(null);

//   useEffect(() => {
//     async function getOrganization() {
//       try {
//         // We need a provider (e.g. MetaMask)
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         await provider.send("eth_requestAccounts", []);
        
//         // Create a contract instance
//         const contract = new ethers.Contract(contractAddress, ABI, provider);
        
//         // Call  function from the contract
//         const organizationData = await contract.getOrganization(id);

//         //  function returns one of { id, name, logo, ISO }
//         if (organizationData) {
//           setOrganization(organizationData);
//         } else {
//           setOrganization(null);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     getOrganization();
//   }, [id]);

//   if (!organization) {
//     return <h2 className='section-title'>no organization to display</h2>;
//   } else {
//     const { name, logo, ISO } = organization;

//     return (
//       <section className='section organization-section'>
//         <Link to='/' className='btn btn-primary'>
//           back home
//         </Link>
//         <h2 className='section-title'>{name}</h2>
//         <div className='organization'>
//           <img src={logo} alt={name}></img>
//           <div className='organization-ISO'>
//             <p>
//               <span className='organization-data'>name :</span> {name}
//             </p>
//             <p>
//               <span className='organization-data'>ISO :</span> {ISO}
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }
// }