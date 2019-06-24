/* eslint-disable react/prop-types, react/display/name */
import React from 'react';

const Table = ({ columns, items, itemRenderer, onRowClick, children }) => (
  <div>
    <table>
      <thead>
        <tr>
          {columns.map(column => (
            <td key={column.key}>{column.label}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, rowIndex) => (
          <tr key={rowIndex} onClick={event => onRowClick(event, rowIndex)}>
            {columns.map(column => (
              <td key={column.key}>
                {itemRenderer({ rowIndex, columnKey: column.key })}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    {children}
  </div>
);

export default () =>
  jest.mock('@commercetools-frontend/ui-kit', () => ({
    ...require.requireActual('@commercetools-frontend/ui-kit'),
    Table,
  }));
