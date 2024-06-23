import { useEffect, useState } from "react"

const User = () => {
    const [userInfo, setUserInfo] = useState({name:"Dummy Name", location:"Someware else"});

    useEffect(()=>{
        getUserInfo()
    },[])

    const getUserInfo = async() =>{
        const response = await fetch(`https://api.github.com/users/Imshyama`)
        const json = await response.json();
        setUserInfo(json)
    }

    const{name,location,avatar_url} = userInfo;

    return (
        <div className="user-card">
            <img src={avatar_url} />
            <h2>Name: {name}</h2>
            <h3>Location: {location}</h3>
            <h4>Contact: p.shyama96111</h4>
        </div>
    )
}

export default User