import React, { useState } from 'react';
import '../styles/Avaliacao.css';
import logo from '../assets/logo_transparente.png';

const avaliacoes = [
  { nome: 'João Santos', comentario: 'Serviço excelente!', nota: 5 },
  { nome: 'Maria Ferreira', comentario: 'Atendimento rápido e eficiente.', nota: 4 },
  { nome: 'Carlos Lima', comentario: 'Recomendo vivamente!', nota: 5 },
  { nome: 'Ana Costa', comentario: 'Bom, mas podia ser melhor.', nota: 3 },
  { nome: 'Rui Silva', comentario: 'Muito simpáticos e profissionais.', nota: 4 },
  { nome: 'Paula Marques', comentario: 'Adorei a limpeza.', nota: 5 },
  { nome: 'André Lourenço', comentario: 'Poderia ter sido mais rápido.', nota: 3 },
  { nome: 'Bruno Almeida', comentario: 'Atendimento impecável!', nota: 5 },
  { nome: 'Inês Moreira', comentario: 'Serviço razoável, pode melhorar.', nota: 3 },
  { nome: 'Miguel Pinto', comentario: 'Rapidez e qualidade, recomendo.', nota: 5 },
  { nome: 'Helena Duarte', comentario: 'Nada a apontar, voltarei de certeza.', nota: 5 },
  { nome: 'Tiago Fonseca', comentario: 'Demorou mais do que o previsto.', nota: 2 },
  { nome: 'Sofia Ramos', comentario: 'Profissionais muito competentes.', nota: 5 },
  { nome: 'Pedro Martins', comentario: 'Bom serviço pelo preço pago.', nota: 4 },
  { nome: 'Catarina Neves', comentario: 'Superou minhas expectativas!', nota: 5 },
  { nome: 'Diana Cardoso', comentario: 'Atendimento perfeito, 5 estrelas!', nota: 5 },
  { nome: 'João Miguel', comentario: 'Tinha mais expectativas do serviço', nota: 2 },
  { nome: 'Ricardo Teixeira', comentario: 'Satisfeito com o resultado.', nota: 4 },
  { nome: 'Beatriz Gomes', comentario: 'Não tenho queixas, muito bom.', nota: 5 },
  { nome: 'Gonçalo Castro', comentario: 'Serviço mediano, esperava mais.', nota: 4 },
];

const total = avaliacoes.length;
const media = (
  avaliacoes.reduce((acc, curr) => acc + curr.nota, 0) / total
).toFixed(1);

const contarNotas = (n) => avaliacoes.filter((a) => a.nota === n).length;

const Avaliacao = () => {
  const [mostrarTodas, setMostrarTodas] = useState(false);
  const avaliacoesVisiveis = mostrarTodas ? avaliacoes : avaliacoes.slice(0, 10);

  return (
    <div className="pagina-avaliacoes">
      <header className="topo">
        <img src={logo} alt="Logo AutoHub" className="logo" />
        <h1>Avaliações dos Clientes</h1>
      </header>

      <main className="conteudo">
        <section className="estatisticas">
          <div className="media">
            <h2>{media}</h2>
            <p>Média Geral</p>
          </div>

          <div className="barra-avaliacoes">
            {[5, 4, 3, 2, 1].map((n) => (
              <div className="linha" key={n}>
                <span>{n} ⭐</span>
                <div className="barra">
                  <div
                    className="preenchido"
                    style={{ width: `${(contarNotas(n) / total) * 100}%` }}
                  ></div>
                </div>
                <span>{contarNotas(n)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="lista">
          <h2>Avaliações Recentes</h2>
          <div className="cartoes">
            {avaliacoesVisiveis.map((a, i) => (
              <div key={i} className="cartao">
                <div className="nota">{a.nota} ⭐</div>
                <div className="conteudo-cartao">
                  <strong>{a.nome}</strong>
                  <p>{a.comentario}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="botao-ver-mais" 
            onClick={() => setMostrarTodas(!mostrarTodas)}
          >
            {mostrarTodas ? 'Ver menos' : 'Ver mais'}
          </button>
        </section>
      </main>
    </div>
  );
};

export default Avaliacao;