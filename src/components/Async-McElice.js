import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import mcel from "./Script-McElice";

class Async_McElice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            encrypted: true,
            showModal: false,
            errorState: null,
            showModalKey: false,
            showKeyState: null,
            mcedata: "",
            mceresult: "",
            saveResult: null,
            checkedResult: false,
            publicKey: null,
            privateKey: null
        };

        this.handleSwitchChangeResult = this.handleSwitchChangeResult.bind(this);
        this.Script_mce = this.Script_mce.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShowKeyPublic = this.handleShowKey.bind(this, "public");
        this.handleShowKeyPrivate = this.handleShowKey.bind(this, "private");
        this.handleCloseKey = this.handleCloseKey.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSwitchChange = this.handleSwitchChange.bind(this);
        this.generateKey = this.generateKey.bind(this);
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
                            id="mcedata" 
                            placeholder="Введите текст"
                            value={this.state.mcedata}
                            onChange={this.handleInputChange}
                        /> 
                    </Form.Group><br></br>
                    <Form.Group>
                        <Button
                            variant="primary"
                            onClick={this.generateKey}
                            type="button"
                        >Сгенерировать ключи</Button>
                        {/* <Button
                            variant="primary"
                            onClick={this.handleShowKey("public")}
                            type="button"
                        >Показать публичный ключ</Button>
                        <Button
                            variant="primary"
                            onClick={this.handleShowKey("private")}
                            type="button"
                        >Показать приватный ключ</Button> */}
                    </Form.Group>
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
                            id="mceresult" 
                            rows={3} 
                            placeholder="Результат"
                            value={this.state.mceresult.toString('hex')}
                            readOnly
                        />
                    </Form.Group><br></br>
                    <Button variant="primary" type="button" onClick={this.Script_mce}>{this.state.encrypted ? "Шифровать" : "Дешифровать"}</Button>
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
                            {this.state.showKeyState === "private" ? this.state.privateKey : this.state.publicKey}
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

    generateKey() {
        const { publicKey, privateKey } = mcel.genKey();
        this.setState({
            publicKey: publicKey,
            privateKey: privateKey,
        })
        console.log('Public Key:', publicKey);
        console.log('Private Key', privateKey);
    }

    handleInputChange(event) {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    }

    handleSwitchChange() {
        this.setState({
            encrypted: !this.state.encrypted,
            mcedata: '',
            mceresult: ''
        });
    }

    handleShowKey(typeKey) {
        this.setState({
            showModalKey: true,
            showKeyState: typeKey
        });
    }

    Script_mce() {
        let data = this.state.mcedata;
        const privateKey = this.state.privateKey;
        const publicKey = this.state.publicKey;

        try {
            let result;
            if (this.state.encrypted) {
                result = mcel.encrypt(data, publicKey);
                if (this.state.checkedResult) {
                    this.setState({ saveResult: result });
                }
            }
            else if(this.state.checkedResult) {
                result = mcel.decrypt(this.state.saveResult, privateKey);
            }
            else {
                result = mcel.decrypt(data, privateKey);
            }
            this.setState({ mceresult: result });
        } catch (error) {
            console.error(error);
            this.setState({ 
                showModal: true,
                errorState: error.message
             });
        }
    }
}

export default Async_McElice;