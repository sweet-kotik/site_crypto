import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import paillier from "./Script-Pailler";

class Async_pal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            encrypted: true,
            showModal: false,
            errorState: null,
            showModalKey: false,
            showKeyState: null,
            paldata: "",
            palresult: "",
            saveResult: null,
            checkedResult: false
        };

        this.handleSwitchChangeResult = this.handleSwitchChangeResult.bind(this);
        this.Script_pal = this.Script_pal.bind(this);
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
                            id="paldata" 
                            placeholder="Введите текст"
                            value={this.state.paldata}
                            onChange={this.handleInputChange}
                        /> 
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
                            id="palresult" 
                            rows={3} 
                            placeholder="Результат"
                            value={this.state.palresult}
                            readOnly
                        />
                    </Form.Group><br></br>
                    <Button variant="primary" type="button" onClick={this.Script_pal}>{this.state.encrypted ? "Шифровать" : "Дешифровать"}</Button>
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
    handleCloseKey = () => this.setState({showModalKey: false});
    handleSwitchChangeResult = () => this.setState({ checkedResult: !this.state.checkedResult });
    generateKey = () => paillier.generateKeys();

    handleInputChange(event) {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    }

    handleSwitchChange() {
        this.setState({
            encrypted: !this.state.encrypted,
            paldata: '',
            palresult: ''
        });
    }

    handleShowKey(typeKey) {
        this.setState({
            showModalKey: true,
            showKeyState: typeKey
        });
    }

    Script_pal() {
        let data = this.state.paldata;

        try {
            let result;
            let intdata;
            if (this.state.encrypted) {
                intdata = paillier.textToBigInt(data);
                result = paillier.encrypt(intdata);
                if (this.state.checkedResult) {
                    this.setState({ saveResult: result });
                }
                
            }
            else if(this.state.checkedResult) {
                result = paillier.decrypt(this.state.saveResult);
                result = paillier.bigIntToText(result);
            }
            else {
                result = paillier.decrypt(data);
                result = paillier.bigIntToText(result);
            }
            this.setState({ palresult: result });
        } catch (error) {
            console.error(error);
            this.setState({ 
                showModal: true,
                errorState: error.message
             });
        }
    }
}

export default Async_pal;
