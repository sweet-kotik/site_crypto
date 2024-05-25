import React from "react"
import NavbarSite from "./components/Navbar";
import Main from "./components/Main";
import Sync from "./components/Sync"
import Async from "./components/Async";
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
                        </Routes>
                    </main>
            </Router>
        )
    }
}

export default App