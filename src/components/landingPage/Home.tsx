import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/material";
import React from "react";
import Navbar from "./Navbar";

import homeImg from "../../assets/contrato.png";
import CustomButton from "./CustomButton";

export const Hero: React.FC = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <Box id="home" sx={{ backgroundColor: "#BBEAEC", minHeight: "80vh" }}>
      <Container>
        <Navbar />
        <CustomBox>
          <Box sx={{ flex: "1" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#687690",
                fontWeight: "500",
                mt: 10,
                mb: 4,
              }}
            >
              Bem-vindo à plataforma
            </Typography>
            <Title variant="h1">CSI - Contrato Social Inteligente</Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
            >
             Gere seu contrato social de forma rápida e pratica, sem qualquer tipo de burocracia!
            </Typography>
            <CustomButton
              backgroundColor="#1876F2"
              color="#fff"
              buttonText="Saiba mais!"
              heroBtn={true}
            />
          </Box>

          <Box sx={{ flex: "1.25" }}>
            <img
              src={homeImg}
              alt="homeImg"
              style={{ maxWidth: "100%", marginBottom: "2rem" }}
            />
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Hero;
