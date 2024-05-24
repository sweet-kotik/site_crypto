import React from "react";
import CryptoJS from "crypto-js";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from "react-bootstrap/Modal";

class Sync_3DES extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            encrypted: true,
            showModal: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.Script_3DES = this.Script_3DES.bind(this)
    }
    render() {
        return (
            <div className="container">
                <h2>{this.state.encrypted ? "Шифровка" : "Дешифровка"}</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Ключ</Form.Label>
                        <Form.Control required type="text" placeholder="Введите ключ" id="3DESkey" />
                    </Form.Group><br></br>
                    <Form.Group>
                        <Form.Label>Текст</Form.Label>
                        <Form.Control type="text" id="3DESdata" as="textarea" placeholder="Введите текст" />
                    </Form.Group><br></br>
                    <Form.Check 
                        type="switch"
                        id="select-mode"
                        label="Сменить режим"
                        onChange={() => {
                            this.setState({encrypted: !this.state.encrypted});
                            document.getElementById('3DESdata').value = "";
                            document.getElementById('3DESresult').value = "";
                        }}
                    />
                    <Form.Group>
                        <Form.Label>Результат</Form.Label>
                        <Form.Control type="text" id="3DESresult" as="textarea" placeholder="Результат" />
                    </Form.Group>
                    <br></br>
                    <Button variant="primary" type="button" onClick={() => {
                        document.getElementById('3DESkey').value.length < 24 ? this.setState({showModal: true}) : this.Script_3DES();
                    }}>{this.state.encrypted ? "Шифровать" : "Дешифровать"}</Button>

                </Form>
                <Modal show={this.state.showModal} onHide={this.handleClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            ВНИМАНИЕ!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Ключ должен быть не менее 24 символов!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Закрыть</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    handleClose = () => this.setState({showModal: false})

    Script_3DES() {
        let key = CryptoJS.enc.Utf8.parse(document.getElementById('3DESkey').value);
        let data = document.getElementById('3DESdata').value;

        if (this.state.encrypted) {
            let encrypted3DES = CryptoJS.TripleDES.encrypt(data, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            })
            document.getElementById('3DESresult').value = encrypted3DES.toString();
        }
        else {
            let decrypted3DES = CryptoJS.TripleDES.decrypt(data, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            })
            document.getElementById('3DESresult').value = decrypted3DES.toString(CryptoJS.enc.Utf8)
        }
    }
}

export default Sync_3DES