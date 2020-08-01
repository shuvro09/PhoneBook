import React, { useEffect, useState } from 'react';
import ContactList, { FilteredContacts } from './components/ContactList.js'
import { Switch, Route, Link } from "react-router-dom";
import AddContacts from './components/AddContacts.js';
function App() {
  const [fdata, setData] = useState()
  const [search, setSearch] = useState()
  useEffect(() => {
    const options = {
      method: "GET",
    }
    const checkError = (response) => {
      if (response.status >= 200 && response.status <= 299)
        return response.json()
      else {
        throw Error(response.statusText)
      }
    }
    fetch("http://192.168.1.5:3001", options)
      .then(checkError)
      .then((data) => { console.log(data); setData(data); })
      //.then(result => {  console.log(result) })
      .catch((err) => { console.log(err) })

  }, [])

  return (
    <div>
      <Switch>
        <Route path="/addContacts">
          <AddContacts fetchdata={{ data: fdata, setfData: setData }} />
        </Route>
        <Route path="/" exact>
          <input type="text" placeholder="enter number" onChange={(e) => {
            if (e.target.value === "")
              setSearch()
            else
              setSearch(fdata.filter(elem => elem.name.includes(e.target.value)))
            //console.log(search)
          }
          }></input>
          <Link to="/addContacts">Add Contact</Link>
          {search !== undefined && fdata.length ?
            <FilteredContacts data={search} fdata={fdata} /> :
            <ContactList data={fdata} />}
        </Route>
      </Switch>

    </div>
  )
}

export default App;
