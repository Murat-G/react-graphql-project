import { Select, Input, Typography } from "antd";
interface SearchSectionProps {
  sortedValue: string;
  setSortedValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}
const SearchSection: React.FC<SearchSectionProps> = ({
  sortedValue,
  setSortedValue,
  searchValue,
  setSearchValue,
}) => {
  const { Option } = Select;

  const onChangeSearch = (value: string) => {
    setSearchValue(value)
  };
  return (
    <div
      style={{
        width: "100%",
        height: "30rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography.Title level={3}>Search</Typography.Title>
      <Input
        placeholder="Search by name"
        onChange={(e) => onChangeSearch(e.target.value)}
        maxLength={30}
        size="large"
        style={{ width: "50%" }}
        value={searchValue}
      />
      <div
        style={{
          display: "flex",
          width: "50%",
          marginTop: "2rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <label
          style={{ marginRight: "1rem", fontWeight: "bold" }}
          htmlFor="inputGroupSelect01"
        >
          Filter By Gender
        </label>
        <Select
          id="inputGroupSelect01"
          style={{ width: "75%" }}
          placeholder="Sort By"
          onChange={(e) => setSortedValue(e)}
          size="large"
          value={sortedValue}
        >
          <Option value=""> None </Option>
          <Option value="Male"> Male </Option>
          <Option value="Female"> Female </Option>
        </Select>
      </div>
    </div>
  );
};

export default SearchSection;
