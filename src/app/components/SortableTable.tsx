import React, { useState } from 'react';
import { StockedLake, StockedLakesDataProps } from '../hooks/useApiData';
const SortableTable: React.FC<StockedLakesDataProps> = ({ data, formatDate }) => {
  const [sortedData, setSortedData] = useState<StockedLake[]>(data);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortData = (field: keyof StockedLake) => {
    const newData = [...sortedData];
    newData.sort((a, b) => {
      if (a[field] < b[field]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setSortedData(newData);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => sortData('date')}>Date</th>
          <th onClick={() => sortData('hatchery')}>Hatchery</th>
          <th onClick={() => sortData('lake')}>Lake</th>
          <th onClick={() => sortData('species')}>Species</th>
          <th onClick={() => sortData('stocked_fish')}>Stocked Fish</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedData && sortedData.map((lake, index) => (
          <tr key={index}>
            <td>{formatDate(lake.date)}</td>
            <td>{lake.hatchery}</td>
            <td>{lake.lake}</td>
            <td>{lake.species}</td>
            <td>{lake.stocked_fish}</td>
            <td>
              <a href={lake.directions} target="_blank" rel="noreferrer">Directions</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
