import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import  ntru  from './Script-NTRUEncrypt.js';

class Async_NTRU extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            encrypted: true,
            publicKeyState: "",
            privateKeyState: "",
            showModal: false,
            errorState: null,
            showModalKey: false,
            showKeyState: null,
            NTRUdata: "",
            NTRUresult: "",
            saveResult: null,
            checkedResult: false
        };

        this.handleSwitchChangeResult = this.handleSwitchChangeResult.bind(this);
        this.generateKey = this.generateKey.bind(this);
        this.Script_NTRU = this.Script_NTRU.bind(this);
        this.handleShowKeyPublic = this.handleShowKey.bind(this, "public");
        this.handleShowKeyPrivate = this.handleShowKey.bind(this, "private");
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseKey = this.handleCloseKey.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSwitchChange = this.handleSwitchChange.bind(this);
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
                        <Form.Control 
                            as="textarea" 
                            id="NTRUdata" 
                            placeholder="Введите текст"
                            value={this.state.NTRUdata}
                            onChange={this.handleInputChange}
                        /> 
                    </Form.Group><br></br>
                    <Form.Group>
                        <Form.Label>Ключи</Form.Label><br></br>
                        <Button variant="primary" type="button" onClick={this.generateKey}>Сгенерировать ключи</Button>
                    </Form.Group><br></br>
                    <Form.Check 
                        type="switch"
                        id="select-mode"
                        label="Сменить режим"
                        onChange={this.handleSwitchChange}
                    />
                    <Form.Check
                        type="switch"
                        id="save-result"
                        label="Сохранить результат"
                        checked={this.checkedResult}
                        onChange={this.handleSwitchChangeResult}
                    />
                    <Form.Group>
                        <Form.Label>
                            Результат
                        </Form.Label>
                        <Form.Control 
                            as="textarea" 
                            id="NTRUresult" 
                            rows={3} 
                            placeholder="Результат"
                            value={this.state.NTRUresult}
                            readOnly
                        />
                    </Form.Group><br></br>
                    <Button variant="primary" type="button" onClick={this.Script_NTRU}>{this.state.encrypted ? "Шифровать" : "Дешифровать"}</Button>
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
                            {this.state.showKeyState === "private" ? this.state.privateKeyState.toString() : this.state.publicKeyState.toString()}
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
    handleSwitchChangeResult = () => this.setState({ checkedResult: !this.state.checkedResult });

    async generateKey() {
        try {
            const keys = await this.asyncGenerateKeys();
            this.setState({
                publicKeyState: keys.publicKey,
                privateKeyState: keys.privateKey
            });
        } catch (error) {
            console.error(error);
            this.setState({
                showModal: true,
                errorState: error.message
            });
        }
    }

    async asyncGenerateKeys() {
        return new Promise((resolve, reject) => {
            const generate = () => {
                try {
                    const keys = ntru.generateKeys();
                    resolve(keys);
                } catch (error) {
                    reject(error);
                }
            };
            requestAnimationFrame(generate);
        });
    }

    handleInputChange(event) {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    }

    handleSwitchChange() {
        this.setState({
            encrypted: !this.state.encrypted,
            NTRUdata: '',
            NTRUresult: ''
        });
    }

    handleShowKey(typeKey) {
        this.setState({
            showModalKey: true,
            showKeyState: typeKey
        });
    }

    Script_NTRU() {
        let data = this.state.NTRUdata;
        let publicKey = this.state.publicKeyState;
        let privateKey = this.state.privateKeyState;

        try {
            let result;
            if (this.state.encrypted) {
                result = ntru.encrypt(data, publicKey);
                if (this.state.checkedResult) {
                    this.setState({ saveResult: result });
                }
                
            }
            else if(this.state.checkedResult) {
                result = ntru.decrypt(this.state.saveResult, privateKey);
            }
            else {
                result = ntru.decrypt(data, privateKey);
            }
            this.setState({ NTRUresult: result });
        } catch (error) {
            console.error(error);
            this.setState({ 
                showModal: true,
                errorState: error.message
             });
        }
    }
}

export default Async_NTRU;
