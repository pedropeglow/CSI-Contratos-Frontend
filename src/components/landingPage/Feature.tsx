import { Button, styled, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import { Form } from "./styles";

const Feature: React.FC = () => {
    const [codigo, setCodigo] = useState('');

    const handleChange = (event : any) => {
        setCodigo(event.target.value);
    };
    const onSubmit = () => {
        // Aqui você pode adicionar a lógica para enviar o código para a API
        console.log("Código submetido:", codigo);
        // Exemplo de como você pode fazer uma requisição à API usando fetch:
        // fetch('sua-url-da-api', {
        //   method: 'POST',
        //   body: JSON.stringify({ codigo }),
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // }).then(response => {
        //   // Processar a resposta da API aqui
        // });
      };
  const CustomContainer = styled(Container)(({ theme }) => ({
    backgroundColor: "#1876F2",
    height: "416px",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(3, 3, 0, 3),
      width: "90%",
    },
  }));

  const CustomBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(10, 0, 10, 0),
    margin: theme.spacing(0, 2, 0, 2),
    [theme.breakpoints.down("md")]: {
      padding: "0",
    },
  }));

  const Heading2 = styled(Typography)(({ theme }) => ({
    fontSize: 30,
  }))

  const StyledTextField = styled(TextField)(({ theme }) => ({
    backgroundColor: "white"
  }))


  return (
    <CustomBox id="features">
      <CustomContainer>
      <Heading2 variant="h2">Pesquise um Contrato Social Válido</Heading2>
      <Form style={{ border: '5px black' }}
				onSubmit={(onSubmit)}>
            <StyledTextField
							id='outlined-basic'
							label='Código Contrato'
							variant='outlined'
						/>
        </Form>
      </CustomContainer>
    </CustomBox>
  );
};

export default Feature;