import { useState } from "react";
import AppHeader from "./components/layout/header";
import SearchSection from "./components/main/SearchSection";
import PeopleTable from "./components/main/PeopleTable";
function App() {
  const [sortedValue, setSortedValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <div>
      <AppHeader />
      <SearchSection
        sortedValue={sortedValue}
        setSortedValue={setSortedValue}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <PeopleTable searchValue={searchValue} sortedValue={sortedValue} />
    </div>
  );
}

export default App;
