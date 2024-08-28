const Persons = ({ persons, onClick }) => {
    return (
      <table>
        <tbody>
          {persons.map((person) => (
            <tr key={person.id}>
              <td>
                {person.name} {person.number}{" "}
                <button onClick={() => onClick(person.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Persons;
  