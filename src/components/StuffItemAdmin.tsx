import { adminList } from '@prisma/client';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const StuffItemAdmin = ({ name, skills, interests, location, companies, image, interviews, id }: adminList) => (
  <tr>
    <td>{name}</td>
    <td>{skills}</td>
    <td>{interests}</td>
    <td>{location}</td>
    <td>{companies}</td>
    <td>{interviews}</td>
    <td>
      {image}
    </td>
    <td>
      <a href={`/edit/${id}`}>Edit</a>
    </td>
  </tr>
);

export default StuffItemAdmin;
