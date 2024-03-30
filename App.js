

/**  <div id="parent">
*       <div id="child">
*            <h1></h1>
*            <h2></h2>
*       </div>
*       <div id="child2">
*            <h1></h1>
*            <h2></h2>
*       </div>
*    </div> 
*
*/

const parent = React.createElement("div", { id: "parent" },
    [
        React.createElement("div", { id: "child1" },
            [
                React.createElement("h1", { id: "heading" }, "Hello World from React!"),
                React.createElement("h2", { id: "heading" }, "Hello World from React demo!")
            ]
        ),
        React.createElement("div", { id: "child2" },
            [
                React.createElement("h1", { id: "heading" }, "Hello World from React!"),
                React.createElement("h2", { id: "heading" }, "Hello World from React demo!")
            ]
        )
    ]
);

console.log(parent);

const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the heading into the root element
root.render(parent);