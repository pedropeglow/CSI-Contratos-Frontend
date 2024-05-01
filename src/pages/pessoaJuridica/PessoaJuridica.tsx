import React, {useEffect, useState} from 'react'
import { useCSICareContext } from "../../context";

import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { Form } from './Form';
import { PessoaJuridica } from '../../types/pessoaJuridica';


export const MyPessoaJuridica = () => {
  const navigate = useNavigate()
  const {pessoaJuridicas, getPessoaJuridicas, deletePessoaJuridica} = useCSICareContext()

  const [isFormOpen, setOpenForm] = useState(false)
  const [isCreate, setCreate] = useState(false)
  const [isDeleteConfirmation, setDeleteConfirmation] = useState(false)

  const [pessoaJuridica, setPessoaJuridica] = useState({} as PessoaJuridica)

  useEffect(() => {getPessoaJuridicas()}, [])


  useEffect(() => {
    !!isFormOpen &&  !!isCreate ? navigate('/pessoaJuridica/create') : 
    !!isFormOpen &&  !isCreate ? navigate('/pessoaJuridica/edit') :
     navigate('/pessoaJuridica/dashboard')
  }, [isFormOpen])

  const handleOpenCreateForm = () => {
    setPessoaJuridica({} as PessoaJuridica)
    setOpenForm(true)
    setCreate(true)
  }

  const handleOpenEditForm = (pessoaJuridica: PessoaJuridica) => {
    setOpenForm(true)
    setCreate(false)
    setPessoaJuridica(pessoaJuridica)
  }

  const handleOpenDeleteConfirmation = (pessoaJuridica: PessoaJuridica) => {
    setDeleteConfirmation(true)
    setPessoaJuridica(pessoaJuridica)
  }

  const handleReturnButton = () => {
    setPessoaJuridica({} as PessoaJuridica)
    setOpenForm(false)
    setCreate(false)
  }

  const handleDeletePessoaJuridicaButton = async (id: string) => {
    const response = await deletePessoaJuridica(id)
    setDeleteConfirmation(false)
    setPessoaJuridica({} as PessoaJuridica)
    getPessoaJuridicas()

  }

  return (
    <Container sx={{display: 'flex', flexDirection:'column',}}>
      {
      !isFormOpen 
      ?
        <Dashboard handleOpenCreateForm={handleOpenCreateForm} handleOpenEditForm={handleOpenEditForm} handleOpenDeleteConfirmation={handleOpenDeleteConfirmation}/>  
      :
        <Form isCreate={isCreate} handleReturnButton={handleReturnButton} currentPessoaJuridica={pessoaJuridica}></Form>
       }

       {
        !!isDeleteConfirmation && (
          <Dialog open={isDeleteConfirmation} onClose={() => setDeleteConfirmation(false)}>
          <DialogTitle>Deletar Pessoa Juridica</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Você confirma que gostaria de deletar o Pessoa Juridica?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmation(false)}>Cancelar</Button>
            <Button onClick={() => handleDeletePessoaJuridicaButton(pessoaJuridica.id)}>Deletar</Button>
          </DialogActions>
        </Dialog>
        )
       }
    </Container>
  )
};
