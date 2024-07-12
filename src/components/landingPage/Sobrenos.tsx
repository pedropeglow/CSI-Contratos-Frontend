import React from "react";
import "./lp.css"
import { GitHub, LinkedIn } from "@mui/icons-material";

const Sobrenos = () => {
  return (
    <section id="sobrenos" className="section-white">
        <div
        style={{
          marginTop: "20px",
          width: "5%",
          height: "5px",
          backgroundColor: "#000339",
          margin: "0 auto",
        }}
      ></div>
      <div className="container">
        <div className="row">
          <div className="section-sobrenos">
            <h2 className="section-title">Sobre Nós</h2>
            <p>Nossa equipe de desenvolvimento do CSI composta por 2 alunos. Este projeto foi desenvolvido como parte do Projeto de Desenvolvimento II do Curso Superior de Análise e Desenvolvimento de Sistemas, demonstrando nossa capacidade de enfrentar e resolver desafios tecnológicos complexos.</p>
          </div>
          <div className="team">
          <div className="col-sm-6 col-md-4">
            <div className="team-item">
              <img src="https://avatars.githubusercontent.com/u/80431916?s=400&u=d9f9ec3c2bd133568db54b3eb313f5d243e2d5ef&v=4" className="team-img" alt="pic" />
              <h3>PEDRO PEGLOW</h3>
              <div className="team-info"><p>Desenvolvedor Front-end do CSI</p></div>
              <p>Estudante de Análise e desenvolvimento de Sistemas Dev Full-Stack Jr</p>
              <ul className="team-icon">
                <li><a href="https://github.com/pedropeglow" className="github">
                  <GitHub/>
                </a></li>
                <li><a href="https://www.linkedin.com/in/pedro-peglow/" className="linkedin">
                  <LinkedIn />
                </a></li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="team-item">
              <img src="https://avatars.githubusercontent.com/u/87399006?v=4" className="team-img" alt="pic" />
              <h3>WAGNER SOUZA</h3>
              <div className="team-info"><p>Desenvolvedor Back-end do CSI</p></div>
              <p>Eterno estudante. Amante da tecnologia.</p>
              <ul className="team-icon">
                <li><a href="https://github.com/wagnersouzadepaula" className="github"><GitHub/></a></li>
                <li><a href="https://www.linkedin.com/in/wagner-s-paula-815b6892/" className="linkedin"><LinkedIn /></a></li>
              </ul>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sobrenos;
