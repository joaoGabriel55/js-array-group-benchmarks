import { useMemo } from 'react';
import dataset from '../cities.json';

function reduceWithoutSpread(predicate) {
  return dataset.reduce((curr, next) => {
    const groupKey = predicate(next);
    const groupValue = curr[groupKey] ?? [];

    groupValue.push(next);

    curr[groupKey] = groupValue;

    return curr;
  }, {});
}

export default function TableWithoutReduceSpread() {
  const cities = useMemo(() => {
    console.time('reduceWithoutSpread')
    const result = reduceWithoutSpread(({ country }) => country);
    console.timeEnd('reduceWithoutSpread')

    return Object.entries(result);
  }, [])

  return (
    <div>
      <h1>Render table with reduce without spread</h1>
      {cities.map(([country, cities]) => (
        <div class='country'>
          <b>{country}</b>
          <span>Number of cities: <b>{cities.length}</b></span>
        </div>
      ))}
    </div>
  )
}