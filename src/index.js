import React from "react"
import * as ReactDOMClient from "react-dom/client"
import App from "./App"
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

const app = ReactDOMClient.createRoot(document.getElementById("app"))

app.render(<App />)