import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import crc from "crc";

class Hash_crc32 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            errorState: null,
            crc32data: "",
            crc32result: "",
        };

        this.Hash_crc32 = this.Hash_crc32.bind(this);
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
                            id="crc32data" 
                            placeholder="Введите текст"
                            value={this.state.crc32data}
                            onChange={this.handleInputChange}
                        /> 
                    </Form.Group><br></br>
                    <Form.Group>
                        <Form.Label>
                            Результат
                        </Form.Label>
                        <Form.Control 
                            as="textarea" 
                            id="crc32result" 
                            rows={3} 
                            placeholder="Результат"
                            value={this.state.crc32result}
                            readOnly
                        />
                    </Form.Group><br></br>
                    <Button variant="primary" type="button" onClick={this.Hash_crc32}>Хэшировать</Button>
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

    Hash_crc32() {
        let data = this.state.crc32data;

        try {
            let result;

            result = crc.crc32(data).toString(16);

            this.setState({ crc32result: result });
        } catch (error) {
            console.error(error);
            this.setState({ 
                showModal: true,
                errorState: error.message
             });
        }
    }
}

export default Hash_crc32;