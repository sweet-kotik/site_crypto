import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import dsa from "./Script-DSA";

class ECP_dsa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            encrypted: true,
            showModal: false,
            errorState: null,
            dsadata: "",
            dsaresult: "",
            saveResult: null,
            checkedResult: false
        };

        this.handleSwitchChangeResult = this.handleSwitchChangeResult.bind(this);
        this.Script_dsa = this.Script_dsa.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseKey = this.handleCloseKey.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSwitchChange = this.handleSwitchChange.bind(this);
    }
    
    render() {
        return(
            <div className="container">
                <h2>{this.state.encrypted ? "Создание" : "Проверка"}</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>
                            Текст
                        </Form.Label>
                        <Form.Control 
                            as="textarea" 
                            id="dsadata" 
                            placeholder="Введите текст"
                            value={this.state.dsadata}
                            onChange={this.handleInputChange}
                        /> 
                    </Form.Group><br></br>
                    <Button variant="primary" type="button" onClick={this.generateKeys}>Сгенерировать ключи</Button>
                    <Form.Check 
                        type="switch"
                        id="select-mode"
                        label="Сменить режим"
                        onChange={this.handleSwitchChange}
                    />
                    <Form.Group>
                        <Form.Label>
                            Результат
                        </Form.Label>
                        <Form.Control 
                            as="textarea" 
                            id="dsaresult" 
                            rows={3} 
                            placeholder="Результат"
                            value={this.state.dsaresult}
                            readOnly
                        />
                    </Form.Group><br></br>
                    <Button variant="primary" type="button" onClick={this.Script_dsa}>{this.state.encrypted ? "Создать" : "Проверить"}</Button>
                </Form>
                <Modal show={this.state.showModal} onHide={this.handleClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.state.errorState}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Ошибка!<br></br>
                        Пожалуйста проверьте свои данные!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Закрыть</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    handleClose = () => this.setState({showModal: false});
    handleCloseKey = () => this.setState({showModalKey: false});
    handleSwitchChangeResult = () => this.setState({ checkedResult: !this.state.checkedResult });
    generateKeys = () => dsa.generateKeys();

    handleInputChange(event) {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    }

    handleSwitchChange() {
        this.setState({
            encrypted: !this.state.encrypted,
            dsadata: '',
            dsaresult: ''
        });
    }

    handleShowKey(typeKey) {
        this.setState({
            showModalKey: true,
            showKeyState: typeKey
        });
    }

    Script_dsa() {
        let data = this.state.dsadata;

        try {
            let result;
            if (this.state.encrypted) {
                result = dsa.createSignature(data);
                this.setState({ saveResult: result });

            }
            else {
                result = dsa.verifySignature(this.state.saveResult, data);
            }
            this.setState({ dsaresult: result });
        } catch (error) {
            console.error(error);
            this.setState({ 
                showModal: true,
                errorState: error.message
            });
        }
    }
}

export default ECP_dsa;
