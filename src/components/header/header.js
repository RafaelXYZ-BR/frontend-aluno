import React from "react";

//header é um component
//cria uma pasta somente para ele pois todos os arquivos referentes a ele ficarão em um único local
// para importar o css, venho direto aqui também
import './header.css';

//stateless components - criamos componentes por meio de variaveis
//pode tirar os parenteses caso deseje
const Header = () => (
    <header id="main-header">Sistema Acadêmico</header>
);

export default Header;