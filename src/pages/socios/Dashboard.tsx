import React, {useEffect, useState} from 'react'
import { useCSICareContext } from "../../context";

import { Card, CardContent, Typography, CardActions, Button, Container, Box, IconButton, Avatar, Stack } from '@mui/material'
import { Socio } from '../../types/socios';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface DashboardProps {
  handleOpenCreateForm: () => void
  handleOpenEditForm: (socio: Socio) => void
  handleOpenDeleteConfirmation: (socio: Socio) => void
}

export const Dashboard = ({handleOpenCreateForm, handleOpenEditForm, handleOpenDeleteConfirmation}: DashboardProps) => {
  const {socios, getSocios} = useCSICareContext()

  useEffect(() => {getSocios()}, [])

  const dateFormat = (date: any ) => {
    const deleteTimestamp = date?.split('T')[0]
    const day = deleteTimestamp.split('-')[2]
    const month = deleteTimestamp.split('-')[1]
    const year = deleteTimestamp.split('-')[0]

    return `${day}/${month}/${year}`
  }

  return(
    <>
      <Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '40px 0px'}}>
        <IconButton onClick={handleOpenCreateForm}>
          <AddIcon sx={{ fontSize: '30px'}}/>
        </IconButton>
      </Box>    
      <Container sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center'}}>
	  <h1>socio</h1>

      </Container>
    </>
  )
  
};
