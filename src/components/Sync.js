import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Sync_AES from "./Sync-AES";
import Sync_3DES from "./Sync-3DES"
import Sync_RC4 from "./Sync-RC4";
import Sync_BF from "./Sync-BF";
import Sync_DES from "./Sync-DES";


class SyncForm extends React.Component {
    render() {
        return (
            <Tabs
                defaultActiveKey="AES"
                id="sync-tab"
                className="mb-5"
                justify
            >
                <Tab eventKey="AES" title="AES">
                    <Sync_AES />
                </Tab>
                <Tab eventKey="3DES" title="3DES">
                    <Sync_3DES />
                </Tab>
                <Tab eventKey="Blowfish" title="Blowfish">
                    <Sync_BF />
                </Tab>
                <Tab eventKey="RC4" title="RC4">
                    <Sync_RC4 />    
                </Tab>
                <Tab eventKey="DES" title="DES">
                    <Sync_DES />
                </Tab>
            </Tabs>
        )
    }
}

export default SyncForm