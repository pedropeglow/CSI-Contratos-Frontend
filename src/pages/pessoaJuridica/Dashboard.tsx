import React, {useEffect, useState} from 'react'
import { useCSICareContext } from "../../context";

import { Card, CardContent, Typography, CardActions, Button, Container, Box, IconButton, Avatar, Stack } from '@mui/material'
import { PessoaJuridica } from '../../types/pessoaJuridica';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface DashboardProps {
  handleOpenCreateForm: () => void
  handleOpenEditForm: (pessoaJuridica: PessoaJuridica) => void
  handleOpenDeleteConfirmation: (pessoaJuridica: PessoaJuridica) => void
}

export const Dashboard = ({handleOpenCreateForm, handleOpenEditForm, handleOpenDeleteConfirmation}: DashboardProps) => {
  const {pessoaJuridicas, getPessoaJuridicas} = useCSICareContext()

  useEffect(() => {getPessoaJuridicas()}, [])

  return(
    <>
      <Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '40px 0px'}}>
        <IconButton onClick={handleOpenCreateForm}>
          <AddIcon sx={{ fontSize: '30px'}}/>
        </IconButton>
      </Box>    
      <Container sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center'}}>
	  <h1>Pessoa Juridica</h1>

      </Container>
    </>
  )
  
};
