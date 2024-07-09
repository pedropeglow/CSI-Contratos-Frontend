import React, {useEffect, useState} from 'react'
import { useCSICareContext } from "../../context";

import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { Form } from './Form';
import { PessoaJuridica } from '../../types/pessoaJuridica';


export const MyPessoasJuridicas = () => {
  const navigate = useNavigate()
  const {pessoasJuridicas, getPessoasJuridicas, deletePessoasJuridicas, getPessoaJuridicaPdf} = useCSICareContext()

  const [isFormOpen, setOpenForm] = useState(false)
  const [isCreate, setCreate] = useState(false)
  const [isDeleteConfirmation, setDeleteConfirmation] = useState(false)

  const [pessoaJuridica, setPessoaJuridica] = useState({} as PessoaJuridica)

  useEffect(() => {getPessoasJuridicas()}, [])


  useEffect(() => {
    !!isFormOpen &&  !!isCreate ? navigate('/pessoasJuridicas/create') : 
    !!isFormOpen &&  !isCreate ? navigate('/pessoasJuridicas/edit') :
     navigate('/pessoasJuridicas/dashboard')
  }, [isFormOpen])

  const handleOpenCreateForm = () => {
    setPessoaJuridica({} as PessoaJuridica)
    setOpenForm(true)
    setCreate(true)
  }

  const handlePdf = (pessoaJuridica: PessoaJuridica) => {
		getPessoaJuridicaPdf(pessoaJuridica);
	};

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
    const response = await deletePessoasJuridicas(id)
    setDeleteConfirmation(false)
    setPessoaJuridica({} as PessoaJuridica)
    getPessoasJuridicas()

  }

  return (
    <Container sx={{display: 'flex', flexDirection:'column',}}>
      {
      !isFormOpen 
      ?
        <Dashboard handleOpenCreateForm={handleOpenCreateForm} handleOpenEditForm={handleOpenEditForm} handleOpenDeleteConfirmation={handleOpenDeleteConfirmation} handlePdf={handlePdf}/>  
      :
        <Form isCreate={isCreate} handleReturnButton={handleReturnButton} currentPessoaJuridica={pessoaJuridica}></Form>
       }

       {
        !!isDeleteConfirmation && (
          <Dialog open={isDeleteConfirmation} onClose={() => setDeleteConfirmation(false)}>
          <DialogTitle>Deletar PJ</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Você confirma que gostaria de deletar PJ?
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
