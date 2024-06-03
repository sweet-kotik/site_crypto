import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Async_RSA from "./Async-RSA";
import Async_ECC from "./Async-ECC";
import Async_NTRU from "./Async-NTRU";
import Async_pal from "./Async-Paillier";
import Async_McElice from "./Async-McElice";

class Async extends React.Component {
    render() {
        return(
            <Tabs
                defaultActiveKey="RSA"
                id="async-tab"
                className="mb-5"
                justify
            >
                <Tab eventKey="RSA" title="RSA">
                    <Async_RSA />
                </Tab>
                <Tab eventKey="Goldwasser-Micali Cryptosystem" title="Goldwasser-Micali Cryptosystem">
                    <Async_ECC />
                </Tab>
                <Tab eventKey="NTRUEncrypt" title="NTRUEncrypt">
                    <Async_NTRU />
                </Tab>
                <Tab eventKey="Paillier Cryptosystem" title="Paillier Cryptosystem">
                    <Async_pal />
                </Tab>
                <Tab eventKey="McElice Cryptosystem" title="McElice Cryptosystem">
                    <Async_McElice />
                </Tab>
            </Tabs>
        )
    }
}

export default Async