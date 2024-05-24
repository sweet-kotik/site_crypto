import React from "react";
import CryptoJS from "crypto-js";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from "react-bootstrap/Modal";

class Sync_RC4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            encrypted: true,
            showModal: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.Script_RC4 = this.Script_RC4.bind(this);
    }
    render() {
        return(
            <div className="container">
                <h2>{this.state.encrypted ? "Шифровка" : "Дешифровка"}</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Ключ</Form.Label>
                        <Form.Control required type="text" placeholder="Введите ключ" id="RC4key" />
                    </Form.Group><br></br>
                    <Form.Group>
                        <Form.Label>Текст</Form.Label>
                        <Form.Control type="text" id="RC4data" as="textarea" placeholder="Введите текст" />
                    </Form.Group><br></br>
                    <Form.Check 
                        type="switch"
                        id="select-mode"
                        label="Сменить режим"
                        onChange={() => {
                            this.setState({encrypted: !this.state.encrypted});
                            document.getElementById('RC4data').value = "";
                            document.getElementById('RC4result').value = "";
                        }}
                    />
                    <Form.Group>
                        <Form.Label>Результат</Form.Label>
                        <Form.Control type="text" id="RC4result" as="textarea" placeholder="Результат" />
                    </Form.Group>
                    <br></br>
                    <Button variant="primary" type="button" onClick={() => {
                        document.getElementById('RC4key').value.length < 10 ? this.setState({showModal: true}) : this.Script_RC4();
                    }}>{this.state.encrypted ? "Шифровать" : "Дешифровать"}</Button>

                </Form>
                <Modal show={this.state.showModal} onHide={this.handleClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            ВНИМАНИЕ!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Ключ должен быть не менее 10 символов!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Закрыть</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    handleClose = () => this.setState({showModal: false})

    Script_RC4() {
        let key = CryptoJS.enc.Utf8.parse(document.getElementById('RC4key').value);
        let data = document.getElementById('RC4data').value;

        if (this.state.encrypted) {
            let encryptedRC4 = CryptoJS.RC4.encrypt(data, key);
            document.getElementById('RC4result').value = encryptedRC4.toString();
        }
        else {
            let decryptedRC4 = CryptoJS.RC4.decrypt(data, key);
            document.getElementById('RC4result').value = decryptedRC4.toString(CryptoJS.enc.Utf8);
        }
    }
}

export default Sync_RC4