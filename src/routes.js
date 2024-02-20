import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainAluno from './pages/aluno/main';
import DetalhesAluno from './pages/aluno/detalhes';
import adicionarAluno from './pages/aluno/adicionar';
import editarAluno from './pages/aluno/editar';
import deletarAluno from './pages/aluno/deletar';
const Routes = () => (

    <BrowserRouter>
    <Switch>
        <Route exact path="/aluno" component={MainAluno} />
        <Route path="/aluno/:id" component={DetalhesAluno} />
        <Route path="/adicionarAluno" component={adicionarAluno} />
        <Route path="/editarAluno" component={editarAluno} />
        <Route path="/deletarAluno" component={deletarAluno} />
    </Switch>
    </BrowserRouter>
)
export default Routes;