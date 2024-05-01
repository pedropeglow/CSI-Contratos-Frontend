import { Container, Box, IconButton, Avatar, TextField, Typography, Grid, useTheme, css, Stack, Alert   } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useCSICareContext } from '../../context';
import { PessoaJuridica } from '../../types/pessoaJuridica';
import { useState, useEffect } from 'react';
import { Select, Input, FormControl, FormLabel, Button } from '@mui/joy';


interface FormWrapperProps {
  theme: any
}

const schema = yup.object().shape({
  name: yup.string().required("Campo nome é obrigatório"),
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
  } = useForm<PessoaJuridica>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const theme = useTheme();
  const {createPessoaJuridica, updatePessoaJuridica} = useCSICareContext()
  const [pessoaJuridica, setPessoaJuridica] = useState<PessoaJuridica>(currentPessoaJuridica)

  const submitCreate = async (data: PessoaJuridica) => {
    const response = await createPessoaJuridica(data)

    if (response?.status == 201) {
      handleReturnButton()
    }
  };

  const submitEdit = async (data: PessoaJuridica) => {
    const response = await updatePessoaJuridica(data)
    if (response?.status === 200) {
      handleReturnButton()
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
          <Typography variant="h5">{!!isCreate ? "Adicione uma Pessoa Juridica" : "Edite PJ" }</Typography>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input 
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
