import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import forge from "node-forge";
import Modal from "react-bootstrap/Modal";

class Async_RSA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            encrypted: true,
            publicKeyState: "",
            privateKeyState: "",
            keypairState: null,
            showModal: false,
            errorState: null,
            showModalKey: false,
            showKeyState: null
        }
        this.Script_RSA = this.Script_RSA.bind(this);
        this.generateKey = this.generateKey.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseKey = this.handleCloseKey.bind(this);
    }
    render() {
        return(
            <div className="container">
                <h2>{this.state.encrypted ? "Шифровка" : "Дешифровка"}</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>
                            Текст
                        </Form.Label>
                        <Form.Control as="textarea" id="RSAdata" placeholder="Введите текст"/>
                    </Form.Group><br></br>
                    <Form.Group>
                        <Form.Label>Ключи</Form.Label><br></br>
                        <Button variant="primary" style={{marginRight: '10px'}} type="button" onClick={() => {
                            this.setState({
                                showModalKey: true,
                                showKeyState: "private"
                            })
                        }}>Показать приватный ключ</Button>
                        <Button  variant="primary" type="button" onClick={() => {
                            this.setState({
                                showModalKey: true,
                                showKeyState: "public"
                            })
                        }}>Показать публичный ключ</Button><br></br><br></br>
                        <Button variant="primary" type="button" onClick={this.generateKey}>Сгенерировать ключи</Button>
                    </Form.Group><br></br>
                    <Form.Check 
                        type="switch"
                        id="select-mode"
                        label="Сменить режим"
                        onChange={() => {
                            this.setState({encrypted: !this.state.encrypted});
                            document.getElementById('RSAdata').value = "";
                            document.getElementById('RSAresult').value = "";
                        }}
                    />
                    <Form.Group>
                        <Form.Label>
                            Результат
                        </Form.Label>
                        <Form.Control as="textarea" id="RSAresult" rows={3} placeholder="Результат"/>
                    </Form.Group><br></br>
                    <Button variant="primary" type="button" onClick={this.Script_RSA}>{this.state.encrypted ? "Шифровать" : "Дешифровать"}</Button>
                </Form>
                <Modal show={this.state.showModal} onHide={this.handleClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.state.errorState}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Ошибка шифровки или дешифровки!<br></br>
                        Пожалуйста проверьте свои данные!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Закрыть</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showModalKey} onHide={this.handleCloseKey} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.state.showKeyState}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            {this.state.showKeyState === "private" ? this.state.privateKeyState : this.state.publicKeyState}
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseKey}>Закрыть</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    handleClose = () => this.setState({showModal: false});
    handleCloseKey = () => this.setState({showModalKey: false});

    generateKey() {
        const rsa = forge.pki.rsa;
        const keypair = rsa.generateKeyPair({bits: 2048, e: 0x10001});
        const publicKey = forge.pki.publicKeyToPem(keypair.publicKey);
        const privateKey = forge.pki.privateKeyToPem(keypair.privateKey);

        this.setState({
            publicKeyState: publicKey,
            privateKeyState: privateKey,
            keypairState: keypair
        });
    }

    Script_RSA() {
        const keypair = this.state.keypairState;

        let data = document.getElementById('RSAdata').value;
        try {
            if (this.state.encrypted) {
                const encrypted = keypair.publicKey.encrypt(data, 'RSA-OAEP', {
                    md: forge.md.sha256.create()
                });
                document.getElementById('RSAresult').value = forge.util.encode64(encrypted);
            }
            else {
                const decrypted = keypair.privateKey.decrypt(forge.util.decode64(data), 'RSA-OAEP', {
                    md: forge.md.sha256.create()
                });
                document.getElementById('RSAresult').value = decrypted;
            }
        } catch (error) {
            console.error(error);
            this.setState({ 
                showModal: true,
                errorState: error.message
             });
        }
    }
}

export default Async_RSA