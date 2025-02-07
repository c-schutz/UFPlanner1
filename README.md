UFPlanner SWE project

Install Guide:
1. run "npm install vite@6.0.11"
2. Edit your package.json to contain this
{
  "dependencies": {
    "vite": "^6.0.11"
  },
  "scripts": {
  "dev": "vite"
}
}

3. run "npm create vite frontend --template" and then choose React and then Javascript
4. follow the commands in terminal
5. Check to make sure the localhost is running properly by clicking the localhost link. You should see a vite and react logo above a count button
(The next instructions mostly follow this tutorial https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/)
6. Now open a new terminal and run "npm init -y"
7. Create a folder named server on the same level as frontend
8. Put a file named index.js in the server folder
9. run "npm i express"
10. in the package.json file in the root folder add this code

"scripts": {
  "start": "node server/index.js"
},

11. Add the following code in the scripts section of your package.json file in the root folder
"start": "node server/index.js"

12. Redo your index.js folder like this

// client/src/App.js

import {React, useEffect, useState} from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;

13. run npm install cors in your server folder
In your server/index.js use this code

const express = require("express");
const cors = require("cors"); // Import the CORS package

const PORT = process.env.PORT || 3001;
const app = express();

// Enable CORS for all routes
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

14. To run the environment have two terminals open
cd into server on one and run "npm start"
then cd into frontend and run "npm run dev" 
open the localhost to see the website which should update on saves
