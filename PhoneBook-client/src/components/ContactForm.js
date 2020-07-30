import React from 'react';
function ContactForm({ data }) {
    console.log(data)
    if (data.length !== 0) {
        var contactList = data.map((info) => {
            return (

                <li key={info.id}>
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
    return ("fetching....")
}
export default ContactForm