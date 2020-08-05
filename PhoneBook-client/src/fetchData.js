function fetchData(method, contentType, body) {
    const options = {
        method: method,
        headers: {
            'Content-Type': contentType,
        },
        body: body
    }

    //http request
    return (fetch("http://192.168.1.5:3001", options))
}
export default fetchData;