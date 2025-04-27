'use client';

import { Student } from '@prisma/client';
import Image from 'next/image';

const StuffItemAdmin = ({
  id,
  name,
  skills,
  interests,
  location,
  companies,
  interviews,
  image,
}: Student) => (
  <tr>
    <td>{name}</td>
    <td>{skills.join(', ')}</td>
    <td>{interests.join(', ')}</td>
    <td>{location}</td>
    <td>{companies.join(', ')}</td>
    <td>{interviews.join(', ')}</td>
    <td>
      <Image
        src={image}
        alt={name}
        width={50}
        height={50}
        style={{ objectFit: 'cover', borderRadius: '4px' }}
      />
    </td>
    <td>
      <a href={`/edit/${id}`}>Edit</a>
    </td>
  </tr>
);

export default StuffItemAdmin;
