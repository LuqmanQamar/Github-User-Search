import React from 'react'
import '../Home-page/Home.css'
import { useState, useEffect } from 'react'
import User from '../Single-User/User'
import axios from 'axios'

function Home() {
    const [inputData, setInputData] = useState("")
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)



    const onChangeValue = (e) => {
        setInputData(e.target.value)
    }

    const searchUser = async (e) => {
        e.preventDefault();
        if (inputData) {
            const items = await fetchUser();
            setUsers(items)
        }

    }

    const fetchUser = async () => {
        // Destructure the api to get only the data from response
        const { data } = await axios.get('https://api.github.com/search/users?q=' + inputData, { params: { page } });
        console.log(data)
        return data?.items;

    }

    // Pagination Functions

    const handlePrevClick = () => {

        if (page === 1) {
            return page;

        }
        else {
            setPage(page => page - 1)
        }
    }

    const handleNextClick = () => {

        setPage(page => page + 1)

    }

    useEffect(() => {
        const displayPage = async () => {
            if (inputData) {
                const items = await fetchUser();
                setUsers(items)
            }
        }
        displayPage()
        // eslint-disable-next-line
    }, [page]);



    return (
        <div className='.container'>
            <div className="form">
                <h2>Search Github User Name</h2>
                <form>
                    <input type="text" value={inputData} onChange={onChangeValue} />
                    <button onClick={searchUser}>Search</button>
                </form>
            </div>
            <div className="results">
                <div className="pagination">
                    <button onClick={handlePrevClick}>&laquo; Prev</button>
                    <button onClick={handleNextClick}>Next &raquo;</button>
                </div>
                {users?.map((user) => {
                    return (
                        <User user={user} key={user.id} />)
                })}
            </div>
        </div>

    )
}

export default Home
