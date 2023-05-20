import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import logo1 from '../assets/logo1.png'; // Changed this line

export default function SingleOrganization() {
  const { id } = useParams();
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    function getOrganization() {
      try {
        // As smart contract is not ready, we usin dummy organization data for testing
        const dummyOrganizations = [
          { id: 1, name: 'Organization 1', logo: logo1, ISO: 'ORG1' }, // And this line
          { id: 2, name: 'Organization 2', logo: 'logo2.png', ISO: 'ORG2' },
          { id: 3, name: 'Organization 3', logo: 'logo3.png', ISO: 'ORG3' },
          // Add more dummy organizations as needed...
        ];

        // Convert id from useParams (which is a string) to a #
        const organizationId = Number(id);

        const organization = dummyOrganizations.find(org => org.id === organizationId);

        if (organization) {
          setOrganization(organization);
        } else {
          setOrganization(null);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getOrganization();
  }, [id]);

  if (!organization) {
    return <h2 className='section-title'>no organization to display</h2>;
  } else {
    const { name, logo, ISO } = organization;

    return (
      <section className='section organization-section'>
        <Link to='/' className='btn btn-primary'>
          back home
        </Link>
        <h2 className='section-title'>{name}</h2>
        <div className='organization'>
          <img src={logo} alt={name}></img>
          <div className='organization-ISO'>
            <p>
              <span className='organization-data'>name :</span> {name}
            </p>
            <p>
              <span className='organization-data'>ISO :</span> {ISO}
            </p>
          </div>
        </div>
      </section>
    );
  }
}