import { useState, useEffect } from "react";
import personService from "./services/person";
import Person from "./components/Person";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const PersonForm = ({
  addNewPerson,
  handleNameChange,
  newName,
  handleNumberChange,
  newNumber,
}) => {
  return (
    <form onSubmit={addNewPerson}>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const PersonList = ({ filteredPersons, deletePerson }) => {
  return (
    <ul>
      {filteredPersons.map((person) => {
        return (
          <li key={person.name}>
            <Person
              name={person.name}
              number={person.number}
              deletePerson={deletePerson}
            />
          </li>
        );
      })}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  const hook = () => {
    console.log("effect");
    personService.getAll().then((returnedPerson) => setPersons(returnedPerson));
  };

  useEffect(hook, []);

  console.log("render", persons.length, "persons", persons);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchTerm = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    const person = persons.find((person) => person.name === newName);
    const updatedPerson = { name: newName, number: newNumber };

    if (!person) {
      personService.create(updatedPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessage(`Successfully added ${newName}`);
      });
    } else if (window.confirm(`Update existing phone number for ${newName}?`)) {
      personService
        .updatePerson(person.id, updatedPerson)
        .then(() => {
          const updatedPersons = persons.map((person) =>
            person.name === newName
              ? { name: newName, number: newNumber }
              : person
          );
          setPersons(updatedPersons);
          setMessage(`Successfully updated number for ${newName}`);
        })
        .catch((error) => {
          console.log("failed");
          setMessage(
            `${newName}'s information has already been removed from the system`
          );
        });
    }

    setNewNumber("");
    setNewName("");
  };

  const filteredPersons = persons.filter((person) =>
    person.name.includes(searchTerm)
  );

  const deletePerson = (name) => {
    if (!window.confirm(`delete ${name}?`)) {
      return;
    }
    const person = persons.find((person) => person.name === name);
    console.log("person to delete:", person.id);
    personService.deletePerson(person.id).then(() => {
      const updatedPersons = persons.filter((person) => person.name != name);
      setPersons(updatedPersons);
    });
  };

  return (
    <div>
      <p>"hello"</p>
      <Notification message={message} />
      <h2>Phonebook</h2>
      <Filter
        onChange={handleSearchTerm}
        handleSearchTerm={handleSearchTerm}
        searchTerm={searchTerm}
      />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addNewPerson}
        addNewPerson={addNewPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <PersonList
        filteredPersons={filteredPersons}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
