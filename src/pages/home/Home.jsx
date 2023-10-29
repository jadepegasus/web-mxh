import React from 'react'
import LeftSide from '../../components/leftSide/LeftSide'
import './Home.css'
const Home = () => {
    return (
        <div className="Home">
            <LeftSide />
            <div className="postSide">postSide</div>
            <div className="rightSide">rightSide</div>
        </div>
    )
}

export default Home