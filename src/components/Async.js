import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Async_RSA from "./Async-RSA";
import Async_ECC from "./Async-ECC";

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

                </Tab>
                <Tab eventKey="Paillier Cryptosystem" title="Paillier Cryptosystem">
  
                </Tab>
                <Tab eventKey="McElice Cryptosystem" title="McElice Cryptosystem">

                </Tab>
            </Tabs>
        )
    }
}

export default Async