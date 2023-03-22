import { useState, useEffect } from "react";
import "./App.css"

export default function App() {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newName, setNewName] = useState(null)
  const [newUser, setNewUser] = useState(null)
  const [newPhone, setNewPhone] = useState(null)
  const [newEmail, setNewEmail] = useState(null)
  const [newCity, setNewCity] = useState(null)
  const [newWebsite, setNewWebsite] = useState(null)
  const [newId, setNewId] = useState(0)
  const [show, setShow] = useState(false)
  

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  },[])

  const handleClick = (e) => {
    setShow(!show)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setNewName(e.target.name.value)
    setNewUser(e.target.username.value)
    setNewPhone(e.target.phone.value)
    setNewEmail(e.target.email.value)
    setNewCity(e.target.city.value)
    setNewWebsite(e.target.website.value)
    setNewId(data.length + 2)
    
    //falta ver como agregar la key
    const people = {
      id: newId,
      name: newName,
      username: newUser,
      phone: newPhone,
      email: newEmail,
      address: {
        city: newCity
      },
      website: newWebsite
    }
    data.unshift(people)

  }

  return (
    <div className="App">
      <h1 className="title">Database - Phone contacts</h1>
      <button className="create-button" onClick={handleClick}>Create new card</button>
      <ul className="list">
        {error && <li> {error} </li>}
        {loading && <li>Loading...</li>}
        
        {show && <form className="list-container form" onSubmit={handleSubmit}>
          <li className="list__names li">Name: <input type="text" name="name" required></input> </li>
          <li className="list__username li"> Username: <input type="text" name="username" required></input> </li>
          <li className="list__phone li"> Phone: <input type="tel" name="phone" required></input> </li>
          <li className="list__emails li"> Email: <input type="email" name="email" required></input> </li>
          <li className="list__adress li"> City: <input type="text" name="city" required></input> </li>
          <li className="list__website li"> Website: <input type="text" name="website" required></input> </li>
          <li className="list__button li"> <button type="submit" className="save">Create</button> </li>
        </form>}

        {data?.map(user => (
          <div key={user.id || newId} className="list-container">
            <li className="list__names info"> {user.name || newName} </li>
            <li className="list__username info"> Username: {user.username || newUser} </li>
            <li className="list__phone info"> Phone: {user.phone || newPhone} </li>
            <li className="list__emails info"> Email: {user.email || newEmail} </li>
            <li className="list__adress info"> City: {user.address.city || newCity} </li>
            <li className="list__website info"> Website: {user.website || newWebsite} </li> 
          </div>
        ))}
      </ul>
    </div>
  );
}
