import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
function AddContacts(props) {
    const [addData, setAddData] = useState({ name: "", number: "" })
    const [nameError, setNameError] = useState({ state: false, message: "" })
    const [numberError, setNumberError] = useState({ state: false, message: "" })
    const history = useHistory()
    const validate = () => {
        if (addData.name.length === 0) {
            setNameError({ state: true, message: "Name cannot be Empty" })
            return (true)
        }
        if (addData.number.length === 0) {
            setNumberError({ state: true, message: "Phone number cannot be Empty" })
            return (true)
        }
        if (addData.number.length < 10 || addData.number.length > 10) {
            setNumberError({ state: true, message: "Phone number must contain 10 digits only" })
            return (true)
        }
    }
    const handleChange = () => {
        console.log(addData.name)
        if (validate())
            return
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
                        setNameError({ state: false, message: "" })
                        setAddData({ ...addData, name: e.target.value })

                    }
                    } />
                    {nameError.state ? <small style={{ color: "red" }}>{nameError.message}</small> : ""}
                </label>
                <br></br><br></br>
                <label >Number
                <input className="contactFormInput" type="text" name="number" placeholder="enter number" onChange={(e) => {
                        setNumberError({ state: false, message: "" })
                        setAddData({ ...addData, number: e.target.value })
                    }
                    } />
                    {numberError.state ? <small style={{ color: "red" }}>{numberError.message}</small> : ""}
                </label>
                <br></br><br></br>
                {/**button to post data */}
                <button id="addContactButton" onClick={(e) => { e.preventDefault(); handleChange() }}>Add</button>

            </form>
        </>
    )
}
export default AddContacts;