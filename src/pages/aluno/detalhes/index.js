import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './index.css';

export default class aluno extends Component {
    state = {
        aluno: {},
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        
        fetch(`http://localhost:3003/aluno/${id}`)
        .then(aluno =>
            aluno.json().then(aluno => this.setState({ aluno }))
        )
        .catch(erro => this.setState({ erro }));
    }
    
    render() {
        const { aluno, index } = this.state;

        if (aluno.ativo) {
            aluno.ativo = "Aluno Ativo";
        } else {
            aluno.ativo = "Aluno Inativo";
        }

        return (
            <div className="aluno-info">
                <h1> {aluno.nome} </h1>
                <h1> {aluno.ativo} </h1>
                <h1> {aluno.ra} </h1>
                <h1> {aluno.dataNascimento} </h1>
                <br />
                <Link to={`/aluno`}> Voltar </Link><br />
                <Link to={`/editarAluno/${aluno.id}`}> Editar </Link> <br />
                <Link to={`/deletarAluno/${aluno.id}`}> Deletar </Link> <br />            
            </div>
            );
        }
    }