const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      <ul>
        {persons.map(person =>
          <li key={person.id}> 
            {person.name} - {person.number} 
            <button value={person.id} onClick={handleDelete}>delete</button>
          </li> 
        )}
      </ul>
    </div>
  )
}

export default Persons