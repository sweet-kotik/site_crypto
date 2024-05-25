import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

class Async extends React.Component {
    render() {
        return(
            <Tabs
                defaultActiveKey="AES"
                id="sync-tab"
                className="mb-5"
                justify
            >
                <Tab eventKey="RSA" title="RSA">

                </Tab>
                <Tab eventKey="ECC" title="ECC">

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