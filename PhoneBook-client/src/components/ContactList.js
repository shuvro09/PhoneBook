import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import fetchData from '../fetchData.js'
//data=fetched data, search=filtered data, update=set Fetched data , updateSearch=setSearch
const handleDelete = (id, data, update, search, updateSearch) => {
    //http delete request
    fetchData("DELETE", 'application/json', JSON.stringify({ id: id }))
        .then(response => response.json())
        .then(res => {
            if (res.deletedCount) {
                update(data.filter((elem) => elem._id !== id));

                //checks if the delete button was clicke from inside contactList or filteredContactList
                if (updateSearch !== undefined)
                    updateSearch(search.filter((elem) => elem._id !== id))
            }
            else {
                console.log("could not find data")
            }
        })
        .catch(error => { console.log(error); })
}

//component for showing the entire data 
// data=fetched data , update=set fetch data
function contactList({ data, update }) {
    console.log(data + "form data")
    if (data === undefined)
        return (<p>Loading</p>)
    if (data.length !== 0) {
        const contactList = data.map((info) => {
            return (

                <li className="contact" key={info._id}>
                    <h3>{info.name}</h3>
                    <small>{info.number}</small>
                    <FontAwesomeIcon className="deleteIcon"
                        onClick={(e) => {
                            handleDelete(info._id, data, update)
                        }} icon={faTrashAlt} />
                </li>

            )
        })
        return (
            <ul className="contactList">
                {contactList}
            </ul>
        )
    }
    return (<p>No contacts</p>)
}
function FilteredContacts(props) {
    if (props.data.length !== 0) {
        const contactList = props.data.map((info) => {
            return (

                <li className="contact" key={info._id}>
                    <h3>{info.name}</h3>
                    <small>{info.number} </small>
                    <FontAwesomeIcon className="deleteIcon" onClick={(e) => {
                        handleDelete(info._id, props.fdata, props.update, props.data, props.updateSearch)
                    }} icon={faTrashAlt} />
                </li>

            )
        })
        return (
            <ul className="contactList">
                {contactList}
            </ul>
        )
    }
    return (<p>No matches found</p>)
}
export default contactList
export { FilteredContacts }