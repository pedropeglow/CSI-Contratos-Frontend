import { Container, Box, IconButton, Avatar, TextField, Typography, Grid, useTheme, css, Stack, Alert   } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useCSICareContext } from '../../context';
import { Socio } from '../../types/socios';
import { useState, useEffect } from 'react';
import Option from '@mui/joy/Option';
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
  currentSocio: Socio
}

export const Form = ({isCreate, handleReturnButton, currentSocio}: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Socio>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const theme = useTheme();
  const {createSocio, updateSocio} = useCSICareContext()
  const [socio, setSocio] = useState<Socio>(currentSocio)

  const submitCreate = async (data: Socio) => {
    const response = await createSocio(data)

    if (response?.status == 201) {
      handleReturnButton()
    }
  };

  const submitEdit = async (data: Socio) => {
    const response = await updateSocio(data)
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
          <Typography variant="h5">{!!isCreate ? "Adicione um Socio" : "Edite seu pet" }</Typography>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input 
                {...register("name")}
                onChange={(e) => setSocio({...socio, name: e.target.value})}
                value={socio.name}
              />              
            </FormControl>
          <Stack>
            <Button
              color="neutral"
              variant="soft"

                onClick={() => {isCreate ? submitCreate(socio) : submitEdit(socio)}}
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
