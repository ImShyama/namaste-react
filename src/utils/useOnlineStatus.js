import { useEffect, useState } from "react";

const useOnlineStatus = () => {

    const [onlineStatus, setOnlineStates] = useState(true);
    // check if online

    useEffect(()=>{
        window.addEventListener("offline", ()=>{
            setOnlineStates(false);
        })

        window.addEventListener("online", ()=>{
            setOnlineStates(true);
        })
    },[])


    // boolean value
    return onlineStatus;
}

export default useOnlineStatus;