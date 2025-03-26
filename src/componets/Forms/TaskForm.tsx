import React, { useEffect, useState } from 'react';

import './TaskForm.css';
import { ITask } from '../Interface/Task';
import TaskList from './TaskList';
import Modal from '../Modal/Modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TaskForm = () => {
  
  const [newTitle, setNewTitle] = useState<ITask[]>(() =>{
    const storageTasks = localStorage.getItem('MyTasks');
    return storageTasks ? JSON.parse(storageTasks) : [];
  });

  const [title, setTitle] = useState<string>('');

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [currentTitle, setCurrentTitle] = useState<ITask | null>(null);

  useEffect( () => {
    localStorage.setItem('MyTasks', JSON.stringify(newTitle));
  },[newTitle]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(title === ''){
      toast.error('Por favor, preencha o campo!')
    }else{
      const task = {id: Date.now(), title: title, isEditing: false}
      setNewTitle([...newTitle, task])
      toast.success('Tarefa cadastrada com sucesso!')
      setTitle('');
      console.log(newTitle)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(currentTitle){
      setCurrentTitle({...currentTitle, title: e.target.value});
    }
    console.log(currentTitle)
  }

  const handleEdit = (title: ITask) => {
    setCurrentTitle(title);
    setModalOpen(true);
  }

  const handleSave = () => {
    if(currentTitle){
      setNewTitle(newTitle.map(title => title.id === currentTitle.id ? currentTitle : title))
      setModalOpen(false);
      setCurrentTitle(null)
    }
  }

  const handleDelete = (id: number) => {
      setNewTitle( newTitle.filter(title => title.id !== id ))
  }

  const closeModal = () => {
    setModalOpen(false);
    setCurrentTitle(null);
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        pauseOnHover={false}
        theme="dark"
      />
      <form onSubmit={handleSubmit}>
        <div className='add'>
          <span>+</span>
          <input
              type="text"
              name="title"
              placeholder="Adicione uma tarefa"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </form>
      {newTitle.length === 0 && (
        <h3 className='msg'>Ainda não tem tarefas cadastradas!</h3>
      )}
      <TaskList description={newTitle} onEdit={handleEdit} onDelete={handleDelete} />
      {currentTitle && (
        <Modal currentTitle={currentTitle} handleSave={handleSave} handleChange={handleChange} closeModal={closeModal} />
      )}
    </>
  )
}

export default TaskForm