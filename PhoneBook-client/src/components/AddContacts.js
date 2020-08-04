import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
function AddContacts(props) {
    const [addData, setAddData] = useState({ name: "initial", number: "initial" })
    const history = useHistory()
    const handleChange = () => {
        console.log(addData.name)

        if (addData.name === "initial" || addData.number === "initial") {
            return
        }
        const checkError = (response) => {
            if (response.status >= 200 && response.status <= 299)
                return response.json()
            else {
                throw Error(response.statusText)
            }
        }
        fetch("http://192.168.1.7:3001", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addData)
        })
            .then(checkError)
            .then((data) => { props.fetchdata.setfData([...props.fetchdata.data, data]); console.log(data) })
            .catch((err) => { console.log(err) })
        history.push("/")
    }
    return (
        <>
            {/**link back to homepage */}
            <Link to="/"><FontAwesomeIcon icon={faArrowLeft} /></Link>
            <form>
                <label >Name
                <input className="contactFormInput" type="text" placeholder="enter name" name="name" onChange={(e) => {
                        setAddData({ ...addData, name: e.target.value })
                    }
                    } />
                </label>
                <br></br><br></br>
                <label >Number
                <input className="contactFormInput" type="text" name="number" placeholder="enter number" onChange={(e) => {
                        setAddData({ ...addData, number: e.target.value })
                    }
                    } />
                </label>
                <br></br><br></br>
                {/**button to post data */}
                <button id="addContactButton" onClick={(e) => { e.preventDefault(); handleChange() }}>Add</button>

            </form>
        </>
    )
}
export default AddContacts;