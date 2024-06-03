import React from "react"
import NavbarSite from "./components/Navbar";
import Main from "./components/Main";
import Sync from "./components/Sync"
import Async from "./components/Async";
import HashForm from "./components/Hash";
import ECP_dsa from "./components/DSA";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Router>
                    <NavbarSite />
                    <main role="main">
                        <Routes>
                            <Route path="/" element={<Main />} />
                            <Route path="/sync" element={<Sync />} />
                            <Route path="/async" element={<Async />} />
                            <Route path="/hash" element={<HashForm />} />
                            <Route path="/ecpdsa" element={<ECP_dsa />} />
                        </Routes>
                    </main>
            </Router>
        )
    }
}

export default App