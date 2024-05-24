import React from "react";
import CryptoJS from "crypto-js";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from "react-bootstrap/Modal";

class Sync_DES extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            encrypted: true,
            showModal: false
        }
        this.handleClose = this.handleClose.bind(this);
    }
    render() {
        return(
            <div className="container">
                <h2>{this.state.encrypted ? "Шифровка" : "Дешифровка"}</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Ключ</Form.Label>
                        <Form.Control required type="text" placeholder="Введите ключ" id="DESkey" />
                    </Form.Group><br></br>
                    <Form.Group>
                        <Form.Label>Текст</Form.Label>
                        <Form.Control type="text" id="DESdata" as="textarea" placeholder="Введите текст" />
                    </Form.Group><br></br>
                    <Form.Check 
                        type="switch"
                        id="select-mode"
                        label="Сменить режим"
                        onChange={() => {
                            this.setState({encrypted: !this.state.encrypted});
                            document.getElementById('DESdata').value = "";
                            document.getElementById('DESresult').value = "";
                        }}
                    />
                    <Form.Group>
                        <Form.Label>Результат</Form.Label>
                        <Form.Control type="text" id="DESresult" as="textarea" placeholder="Результат" />
                    </Form.Group>
                    <br></br>
                    <Button variant="primary" type="button" onClick={() => {
                        document.getElementById('DESkey').value.length < 8 ? this.setState({showModal: true}) : this.Script_DES();
                    }}>{this.state.encrypted ? "Шифровать" : "Дешифровать"}</Button>

                </Form>
                <Modal show={this.state.showModal} onHide={this.handleClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            ВНИМАНИЕ!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Ключ должен быть не менее 8 символов!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Закрыть</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    handleClose = () => this.setState({showModal: false})

    Script_DES() {
        let key = document.getElementById('DESkey').value;
        let data = document.getElementById('DESdata').value;

        if (this.state.encrypted) {
            let encryptedDES = CryptoJS.DES.encrypt(data, key);
            document.getElementById('DESresult').value = encryptedDES.toString();
        }
        else {
            let decryptedDES = CryptoJS.DES.decrypt(data, key);
            document.getElementById('DESresult').value = decryptedDES.toString(CryptoJS.enc.Utf8);
        }
    }
}

export default Sync_DES