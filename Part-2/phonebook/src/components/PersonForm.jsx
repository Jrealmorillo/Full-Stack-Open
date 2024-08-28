const PersonForm = ({
    onSubmit,
    newName,
    newNumber,
    handleInputChange
  }) => {
    return (
      <form onSubmit={onSubmit}>
        <div>
          name:{" "}
          <input name="newName" value={newName} onChange={handleInputChange} />
        </div>
        <div>
          number:{" "}
          <input
            name="newNumber"
            value={newNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
  };

  export default PersonForm