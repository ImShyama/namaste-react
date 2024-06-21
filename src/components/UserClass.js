import React from "react"

class UserClass extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 0
        }
    }

    render(){
        const{name, location} = this.props
        const{count} = this.state;
        
        return (
            <div className="user-card">
                <h2>{name}</h2>
                <h3>Location: {location}</h3>
                <h4>Contact: p.shyama96</h4>
                <p>count - {count}</p>
                <button onClick={()=>{
                    this.setState({
                        count: count + 1
                    })
                }}>Count Add</button>
                <button onClick={()=>{
                    this.setState({
                        count: 0
                    })
                }}>Reset</button>
            </div>
        )
    }
}

export default UserClass;