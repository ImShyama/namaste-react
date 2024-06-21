import { useState } from "react"

const User = ({name}) => {
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(2);
    return (
        <div className="user-card">
            <h2>{name}</h2>
            <h3>Location: Nepal</h3>
            <h4>Contact: p.shyama96</h4>
            <p>count - {count}</p>
            <p>count2 - {count2}</p>
        </div>
    )
}

export default User