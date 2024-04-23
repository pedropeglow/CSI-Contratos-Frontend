import { Box, Typography, styled } from "@mui/material";
import React from "react";

import sociosIcon from "../../assets/socios.png";
import pdfIcon from "../../assets/pdf.png";
import formularioIcon from "../../assets/formulario.png";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";

const Guide: React.FC = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "85%",
    },
  }));

  const GuidesBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    width: "70%",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0",
      flexDirection: "column",
    },
  }));

  const GuideBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  }));

  return (
    <Box
      id="guide"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "5%",
          height: "5px",
          backgroundColor: "#000339",
          margin: "0 auto",
        }}
      ></div>

      <Typography
        variant="h3"
        sx={{ fontSize: "35px", fontWeight: "bold", color: "#000339", my: 3 }}
      >
        Como funciona?
      </Typography>

      <CustomBox>
        <Typography
          variant="body2"
          sx={{
            fontSize: "16px",
            fontWeight: "500",
            color: "#5A6473",
            textAlign: "center",
          }}
        >
          Você só precisa preencher nosso formulário de forma prática para gerar seu Contrato Social!
        </Typography>
      </CustomBox>

      <GuidesBox>
        <GuideBox>
          <img src={sociosIcon} alt="socio ícone" style={{ width: "60px" }} />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            Cadastre seus sócios
          </Typography>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          ></Box>
        </GuideBox>

        <GuideBox>
          <img
            src={formularioIcon}
            alt="formulario ícone"
            style={{ width: "50px" }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            Preencha suas informações
          </Typography>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Box>
        </GuideBox>

        <GuideBox>
          <img src={pdfIcon} alt="pdf ícone" style={{ width: "50px" }} />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            Gere seu contrato
          </Typography>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Box>
        </GuideBox>
      </GuidesBox>

      <Link to="/signup">
        <CustomButton
          backgroundColor="#1876F2"
          color="#fff"
          buttonText="Cadastre-se já!"
          guideBtn={true}
        />
      </Link>
    </Box>
  );
};

export default Guide;
