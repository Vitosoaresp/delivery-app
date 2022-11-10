import React from 'react';

import PropTypes from 'prop-types';

export default function UserBox({ index, id, name, email, role }) {
  return (
    <tr>
      <td data-testid={ `admin_manage__element-user-table-item-number-${index}` }>
        {id}
      </td>

      <td data-testid={ `admin_manage__element-user-table-name-${index}` }>
        {name}
      </td>

      <td data-testid={ `admin_manage__element-user-table-email-${index}` }>
        {email}
      </td>

      <td data-testid={ `admin_manage__element-user-table-role-${index}` }>
        {role}
      </td>

      <td data-testid={ `admin_manage__element-user-table-remove-${index}` }>
        <button onClick={ () => console.log('opa') } type="button">Excluir</button>
      </td>
    </tr>
  );
}

UserBox.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
}.isRequired;
