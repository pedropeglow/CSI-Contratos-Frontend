import { Container, Box, IconButton, Avatar, TextField, Typography, Grid, useTheme, css, Stack, Alert, MenuItem, NativeSelect   } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useCSICareContext } from '../../context';
import { Socio } from '../../types/socios';
import { useState, useEffect } from 'react';
import Option from '@mui/joy/Option';
import { Select, Input, FormControl, FormLabel, Button } from '@mui/joy';
import { formatCPF } from '../../utils/cpfFormat';
import { formatRg } from '../../utils/rgFormat';
import { formatCEP } from '../../utils/cepForm';
import { useNavigate } from 'react-router-dom';
import { PessoaJuridica } from '../../types/pessoaJuridica';

const estadosCivis = [
  { id: 1, label: 'Solteiro' },
  { id: 2, label: 'Casado' },
  { id: 3, label: 'Viúvo' },
  { id: 4, label: 'Divorciado' }
];

interface FormWrapperProps {
  theme: any
}

const schema = yup.object().shape({
  nome: yup.string().required("Campo nome é obrigatório"),
  cpf: yup.string().required("Campo CPF é obrigatório"),
  rg: yup.string().required("Campo RG é obrigatório"),
  nacionalidade: yup.string().required("Campo nacionalidade é obrigatório"),
  estadoCivil: yup.string().required("Campo estado civil é obrigatório"),
  profissao: yup.string().required("Campo profissão é obrigatório"),
  endereco: yup.string().required("Campo endereço é obrigatório"),
  nroImovel: yup.string().required("Campo número é obrigatório"),
  bairro: yup.string().required("Campo bairro é obrigatório"),
  cidade: yup.string().required("Campo cidade é obrigatório"),
  uf: yup.string().required("Campo UF é obrigatório"),
  cep: yup.string().required("Campo CEP é obrigatório"),
});


interface FormProps {
  isCreate: boolean
  handleReturnButton: () => void
  currentPessoaJuridica: PessoaJuridica
}

export const Form = ({isCreate, handleReturnButton, currentPessoaJuridica}: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch
  } = useForm<PessoaJuridica>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate()
  const {createPessoasJuridicas, updatePessoasJuridicas} = useCSICareContext()
  const [pessoaJuridica, setPessoaJuridica] = useState<PessoaJuridica>(currentPessoaJuridica)

  const submitCreate = async (data: PessoaJuridica) => {
    const response = await createPessoasJuridicas(data);

    if (response?.status == 201) {
      handleReturnButton()
    }
  };

  const submitEdit = async (data: PessoaJuridica) => {
    const response = await updatePessoasJuridicas(data)
    if (response?.status === 204) {
      handleReturnButton()
      navigate('/pessoasJuridicas/dashboard')
    }
  };

  return(
  <>
    <Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-start', padding: '40px 0px'}}>
      <IconButton onClick={handleReturnButton}>
        <ArrowBackIcon sx={{ fontSize: '30px'}}/>
      </IconButton>
    </Box>
    <Container>
        <Container 
          sx={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            flexWrap: 'wrap', 
            }}
          >
          <Typography variant="h5">{!!isCreate ? "Adicione PJ" : "Edite seu PJ" }</Typography>
            <FormControl sx={{
              display: 'grid',
              gridTemplateColumns: '0.4fr 1.2fr 0.4fr 1fr',
              padding: '10px',
            }}>

              <FormLabel>Nome</FormLabel>
              <Input sx={{
                marginRight: '10px',
                marginBottom: '5px'
              }}
                {...register("nome")}
                onChange={(e) => setPessoaJuridica({...pessoaJuridica, nome: e.target.value})}
                value={pessoaJuridica.nome}
              />
            </FormControl>
          <Stack>
            <Button
              color="neutral"
              variant="soft"

                onClick={() => {isCreate ? submitCreate(pessoaJuridica) : submitEdit(pessoaJuridica)}}
                sx={{  width: '80px', marginBottom: '20px' }}
              >
                Salvar
              </Button>
          </Stack>  
        </Container>

       
      </Container>
  </>
  )
};
