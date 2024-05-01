import { styled, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Form, Input, Label, Button } from "./styles";

const Feature: React.FC = () => {
    const [codigo, setCodigo] = useState('');


    const onSubmit = (event: React.FormEvent<HTMLFormElement>, codigo: string) => {
        event.preventDefault();
        console.log("Código submetido:", codigo);
        // Aqui você pode adicionar a lógica para enviar o código para a API
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


  const Heading2 = styled(Typography)(({ theme }) => ({
    fontSize: 30,
    color: "black",
    textAlign: "center"
  }))



  return (
    <>
      <Heading2 id="features" variant="h2">Pesquise um Contrato Social Válido</Heading2>
      <Form onSubmit={(event) => onSubmit(event, codigo)}>
             <Label htmlFor="idContrato">Digite o Código do Contrato:</Label>
             <Input type="text" id="idContrato" name="idContrato" value={codigo} onChange={(event) => setCodigo(event.target.value)}></Input> 
             <Button type="submit">Pesquisar</Button>
        </Form>
    </>
  );
};

export default Feature;