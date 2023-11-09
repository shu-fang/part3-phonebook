const Notification = ({ message }) => {
    const notificationStyle = {
        color: 'green',  
        fontSize: 30,
    }

    if (message === null) {
      return null
    }

    return (
      <div className='error' style={notificationStyle}>
        {message}
      </div>
    )
  }

export default Notification