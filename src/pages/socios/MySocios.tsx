import React, {useEffect, useState} from 'react'
import { useCSICareContext } from "../../context";

import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { Form } from './Form';
import { Socio } from '../../types/socios';


export const MySocios = () => {
  const navigate = useNavigate()
  const {socios, getSocios, deleteSocio} = useCSICareContext()

  const [isFormOpen, setOpenForm] = useState(false)
  const [isCreate, setCreate] = useState(false)
  const [isDeleteConfirmation, setDeleteConfirmation] = useState(false)

  const [socio, setSocio] = useState({} as Socio)

  useEffect(() => {getSocios()}, [])


  useEffect(() => {
    !!isFormOpen &&  !!isCreate ? navigate('/socios/create') : 
    !!isFormOpen &&  !isCreate ? navigate('/socios/edit') :
     navigate('/socios/dashboard')
  }, [isFormOpen])

  const handleOpenCreateForm = () => {
    setSocio({} as Socio)
    setOpenForm(true)
    setCreate(true)
  }

  const handleOpenEditForm = (socio: Socio) => {
    setOpenForm(true)
    setCreate(false)
    setSocio(socio)
  }

  const handleOpenDeleteConfirmation = (socio: Socio) => {
    setDeleteConfirmation(true)
    setSocio(socio)
  }

  const handleReturnButton = () => {
    setSocio({} as Socio)
    setOpenForm(false)
    setCreate(false)
  }

  const handleDeleteSocioButton = async (id: string) => {
    const response = await deleteSocio(id)
    setDeleteConfirmation(false)
    setSocio({} as Socio)
    getSocios()

  }

  return (
    <Container sx={{display: 'flex', flexDirection:'column',}}>
      {
      !isFormOpen 
      ?
        <Dashboard handleOpenCreateForm={handleOpenCreateForm} handleOpenEditForm={handleOpenEditForm} handleOpenDeleteConfirmation={handleOpenDeleteConfirmation}/>  
      :
        <Form isCreate={isCreate} handleReturnButton={handleReturnButton} currentSocio={socio}></Form>
       }

       {
        !!isDeleteConfirmation && (
          <Dialog open={isDeleteConfirmation} onClose={() => setDeleteConfirmation(false)}>
          <DialogTitle>Deletar socio</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Você confirma que gostaria de deletar o socio?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmation(false)}>Cancelar</Button>
            <Button onClick={() => handleDeleteSocioButton(socio.id)}>Deletar</Button>
          </DialogActions>
        </Dialog>
        )
       }
    </Container>
  )
};
