import { Container, Box, IconButton, Avatar, TextField, Typography, Grid, useTheme, css, Stack, Alert, MenuItem, NativeSelect } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useCSICareContext } from '../../context';
import { useState, useEffect } from 'react';
import Option from '@mui/joy/Option';
import { Select, Input, FormControl, FormLabel, Button } from '@mui/joy';
import { formatCPF } from '../../utils/cpfFormat';
import { formatRg } from '../../utils/rgFormat';
import { formatCEP } from '../../utils/cepForm';
import { useNavigate } from 'react-router-dom';
import { PessoaJuridica } from '../../types/pessoaJuridica';
import { Socio } from '../../types/socios';
import { Cnae } from '../../types/cnae';

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

export const Form = ({ isCreate, handleReturnButton, currentPessoaJuridica }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    control
  } = useForm<PessoaJuridica>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate()
  const { createPessoasJuridicas, updatePessoasJuridicas, getSocios, socios, getCnaes, cnaes } = useCSICareContext()
  const [pessoaJuridica, setPessoaJuridica] = useState<PessoaJuridica>(currentPessoaJuridica)

  const submitCreate = async (data: PessoaJuridica) => {
    const response = await createPessoasJuridicas(data);

    if (response?.status == 201) {
      handleReturnButton()
    }
  };

  const fetchData = async () => {
    await getCnaes();
    await getSocios();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSocio1Change = (event: any) => {
    const value = event.target.value;
    setPessoaJuridica({ ...pessoaJuridica, socio1Id: parseInt(value) });
    console.log('pessoaJuridica', pessoaJuridica)
  };

  const handleSocio2Change = (event: any) => {
    const value = event.target.value;
    setPessoaJuridica({ ...pessoaJuridica, socio2Id: parseInt(value) });
  };

  const handleCnaeChange = (event: any) => {
    const value = event.target.value;
    setPessoaJuridica({ ...pessoaJuridica, cnaeId: parseInt(value) });
  };

  const submitEdit = async (data: PessoaJuridica) => {
    const response = await updatePessoasJuridicas(data)
    if (response?.status === 204) {
      handleReturnButton()
      navigate('/pessoasJuridicas/dashboard')
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
          <Typography variant="h5">{!!isCreate ? "Adicione PJ" : "Edite seu PJ"}</Typography>
          <FormControl>

            <Stack sx={{
              display: 'grid',
              gridTemplateColumns: '0.7fr 2.1fr 1fr',
              padding: '10px',
            }}>
              <FormLabel>Nome PJ:</FormLabel>
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
                {...register("nome")}
                onChange={(e) => setPessoaJuridica({ ...pessoaJuridica, nome: e.target.value })}
                value={pessoaJuridica.nome}
              />
              <FormLabel sx={{ fontStyle: 'italic', paddingTop: '10px' }}>Ex: Sociedade Ltda</FormLabel>
            </Stack>

            <Stack>
              <FormLabel sx={{ fontWeight: 'bold', fontSize: '20px' }}>Endereço da sua Empresa</FormLabel>
              <Stack sx={{
                display: 'grid',
                gridTemplateColumns: '0.4fr 1.8fr',
                padding: '10px',
              }}>
                <FormLabel>Endereço:</FormLabel>
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
                  {...register("endereco")}
                  onChange={(e) => setPessoaJuridica({ ...pessoaJuridica, endereco: e.target.value })}
                  value={pessoaJuridica.endereco}
                />
              </Stack>

              <Stack sx={{
                display: 'grid',
                gridTemplateColumns: '0.6fr 1.3fr 0.4fr 1fr',
                padding: '10px',
              }}>

                <FormLabel>Número:</FormLabel>
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
                  {...register("nroImovel")}
                  onChange={(e) => setPessoaJuridica({ ...pessoaJuridica, nroImovel: e.target.value })}
                  value={pessoaJuridica.nroImovel}
                />
                <FormLabel>Complemento:</FormLabel>
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
                  {...register("complemento")}
                  onChange={(e) => setPessoaJuridica({ ...pessoaJuridica, complemento: e.target.value })}
                  value={pessoaJuridica.complemento}
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
                  onChange={(e) => setPessoaJuridica({ ...pessoaJuridica, bairro: e.target.value })}
                  value={pessoaJuridica.bairro}
                />
                <FormLabel>UF:</FormLabel>
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
                  {...register("uf")}
                  onChange={(e) => setPessoaJuridica({ ...pessoaJuridica, uf: e.target.value })}
                  value={pessoaJuridica.uf}
                />
                <FormLabel>Cidade:</FormLabel>
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
                  {...register("cidade")}
                  onChange={(e) => setPessoaJuridica({ ...pessoaJuridica, cidade: e.target.value })}
                  value={pessoaJuridica.cidade}
                />
                <FormLabel>CEP:</FormLabel>
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
                  {...register("cep")}
                  onChange={(e) => {
                    const formattedCep = formatCEP(e.target.value);
                    setPessoaJuridica({ ...pessoaJuridica, cep: formattedCep });
                  }}
                  value={pessoaJuridica.cep}
                />

              </Stack>
            </Stack>

            <Stack sx={{
              display: 'grid',
              gridTemplateColumns: '0.5fr 0.5fr 1fr',
              padding: '10px',
            }}>
              <FormLabel>Prazo Inicial de Duração: </FormLabel>
              <Controller
                name="prazoInicialDeDuracao"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="date"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setPessoaJuridica({ ...pessoaJuridica, prazoInicialDeDuracao: e.target.value });
                    }}
                    value={field.value || ""}
                    style={{
                      marginBottom: '5px',
                      marginRight: '10px',

                    }}
                  />
                )}
              />
              <FormLabel sx={{ fontStyle: 'italic', paddingTop: '10px' }}>Data de fundação da PJ</FormLabel>
            </Stack>

            <Stack>
              <FormLabel sx={{ fontWeight: 'bold', fontSize: '20px' }}>Adicione seus Sócios</FormLabel>
              <Stack sx={{
                display: 'grid',
                gridTemplateColumns: '0.5fr 1fr 0.5fr 1fr',
                padding: '10px',
              }}>
                <FormLabel>1º Sócio:</FormLabel>
                <NativeSelect
                  sx={{
                    marginRight: '10px', marginBottom: '5px', height: '3rem',
                    '& .MuiInputBase-root': {
                      height: '100%',
                      '& input': {
                        padding: '10px 14px',
                      },
                    },
                  }}
                  value={pessoaJuridica.socio1Id}
                  onChange={handleSocio1Change}
                  inputProps={register("socio1Id")}
                >
                  {socios.map((socio: Socio) => (
                    <option key={socio.id} value={socio.id}>
                      {socio.nome}
                    </option>
                  ))}
                </NativeSelect>
                <FormLabel>Quota 1º Sócio:</FormLabel>
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
                  {...register("quotaSocio1")}
                  onChange={(e) => setPessoaJuridica({ ...pessoaJuridica, quotaSocio1: parseInt(e.target.value) })}
                  value={pessoaJuridica.quotaSocio1}
                />

                <FormLabel>2º Sócio:</FormLabel>
                <NativeSelect
                  sx={{
                    marginRight: '10px', marginBottom: '5px', height: '3rem',
                    '& .MuiInputBase-root': {
                      height: '100%',
                      '& input': {
                        padding: '10px 14px',
                      },
                    },
                  }}
                  value={pessoaJuridica.socio2Id}
                  onChange={handleSocio2Change}
                  inputProps={register("socio2Id")}
                >
                  {socios.map((socio: Socio) => (
                    <option key={socio.id} value={socio.id}>
                      {socio.nome}
                    </option>
                  ))}
                </NativeSelect>
                <FormLabel>Quota 2º Sócio:</FormLabel>
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
                  {...register("quotaSocio2")}
                  onChange={(e) => setPessoaJuridica({ ...pessoaJuridica, quotaSocio2: parseInt(e.target.value) })}
                  value={pessoaJuridica.quotaSocio2}
                />
              </Stack>
            </Stack>

            <Stack>
              <FormLabel sx={{ fontWeight: 'bold', fontSize: '20px' }}>Cnae - Ramo de Atividade de sua Empresa</FormLabel>
              <Stack sx={{
                display: 'grid',
                gridTemplateColumns: '0.5fr 1.5fr 1fr',
                padding: '10px',
              }}>
                <FormLabel>CNAE:</FormLabel>
                <NativeSelect
                  sx={{
                    marginRight: '10px',
                    marginBottom: '5px',
                    border: '20px',
                    height: '3rem',
                    '& .MuiInputBase-root': {
                      height: '100%',
                      '& input': {
                        padding: '10px 14px',
                      },
                    },
                    '& .MuiNativeSelect-select': {
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    },

                  }}
                  value={pessoaJuridica.cnaeId}
                  onChange={handleCnaeChange}
                  inputProps={register("cnaeId")}
                >
                  {cnaes.map((cnae: Cnae) => (
                    <option key={cnae.id} value={cnae.id}>
                      {"[" + cnae.codCnae + "] " + cnae.descCnae}
                    </option>
                  ))}
                </NativeSelect>
              </Stack>

            </Stack>



          </FormControl>
          <Stack>
            <Button
              color="neutral"
              variant="soft"
              onClick={() => { isCreate ? submitCreate(pessoaJuridica) : submitEdit(pessoaJuridica) }}
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
