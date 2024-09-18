import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";
import Notification from "./components/Notification";
import ErrorNotification from "./components/ErrorNotification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "newName") setNewName(value);
    if (name === "newNumber") setNewNumber(value);
    if (name === "filter") setFilter(value);
  };

  const changeNumber = (id) => {
    const person = persons.find((person) => person.id === id);
    const confirmChange = window.confirm(
      `${newName} is already added to the phonebook, replace the old number with a new one?`
    );
  
    if (confirmChange) {
      const changedPerson = { ...person, number: newNumber };
  
      personsService
        .update(id, changedPerson)
        .then((returnedPerson) => {
          setPersons(persons.map((person) => (person.id === id ? returnedPerson : person)));
        })
        .catch((error) => {
          setErrorMessage(`'${person.name}' was already removed from server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        });
    }
  };


  const addName = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      changeNumber(existingPerson.id);
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: (persons.length + 1).toString(),
      };
      personsService
      .create(nameObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setSuccessMessage(`'Added ${returnedPerson.name}'`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(`${error.response.data.error}`)
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const removeName = (id) => {
    const personToRemove = persons.find((person) => person.id === id);

    if (personToRemove) {
      const confirmRemoval = window.confirm(`Delete ${personToRemove.name}?`);

      if (confirmRemoval) {
        personsService
          .remove(personToRemove.id)
          .then(() => {
            setPersons(persons.filter((person) => person.id !== id));
          })
          .catch((error) => {
            setErrorMessage(
              `'${personToRemove.name}' was already removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          });
      }
    }
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      {successMessage && <Notification message={successMessage}/>}
      {errorMessage && <ErrorNotification message={errorMessage}/>}
      <Filter name={"filter"} value={filter} onChange={handleInputChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addName}
        newName={newName}
        newNumber={newNumber}
        handleInputChange={handleInputChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} onClick={removeName} />
    </div>
  );
};

export default App;
