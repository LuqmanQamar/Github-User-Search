import React from 'react'
import { Link } from 'react-router-dom';


const User = ({ user }) => {

    const { avatar_url, login, id } = user;
    return (

        <div className="user">
            <div className="image">
                <img src={avatar_url} alt={login} />
            </div>
            <div className="user-info">
                <h4>{login}</h4>
                <small>ID: {id}</small>
                <Link to={`/user/${login}`}>View Profile</Link>
            </div>
        </div>

    )
}

export default User;
