import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';

class editarAluno extends Component {
    constructor(props) {
        super(props);

        this.state = {
            aluno: {
                nome: "",
                ra: "",
                dataNascimento: ""
            },
            erro: null,
            redirect: false
        };
    }
    exibeErro() {
        const { erro } = this.state;

        if (erro) {
            return (
            <div className="alert alert-danger" role="alert">
                Erro de conexão com o servidor
            </div>
            );
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;

        fetch(`http://localhost:3003/aluno/${id}`)
        .then(data => {
            data.json().then(data => {
                if (data.error) {
                    this.setState({ erro: data.error });
                } else {
                    this.setState({ aluno: data });
                }
                });
            })
            .catch(erro => this.setState({erro: erro}));
        }

        render() {
            const { redirect } = this.state;

            if (redirect) {
                return <Redirect to="/aluno" />;
            } else {
                return (
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend> Adicionar Aluno</legend>
                            <div className="aluno-update">
                                <label htmlFor="nome">Nome</label>
                                <br />
                                <input 
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.aluno.nome}
                                onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="aluno-update">
                                <label htmlFor="ra">RA </label>
                                  <br />
                                    <input 
                                    type="text"
                                    id="ra"
                                    name="ra"
                                    placeholder="RA"
                                    required
                                    value={this.state.aluno.ra}
                                    onChange={this.handleInputChange}
                                    />
                            </div>
                            <div className="aluno-update">
                            <label htmlFor="dataNascimento">Nascimento </label>
                            <br />
                            <input 
                            type="date"
                            id="dataNascimento"
                            name="dataNascimento"
                            placeholder="Nascimento"
                            required
                            value={this.state.aluno.dataNascimento}
                            onChange={this.handleInputChange}
                            />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Atualizar
                            </button>
                        </fieldset>
                    </form>
                );
            }
        }
        handleInputChange = event => {
            const target = event.target;
            const name = target.name;
            const value = target.value;

            this.setState(prevState => ({
                aluno: { ...prevState.aluno, [name]: value }
            }));
        };

        handleSubmit = event => {
            console.log(this.state.aluno)
            const { id } = this.state.aluno;
            fetch(`http://localhost:3003/aluno/${id}`, {
                method: "put",
                body: JSON.stringify(this.state.aluno),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));
            event.preventDefault();
        };
    }

    export default editarAluno;
