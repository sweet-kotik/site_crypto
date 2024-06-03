import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Hash_MD5 from "./Hash-MD5";
import Hash_sha1 from "./Hash-SHA1";
import Hash_sha256 from "./Hash-SHA256";
import Hash_sha512 from "./Hash-SHA512";
import Hash_crc32 from "./Hash-CRC32";


class HashForm extends React.Component {
    render() {
        return (
            <Tabs
                defaultActiveKey="MD5"
                id="hash-tab"
                className="mb-5"
                justify
            >
                <Tab eventKey="MD5" title="MD5">
                    <Hash_MD5 />
                </Tab>
                <Tab eventKey="SHA-1" title="SHA-1">
                    <Hash_sha1 />
                </Tab>
                <Tab eventKey="SHA-256" title="SHA-256">
                    <Hash_sha256 />
                </Tab>
                <Tab eventKey="SHA-512" title="SHA-512">
                    <Hash_sha512 />    
                </Tab>
                <Tab eventKey="CRC32" title="CRC32">
                    <Hash_crc32 />
                </Tab>
            </Tabs>
        )
    }
}

export default HashForm;