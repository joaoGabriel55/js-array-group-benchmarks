import { Suspense, lazy, useCallback, useState } from "react";
import "./App.css";

const TableWithOnlyLoop = lazy(() => import("./components/TableWithOnlyLoop"));
const TableWithReduceSpread = lazy(() =>
  import("./components/TableWithReduceSpread")
);
const TableWithoutReduceSpread = lazy(() =>
  import("./components/TableWithoutReduceSpread")
);

const pages = {
  TableWithReduceSpread: false,
  TableWithoutReduceSpread: false,
  TableWithOnlyLoop: false,
};

function App() {
  const [tableSwitcher, setTableSwitcher] = useState({
    ...pages,
    TableWithReduceSpread: true,
  });

  const switchTable = useCallback((table) => {
    setTableSwitcher((state) => {
      return { ...pages, [table]: !state[table] };
    });
  }, []);

  return (
    <main>
      <div className="buttons">
        {Object.keys(pages).map((table) => {
          return (
            <button
              key={table}
              onClick={() => {
                if (!tableSwitcher[table]) switchTable(table);
              }}
            >
              {table}
            </button>
          );
        })}
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {tableSwitcher.TableWithReduceSpread && <TableWithReduceSpread />}
        {tableSwitcher.TableWithoutReduceSpread && <TableWithoutReduceSpread />}
        {tableSwitcher.TableWithOnlyLoop && <TableWithOnlyLoop />}
      </Suspense>
    </main>
  );
}

export default App;
