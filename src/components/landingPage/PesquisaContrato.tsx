import { Alert, AlertColor, Snackbar, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import { Form, Input, Label, Button, Div } from "./styles";
import { getContratoValidadoService } from "../../services/pessoasJuridicas";

const pesquisaContrato: React.FC = () => {
  const [codigo, setCodigo] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor | undefined>(undefined);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await getContratoSocial(codigo);
      setSnackbarMessage('Contrato encontrado com sucesso!');
      alert('Contrato encontrado com sucesso!');
      setSnackbarSeverity('success');
    } catch (error : any) {
      setSnackbarMessage('Contrato: ' + codigo + ' não encontrado');
      alert('Contrato: ' + codigo + ' não encontrado');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const getContratoSocial = async (contratoId: string) => {
    try {
      const response = await getContratoValidadoService(contratoId);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const Heading2 = styled(Typography)(({ theme }) => ({
    fontSize: 30,
    color: "black",
    textAlign: "center",
    marginTop: "20px"
  }));

  return (
    <>
      <Div>
      <div
        style={{
          marginTop: "20px",
          width: "5%",
          height: "5px",
          backgroundColor: "#000339",
          margin: "0 auto",
        }}
      ></div>
        <Heading2 id="pesquisaContratos" variant="h2">Pesquise um Contrato Social Válido</Heading2>
        <Form onSubmit={onSubmit}>
          <Label htmlFor="idContrato">Digite o Código do Contrato:</Label>
          <Input type="text" id="idContrato" name="idContrato" value={codigo} onChange={(event) => setCodigo(event.target.value)}></Input>
          <Button type="submit">Pesquisar</Button>
        </Form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Div>
    </>
  );
};

export default pesquisaContrato;