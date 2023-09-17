import { useMemo } from 'react';
import dataset from '../cities.json';

function justLoop(predicate) {
  const group = {};

  // @ts-ignore
  for (let i = 0; i < dataset.length; i++) {
    const element = dataset[i];
    const groupKey = predicate(element);
    const groupValue = group[groupKey] ?? [];

    groupValue.push(element);

    group[groupKey] = groupValue;
  }

  return group;
}

export default function TableWithOnlyLoop() {
  const cities = useMemo(() => {
    console.time('justLoop')
    const result = justLoop(({ country }) => country);
    console.timeEnd('justLoop')
    return Object.entries(result);
  }, [])

  return (
    <div>
      <h1>Render table with only loop</h1>
      {cities.map(([country, cities]) => (
        <div class='country'>
          <b>{country}</b>
          <span>Number of cities: <b>{cities.length}</b></span>
        </div>
      ))}
    </div>
  )
}