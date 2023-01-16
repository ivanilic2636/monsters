import "./App.css";
import { useEffect, useState } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [filteredMonsters, setFilteredMonsters] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        //moje resenje za promenu state-a nakon searcha this.monsterList = data;
        setMonsters(data);
      });
  }, []);

  useEffect(() => {
    let newFilteredMonsters = monsters.filter((monster) => {
      return monster.name
        .toLocaleLowerCase()
        .includes(searchField.toLocaleLowerCase());
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  let onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Universe</h1>
      <SearchBox
        placeholder="search box"
        className="monsters-search-box"
        onChangeHandler={onSearchChange}
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

//CLASS COMPONENT
// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }

//   //pokrece se prvi i jedini put kada se komponenta instancira u DOM-u
//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((data) => {
//         //moje resenje za promenu state-a nakon searcha this.monsterList = data;

//         this.setState(() => {
//           return { monsters: data };
//         });
//       });
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchField };
//     });
//   };

//   render() {
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;
//     //Njihovo resenje
//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });
//     return (
//       <div className="App">
//         <h1 className="app-title">Monsters Universe</h1>
//         <SearchBox placeholder="search box" className="monsters-search-box" onChangeHandler={onSearchChange} />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
