import React, { Component } from "react";
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            aluno: [],
            erro: null
        };
    }
    componentDidMount() {
        fetch(`http://localhost:3003/aluno`)
        .then(aluno =>
            aluno.json().then(aluno => this.setState({ aluno }))
            )
            .catch(erro => this.setState({ erro }));
    
    }

    render() {
        const { aluno } = this.state;

        return (
            <div className="aluno-list">
                <Link to={`/adicionarAluno`}> <button type="button" class="btn btn-sucess">Novo</button> </Link>
            <br /><br />

            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">RA</th>
                        <th scope="col">Nascimento</th>
                        <th scope="col">Ativo</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                {aluno.map((aluno, index) => (
                    <tr>
                        <th scope="row">{aluno.id}</th>
                        <td>{aluno.nome}</td>
                        <td>{aluno.ra.toLocaleString('pt-BR', {useGrouping: false})}</td>
                    <td>{new
                    Date(aluno.dataNascimento).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit'})}</td>
                    <td>{aluno.ativo ? "Sim" : "Não"}</td>
                    <td> <Link to={`/aluno/${aluno.id}`}><button type="button" class="btn btn-primary">Detalhes</button></Link></td>
                    <td> <Link to={`/editarAluno/${aluno.id}`}><button type="button" class="btn btn-warning">Atualizar</button></Link></td>
                    <td> <Link to={`/deletarAluno/${aluno.id}`}><button type="button" class="btn btn-danger">Exluir</button> </Link></td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )
    }
}