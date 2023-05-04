const Notification = ({ message, error }) => {
    const success = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const failure = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const none = {
        display: 'none'
    }

    const change = (m, e) => {
        if (m !== '' && e === false) {
            return success
        } else if(m !== '' && e === true) {
            return failure
        } else {
            return none
        }
    }

    return (
        <div style={change(message, error)}>
            {message}
        </div>
    )
}

export default Notification