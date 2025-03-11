UFPlanner SWE project

Dependencies:
Install Node.js from "https://nodejs.org/en/download"
I am on version 11

Make sure you have vite version 16.0.11 installed.
You can do this by running "npm install vite@16.0.11" after installing Node

Run the project:
1. copy the https (or ssh if you have it setup) using the code button on the main github branch
2. Go into terminal on vscode (or whatever environment you would like to use) and run 
"git clone --copied link--" 
3. Once it is done installing in your environment run 
"cd UFPlanner1" (or whatever your branch is named) and "npm install"
4. Open two terminals. In one run
"cd frontend", "npm install"
4. To run the project type in the non frontend terminal
"npm start"
and
"npm run dev"
In the frontend terminal
5. Vite should run and you should see a clickable localhost link
6. Click this link to see the project


Environment Setup:
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
lauren 
