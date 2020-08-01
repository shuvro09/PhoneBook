import React from 'react';
function contactList({ data }) {
    console.log(data + "form data")
    if (data === undefined)
        return (<p>Loading</p>)
    if (data.length !== 0) {
        var contactList = data.map((info) => {
            return (

                <li key={info._id}>
                    <h3>{info.name}</h3>
                    <small>{info.number}</small>
                </li>

            )
        })
        return (
            <ul>
                {contactList}
            </ul>
        )
    }
    return (<p>No contacts</p>)
}
function FilteredContacts(props) {
    if (props.data.length !== 0) {
        var contactList = props.data.map((info) => {
            return (

                <li key={info._id}>
                    <h3>{info.name}</h3>
                    <small>{info.number}</small>
                </li>

            )
        })
        return (
            <ul>
                {contactList}
            </ul>
        )
    }
    return (<p>No matches found</p>)
}
export default contactList
export { FilteredContacts }