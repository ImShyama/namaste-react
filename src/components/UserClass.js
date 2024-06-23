import React from "react"

class UserClass extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userInfo: {
                name: "John Doe",
                location: "Defult",
                avatar_url: "",
            }
        }
    }

    async componentDidMount(){
        // Api calls

        const data =  await fetch("https://api.github.com/users/Imshyama");
        const json = await data.json();

        this.setState({
            userInfo: json
        })
        console.log(json)
    }

    componentDidUpdate(){
        console.log("Component Did Update")
    }

    componentWillUnmount(){
        console.log("Component Will Unmount")
    }

    render(){
        const{name, location, avatar_url} = this.state.userInfo
        
        return (
            <div className="user-card">
                <img src={avatar_url} alt={name} />
                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>
                <h4>Contact: p.shyama96</h4>
                
            </div>
        )
    }
}

export default UserClass;