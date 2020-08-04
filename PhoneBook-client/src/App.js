import React, { useEffect, useState } from 'react';
import ContactList, { FilteredContacts } from './components/ContactList.js'
import { Switch, Route, Link } from "react-router-dom";
import AddContacts from './components/AddContacts.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';


function App() {
  //fdata= fetched data from server
  const [fdata, setData] = useState()
  //search=filtered fdata using user input
  const [search, setSearch] = useState()

  useEffect(() => {
    const options = {
      method: "GET"
    }
    //function for error checking
    const checkError = (response) => {
      if (response.status >= 200 && response.status <= 299)
        return response.json()
      else {
        throw Error(response.statusText)
      }
    }
    //http get request
    fetch("http://192.168.1.7:3001", options)
      .then(checkError)
      .then((data) => { console.log(data); setData(data); })
      //.then(result => {  console.log(result) })
      .catch((err) => { console.log(err) })

  }, [])

  return (
    <div id="app">
      <h1>
        Phonebook
      </h1>
      <Switch>
        {/*route to add contacts page*/}
        <Route path="/addContacts">
          <AddContacts fetchdata={{ data: fdata, setfData: setData }} />
        </Route>
        {/*route to home page*/}
        <Route path="/" exact>
          <div className="searchBar">
            <input className="searchInput" type="text" placeholder="Search contact" onChange={(e) => {
              if (e.target.value === "")
                setSearch()
              else
                setSearch(fdata.filter(elem => elem.name.includes(e.target.value)))
            }
            } />
            <Link to="/addContacts" id="addContactIcon"><FontAwesomeIcon icon={faUserPlus} /></Link>
          </div>

          {
            //if search is not undefined or fetched data length !=0 call filtered Contacts else call normal contacts
            search !== undefined && fdata.length ?
              <FilteredContacts data={search} fdata={fdata} update={setData} updateSearch={setSearch} /> :
              <ContactList data={fdata} update={setData} />
          }

        </Route>
      </Switch>

    </div>
  )
}

export default App;
