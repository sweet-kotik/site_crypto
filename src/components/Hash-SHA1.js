import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import CryptoJS from "crypto-js";

class Hash_sha1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            errorState: null,
            sha1data: "",
            sha1result: "",
        };

        this.Hash_sha1 = this.Hash_sha1.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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
                            id="sha1data" 
                            placeholder="Введите текст"
                            value={this.state.sha1data}
                            onChange={this.handleInputChange}
                        /> 
                    </Form.Group><br></br>
                    <Form.Group>
                        <Form.Label>
                            Результат
                        </Form.Label>
                        <Form.Control 
                            as="textarea" 
                            id="sha1result" 
                            rows={3} 
                            placeholder="Результат"
                            value={this.state.sha1result}
                            readOnly
                        />
                    </Form.Group><br></br>
                    <Button variant="primary" type="button" onClick={this.Hash_sha1}>Хэшировать</Button>
                </Form>
                <Modal show={this.state.showModal} onHide={this.handleClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.state.errorState}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Ошибка хэширования<br></br>
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

    handleInputChange(event) {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    }

    Hash_sha1() {
        let data = this.state.sha1data;

        try {
            let result;

            result = CryptoJS.SHA1(data).toString(CryptoJS.enc.Hex);

            this.setState({ sha1result: result });
        } catch (error) {
            console.error(error);
            this.setState({ 
                showModal: true,
                errorState: error.message
             });
        }
    }
}

export default Hash_sha1;