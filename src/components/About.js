import React from "react";
import User from "./User";
import UserClass from "./UserClass";
import UserContext from "../utils/UserContext";

class About extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){


    }

    render(){
        return(
            <div>
            <h1>About Us</h1>
            <div>
                LoggedIn User
                <UserContext.Consumer>
                    {({loggedInUser})=> (
                        <h2 className="font-bold">{loggedInUser}</h2>
                        )}
                </UserContext.Consumer>
            </div>
            <h2>This is Shyama About Us</h2>
            <User name={"Shyama Pandit (function)"}/>
            {/* <UserClass name={"Shyama Pandit (class)"} location={"Dehradun class"}/> */}
            {/* <UserClass name={"Shyamanand Pandit (class)"} location={"Dehradun class"}/> */}
        </div>
        )
    }
}



export default About;