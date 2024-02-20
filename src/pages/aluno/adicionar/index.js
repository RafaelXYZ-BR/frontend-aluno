import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';

class adicionarAluno extends Component {
    constructor(props) {
        super(props);

        this.state = {
            aluno: {
                nome: "",
                ra: "",
                dataNascimento:"",
                ativo: "true"
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

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/aluno" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Adicionar Aluno</legend>
                        <div className="aluno-insert">
                            <label htmlFor="nome">Nome </label>
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
                        <div className="aluno-insert">
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
                        <div className="aluno-insert">
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
                        <div className="aluno-insert">
                            <label>
                            <input 
                            type="radio"
                            id="ativo"
                            value="true"
                            checked={this.state.aluno.ativo === "true"}
                            onChange={this.handleInputChange}
                            />
                            Ativo
                            </label>
                                <label>
                                    <input
                                    type="radio"
                                    value="false"
                                    name="ativo"
                                    checked={this.state.aluno.ativo === "false"}
                                    onChange={this.handleInputChange}
                                    />
                                    Inativo
                                    </label>
                                    </div>

                                    <button type="submit" className="btn btn-primary">Cadastrar</button>
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
        aluno: { ...prevState.aluno, [name]:value }
    }));
    console.log(value);
};

handleSubmit = event => {
    console.log(this.state.aluno)
    fetch("http://localhost:3003/aluno",{
        method: "post",
        body: JSON.stringify(this.state.aluno),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(data => {
        if(data.ok) {
            this.setState({ redirect: true});
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
    export default adicionarAluno;