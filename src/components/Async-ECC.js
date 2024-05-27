import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from "react-bootstrap/Modal";
import GoldwasserMicali from "./Script-Goldwasser-Micali"


class Async_ECC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            encrypted: true,
            showModal: false,
            errorState: null,
            saveDataState: [],
            gm: new GoldwasserMicali(512),
            ECCdata: '',
            ECCresult: ''
        };
        this.Script_ECC = this.Script_ECC.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.saveData = this.saveData.bind(this);
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
                            id="ECCdata" 
                            value={this.state.ECCdata}
                            onChange={this.handleInputChange}
                            placeholder="Введите текст"
                        />
                    </Form.Group><br></br>
                    <Form.Check 
                        type="switch"
                        id="save-data-enc"
                        label="Сохранить данные для дешифровки"
                    />
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
                            id="ECCresult"
                            value={this.state.ECCresult} 
                            rows={3} 
                            placeholder="Результат"
                            readOnly
                        />
                    </Form.Group><br></br>
                    <Button variant="primary" type="button" onClick={this.Script_ECC}>{this.state.encrypted ? "Шифровать" : "Дешифровать"}</Button>
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
            </div>
        )
    }

    handleClose = () => this.setState({showModal: false});
    saveData = (data) => this.setState({ saveDataState: [data] });

    handleInputChange(event) {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    }

    handleSwitchChange() {
        this.setState({
            encrypted: !this.state.encrypted,
            ECCdata: '',
            ECCresult: ''
        });
    }

    Script_ECC() {
        let data = document.getElementById('ECCdata').value;
        const gm = this.state.gm;
        try {
            if (this.state.encrypted) {
                const encrypted = gm.encryptMessage(data);
                if (document.getElementById('save-data-enc').checked) {
                    this.saveData(encrypted);
                }
                this.setState({ ECCresult: encrypted });
            }
            else if (this.state.encrypted === false && this.state.saveDataState.length > 0) {
                const decrypted = gm.decryptMessage(this.state.saveDataState[0]);
                this.setState({ ECCresult: decrypted });
            }
            else if (this.state.encrypted === false) {
                const decrypted = gm.decryptMessage(data);
                this.setState({ ECCresult: decrypted });
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

export default Async_ECC