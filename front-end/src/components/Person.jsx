const Person = ({name, number, deletePerson}) => {
    return (<p>
      {name} {number}
      <button onClick={()=>deletePerson(name)}>delete</button>
    </p>)
    }
    
export default Person