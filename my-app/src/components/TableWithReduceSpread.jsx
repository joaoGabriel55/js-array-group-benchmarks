import { useMemo } from 'react';
import dataset from '../cities.json';

function reduceWithSpread(predicate) {
  return dataset.reduce((curr, next) => {
    const groupKey = predicate(next);

    return { ...curr, [groupKey]: [...(curr[groupKey] ?? []), next] };
  }, {});
}

export default function TableWithReduceSpread() {
  const cities = useMemo(() => {
    console.time('reduceWithSpread')
    const result = reduceWithSpread(({ country }) => country);
    console.timeEnd('reduceWithSpread')
    return Object.entries(result);
  }, [])

  return (
    <div>
      <h1>Render table with reduce with spread</h1>
      {cities.map(([country, cities]) => (
        <div class='country'>
          <b>{country}</b>
          <span>Number of cities: <b>{cities.length}</b></span>
        </div>
      ))}
    </div>
  )
}