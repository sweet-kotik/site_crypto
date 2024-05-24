import React from "react";
import CryptoJS from "crypto-js";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from "react-bootstrap/Modal";

class Sync_BF extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            encrypted: true,
            showModal: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.Script_BF = this.Script_BF.bind(this);
    }
    render() {
        return(
            <div className="container">
                <h2>{this.state.encrypted ? "Шифровка" : "Дешифровка"}</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Ключ</Form.Label>
                        <Form.Control required type="text" placeholder="Введите ключ" id="BFkey" />
                    </Form.Group><br></br>
                    <Form.Group>
                        <Form.Label>Текст</Form.Label>
                        <Form.Control type="text" id="BFdata" as="textarea" placeholder="Введите текст" />
                    </Form.Group><br></br>
                    <Form.Check 
                        type="switch"
                        id="select-mode"
                        label="Сменить режим"
                        onChange={() => {
                            this.setState({encrypted: !this.state.encrypted});
                            document.getElementById('BFdata').value = "";
                            document.getElementById('BFresult').value = "";
                        }}
                    />
                    <Form.Group>
                        <Form.Label>Результат</Form.Label>
                        <Form.Control type="text" id="BFresult" as="textarea" placeholder="Результат" />
                    </Form.Group>
                    <br></br>
                    <Button variant="primary" type="button" onClick={() => {
                        document.getElementById('BFkey').value.length < 16 ? this.setState({showModal: true}) : this.Script_BF();
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

    Script_BF() {
        let key = CryptoJS.enc.Utf8.parse(document.getElementById('BFkey').value);
        let data = document.getElementById('BFdata').value;

        if (this.state.encrypted) {
            let encryptedBF = CryptoJS.Blowfish.encrypt(data, key,{
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            document.getElementById('BFresult').value = encryptedBF.toString();
        }
        else {
            let decryptedBF = CryptoJS.Blowfish.decrypt(data, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            document.getElementById('BFresult').value = decryptedBF.toString(CryptoJS.enc.Utf8);
        }
    }
}

export default Sync_BF