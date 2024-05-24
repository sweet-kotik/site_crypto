import React from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import CryptoJS from "crypto-js";


class Sync_AES extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            encrypted: true,
            showModal: false
        }
        this.handleClose = this.handleClose.bind(this)
        this.AES_Script = this.AES_Script.bind(this)
    }
    render () {
        return (
            <div className="container">
                <h2>{this.state.encrypted ? "Шифровка" : "Дешифровка"}</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Ключ</Form.Label>
                        <Form.Control required type="text" placeholder="Введите ключ" id="AESkey" />
                    </Form.Group><br></br>
                    <Form.Group>
                        <Form.Label>Текст</Form.Label>
                        <Form.Control type="text" id="AESdata" as="textarea" placeholder="Введите текст" />
                    </Form.Group><br></br>
                    <Form.Check 
                        type="switch"
                        id="select-mode"
                        label="Сменить режим"
                        onChange={() => {
                            this.setState({encrypted: !this.state.encrypted});
                            document.getElementById('AESdata').value = "";
                            document.getElementById('AESresult').value = "";
                        }}
                    />
                    <Form.Group>
                        <Form.Label>Результат</Form.Label>
                        <Form.Control type="text" id="AESresult" as="textarea" placeholder="Результат" />
                    </Form.Group>
                    <br></br>
                    <Button variant="primary" type="button" onClick={() => {
                        document.getElementById('AESkey').value.length < 16 ? this.setState({showModal: true}) : this.AES_Script();
                    }}>{this.state.encrypted ? "Шифровать" : "Дешифровать"}</Button>

                </Form>
                <Modal show={this.state.showModal} onHide={this.handleClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            ВНИМАНИЕ!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Ключ должен быть не менее 16 символов!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Закрыть</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
        )
    }

    handleClose = () => this.setState({showModal: false})
    
    AES_Script() {
        let key = CryptoJS.enc.Utf8.parse(document.getElementById('AESkey').value);
        let data = document.getElementById('AESdata').value;
    
        if (this.state.encrypted) {
            const encrypted = CryptoJS.AES.encrypt(data, key, { 
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            document.getElementById('AESresult').value = encrypted.toString();
        }
        else {
            const decrypted = CryptoJS.AES.decrypt(data, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            })
            document.getElementById('AESresult').value = decrypted.toString(CryptoJS.enc.Utf8);
        }
    }
    
}

export default Sync_AES