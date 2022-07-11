import {useState} from 'react';

const AddTask = ({onAdd}) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault();
        if (!text) {
            alert('Please add a text!')
            return;
        }
        onAdd({text, day, reminder})

        setText('')
        setDay('')
        setReminder('')
    }

    return <form className='add-form' onSubmit={onSubmit}>
    <div className='form-control'>
        <label>Task</label>
        <input type='text' placeholder='Add Task' value={text} onChange={(e)=>setText(e.target.value)} />
    </div>

    <div className='form-control'>
        <label>Day and Time</label>
        <input type='text' placeholder='Add day and time' value={day} onChange={(e)=>setDay(e.target.value)} />
    </div>

    <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input type='checkbox' value={reminder} onChange={(e)=>setReminder(e.currentTarget.checked)} checked={reminder} />
    </div>
    <input type='submit'  className="btn btn-block" value='Add Task' />
    </form>;
}


export default AddTask;