import { Table, Modal, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import { EditFilled } from "@ant-design/icons";
import ExportToExcel from "../export/ExportToExcel";
interface SearchSectionProps {
  sortedValue: string;
  searchValue: string;
}
interface Person {
  name: string;
  gender: string;
  eyeColor: string;
  [key: string]: string;
}

interface PeopleData {
  allPeople: {
    totalCount: number;
    people: Person[];
  };
}

const client = new ApolloClient({
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  cache: new InMemoryCache(),
});

const AllPeopleQuery = gql`
  query AllPeople {
    allPeople {
      totalCount
      people {
        name
        gender
        eyeColor
      }
    }
  }
`;

const PeopleTable: React.FC<SearchSectionProps> = ({
  sortedValue,
  searchValue,
}) => {
  const { loading, error, data } = useQuery<PeopleData>(AllPeopleQuery, {
    client,
  });
  const [people, setPeople] = useState<Person[]>([]);
  const [visible, setVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [filteredPeople, setFilteredPeople] = useState<Person[] | null>(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    if (error) {
      message.error("Error fetching data");
      setLoader(false);
    } else if (data) {
      const { people } = data.allPeople;
      setPeople(people);
      setLoader(false);
    }
  }, [loading, error, data]);

  const showModal = (person: Person) => {
    setSelectedPerson(person);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
    setSelectedPerson(null);
  };

  useEffect(() => {
    let filteredList = [...people];

    if (searchValue && filteredList?.length) {
      filteredList = filteredList.filter((person) =>
        person.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    if (sortedValue && filteredList?.length) {
      filteredList = filteredList.filter(
        (person) => person.gender.toLowerCase() === sortedValue.toLowerCase()
      );
    }
    setFilteredPeople(filteredList);
  }, [sortedValue, searchValue, people]);

  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      render: (text: string, record: Person) => (
        <p onClick={() => showModal(record)} style={{ cursor: "pointer" }}>
          {text} <EditFilled />
        </p>
      ),
    },
    {
      key: "gender",
      title: "Gender",
      dataIndex: "gender",
    },
    {
      key: "eyeColor",
      title: "Eye Color",
      dataIndex: "eyeColor",
    },
  ];

  return (
    <Spin spinning={loader}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <ExportToExcel
          data={searchValue || sortedValue ? filteredPeople || [] : people}
        />
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={
            searchValue || sortedValue ? filteredPeople || [] : people
          }
        />
        <Modal
          title={selectedPerson?.name}
          open={visible}
          onCancel={handleClose}
          footer={null}
        >
          {selectedPerson && (
            <div>
              <p>Gender: {selectedPerson.gender}</p>
              <p>Eye Color: {selectedPerson.eyeColor}</p>
            </div>
          )}
        </Modal>
      </div>
    </Spin>
  );
};

export default PeopleTable;
