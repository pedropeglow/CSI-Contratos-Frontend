import { Container, Box, IconButton, Avatar, TextField, Typography, Grid, useTheme, css, Stack, Alert, MenuItem, NativeSelect } from '@mui/material'
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
  currentSocio: Socio
}

export const Form = ({ isCreate, handleReturnButton, currentSocio }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch
  } = useForm<Socio>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate()
  const { createSocio, updateSocio } = useCSICareContext()
  const [socio, setSocio] = useState<Socio>(currentSocio)

  const submitCreate = async (data: Socio) => {
    data.userEmail = "pedro@example.com";
    data.maioridadeCivil = "s"
    const response = await createSocio(data);

    if (response?.status == 201) {
      handleReturnButton()
    }
  };

  const handleEstadoCivilChange = (event: any) => {
    const value = event.target.value;
    setSocio({ ...socio, estadoCivil: parseInt(value) });
  };


  const submitEdit = async (data: Socio) => {
    const response = await updateSocio(data)
    if (response?.status === 204) {
      handleReturnButton()
      navigate('/socios/dashboard')
    }
  };

  return (
    <>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', padding: '40px 0px' }}>
        <IconButton onClick={handleReturnButton}>
          <ArrowBackIcon sx={{ fontSize: '30px' }} />
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
          <Typography variant="h5">{!!isCreate ? "Adicione um Sócio" : "Edite seu sócio"}</Typography>
          <FormControl>

            <Stack sx={{
              display: 'grid',
              gridTemplateColumns: '0.7fr 2.10fr 1fr',
              padding: '10px',
            }}>

              <FormLabel>Nome do Sócio:</FormLabel>
              <TextField sx={{
                marginBottom: '5px',
                height: '3rem',
                '& .MuiInputBase-root': {
                  height: '100%',
                  '& input': {
                    padding: '10px 14px',
                  },
                },
              }}
                {...register("nome")}
                onChange={(e) => setSocio({ ...socio, nome: e.target.value })}
                value={socio.nome}
              />
            </Stack>
            <FormLabel sx={{ fontWeight: 'bold', fontSize: '20px' }}>Dados do Sócio</FormLabel>
            <Stack sx={{
              display: 'grid',
              gridTemplateColumns: '0.6fr 1.3fr 0.4fr 1fr',
              padding: '10px',
            }}>

              <FormLabel>CPF:</FormLabel>
              <TextField sx={{
                marginBottom: '5px',
                marginRight: '10px',
                height: '3rem',
                '& .MuiInputBase-root': {
                  height: '100%',
                  '& input': {
                    padding: '10px 14px',
                  },
                },
              }}
                {...register("cpf")}
                onChange={(e) => {
                  const formattedCPF = formatCPF(e.target.value);
                  setSocio({ ...socio, cpf: formattedCPF });
                }}
                inputProps={{ maxLength: 14 }}
                value={socio.cpf}
              />
              <FormLabel>RG:</FormLabel>
              <TextField sx={{
                marginBottom: '5px',
                height: '3rem',
                '& .MuiInputBase-root': {
                  height: '100%',
                  '& input': {
                    padding: '10px 14px',
                  },
                },
              }}
                {...register("rg")}
                onChange={(e) => {
                  const formattedRG = formatRg(e.target.value);
                  setSocio({ ...socio, rg: formattedRG });
                }}
                inputProps={{ maxLength: 13 }}
                value={socio.rg}
              />
              <FormLabel>Nacionalidade:</FormLabel>
              <TextField sx={{
                marginBottom: '5px',
                marginRight: '10px',
                height: '3rem',
                '& .MuiInputBase-root': {
                  height: '100%',
                  '& input': {
                    padding: '10px 14px',
                  },
                },
              }}
                {...register("nacionalidade")}
                onChange={(e) => setSocio({ ...socio, nacionalidade: e.target.value })}
                value={socio.nacionalidade}
              />
              <FormLabel>Estado Civil:</FormLabel>
              <NativeSelect
                sx={{
                  marginBottom: '5px',
                  border: '20px',
                  height: '3rem',
                  '& .MuiInputBase-root': {
                    height: '100%',
                    '& input': {
                      padding: '10px 14px',
                    },
                  },
                }}
                value={socio.estadoCivil}
                onChange={handleEstadoCivilChange}
                inputProps={register("estadoCivil")}
              >
                {estadosCivis.map((estado) => (
                  <option key={estado.id} value={estado.id}>
                    {estado.label}
                  </option>
                ))}
              </NativeSelect>
              <FormLabel>Profissão:</FormLabel>
              <TextField sx={{
                marginBottom: '5px',
                marginRight: '10px',
                height: '3rem',
                '& .MuiInputBase-root': {
                  height: '100%',
                  '& input': {
                    padding: '10px 14px',
                  },
                },
              }}
                {...register("profissao")}
                onChange={(e) => setSocio({ ...socio, profissao: e.target.value })}
                value={socio.profissao}
              />

            </Stack>
            <FormLabel sx={{ fontWeight: 'bold', fontSize: '20px' }}>Endereço do Sócio</FormLabel>
            <Stack sx={{
              display: 'grid',
              gridTemplateColumns: '0.4fr 1.8fr',
              padding: '10px',
            }}>

              <FormLabel>Endereço:</FormLabel>
              <TextField sx={{
                marginRight: '10px',
                marginBottom: '5px',
                height: '3rem',
                '& .MuiInputBase-root': {
                  height: '100%',
                  '& input': {
                    padding: '10px 14px',
                  },
                },
              }}
                {...register("endereco")}
                onChange={(e) => setSocio({ ...socio, endereco: e.target.value })}
                value={socio.endereco}
              />
            </Stack>

            <Stack sx={{
              display: 'grid',
              gridTemplateColumns: '0.6fr 1.3fr 0.4fr 1fr',
              padding: '10px',
            }}>
              <FormLabel>Número:</FormLabel>
              <TextField sx={{
                marginBottom: '5px',
                marginRight: '10px',
                height: '3rem',
                '& .MuiInputBase-root': {
                  height: '100%',
                  '& input': {
                    padding: '10px 14px',
                  },
                },
              }}
                {...register("nroImovel")}
                onChange={(e) => setSocio({ ...socio, nroImovel: e.target.value })}
                value={socio.nroImovel}
              />
              <FormLabel>Bairro:</FormLabel>
              <TextField sx={{
                marginRight: '10px',
                marginBottom: '5px',
                height: '3rem',
                '& .MuiInputBase-root': {
                  height: '100%',
                  '& input': {
                    padding: '10px 14px',
                  },
                },
              }}
                {...register("bairro")}
                onChange={(e) => setSocio({ ...socio, bairro: e.target.value })}
                value={socio.bairro}
              />
              <FormLabel>Cidade:</FormLabel>
              <TextField sx={{
                marginBottom: '5px',
                marginRight: '10px',
                height: '3rem',
                '& .MuiInputBase-root': {
                  height: '100%',
                  '& input': {
                    padding: '10px 14px',
                  },
                },
              }}
                {...register("cidade")}
                onChange={(e) => setSocio({ ...socio, cidade: e.target.value })}
                value={socio.cidade}
              />
              <FormLabel>UF:</FormLabel>
              <TextField sx={{
                marginRight: '10px',
                marginBottom: '5px',
                height: '3rem',
                '& .MuiInputBase-root': {
                  height: '100%',
                  '& input': {
                    padding: '10px 14px',
                  },
                },
              }}
                {...register("uf")}
                onChange={(e) => setSocio({ ...socio, uf: e.target.value })}
                value={socio.uf}
              />
              <FormLabel>Complemento:</FormLabel>
              <TextField sx={{
                marginBottom: '5px',
                height: '3rem',
                marginRight: '10px',
                '& .MuiInputBase-root': {
                  height: '100%',
                  '& input': {
                    padding: '10px 14px',
                  },
                },
              }}
                {...register("complemento")}
                onChange={(e) => setSocio({ ...socio, complemento: e.target.value })}
                value={socio.complemento}
              />
              <FormLabel>CEP:</FormLabel>
              <TextField sx={{
                marginRight: '10px',
                height: '3rem',
                '& .MuiInputBase-root': {
                  height: '100%',
                  '& input': {
                    padding: '10px 14px',
                  },
                },
              }}
                {...register("cep")}
                onChange={(e) => {
                  const formattedCep = formatCEP(e.target.value);
                  setSocio({ ...socio, cep: formattedCep });
                }}
                value={socio.cep}
              />
            </Stack>


          </FormControl>
          <Stack>
            <Button
              color="neutral"
              variant="soft"

              onClick={() => { isCreate ? submitCreate(socio) : submitEdit(socio) }}
              sx={{ width: '80px', marginBottom: '20px' }}
            >
              Salvar
            </Button>
          </Stack>
        </Container>


      </Container>
    </>
  )
};
