const Filter = ({name, value, onChange}) => {

    return (
      <div>
      filter shown with{" "}
      <input name={name} value={value} onChange={onChange}/>
    </div>
    )
}

export default Filter