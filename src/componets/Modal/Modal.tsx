import React from 'react';
import { ITask } from '../Interface/Task';
import './Modal.css';

interface Props{
  currentTitle: ITask | null
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  closeModal: () => void
  handleSave: () => void
}

const Modal = ({ currentTitle, handleChange, handleSave, closeModal }: Props) => {
  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Editar Tarefa</h2>
        <input
          type="text"
          value={currentTitle!.title}
          onChange={handleChange}
        />
        <button onClick={handleSave}>Salvar</button>
        <button onClick={closeModal}>Cancelar</button>
      </div>
    </div>
  )
}

export default Modal