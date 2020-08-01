import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

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
        fetch("http://192.168.1.5:3001", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
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
            <button onClick={() => { history.push("/") }}>Back</button>
            <input type="text" placeholder="enter name" onChange={(e) => {
                //console.log(e.target.value)
                setAddData({ ...addData, name: e.target.value })
            }
            }>

            </input>
            <input type="text" placeholder="enter number" onChange={(e) => {
                //console.log(e.target.value)
                setAddData({ ...addData, number: e.target.value })
            }
            }></input>

            <button onClick={() => { handleChange() }}>Add</button>

        </>
    )
}
export default AddContacts;