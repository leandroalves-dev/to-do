import './TaskList.css';
import { ITask } from '../Interface/Task';

interface Props{
  description: ITask[]
  onEdit: (title: ITask) => void
  onDelete: (id: number) => void
}

const TaskList = ({ description, onEdit, onDelete }: Props) => {
  return (
    <>
      {description.map(task => (
        <div className='tasks' key={task.id}>
          {task.title}
          <div className="btns">
            <button onClick={() => onEdit(task)}>Editar</button>
            <button onClick={() => onDelete(task.id)}>Deletar</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default TaskList