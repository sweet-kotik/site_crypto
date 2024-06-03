import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import md5 from "md5";

class Hash_MD5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            errorState: null,
            md5data: "",
            md5result: "",
        };

        this.Hash_md5 = this.Hash_md5.bind(this);
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
                            id="md5data" 
                            placeholder="Введите текст"
                            value={this.state.md5data}
                            onChange={this.handleInputChange}
                        /> 
                    </Form.Group><br></br>
                    <Form.Group>
                        <Form.Label>
                            Результат
                        </Form.Label>
                        <Form.Control 
                            as="textarea" 
                            id="md5result" 
                            rows={3} 
                            placeholder="Результат"
                            value={this.state.md5result}
                            readOnly
                        />
                    </Form.Group><br></br>
                    <Button variant="primary" type="button" onClick={this.Hash_md5}>Хэшировать</Button>
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

    Hash_md5() {
        let data = this.state.md5data;

        try {
            let result;

            result = md5(data);

            this.setState({ md5result: result });
        } catch (error) {
            console.error(error);
            this.setState({ 
                showModal: true,
                errorState: error.message
             });
        }
    }
}

export default Hash_MD5;