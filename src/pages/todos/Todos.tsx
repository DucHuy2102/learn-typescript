import { FormEventHandler, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { FaEye, FaEyeSlash, FaSave } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { ButtonToggleTheme, ButtonLoginLogout } from '../../components/export';
import { toast } from 'react-toastify';

interface Task {
    id: string;
    content: string;
    isCompleted: boolean;
}

export default function Todos() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [inputTask, setInputTask] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState<{ [key: number]: boolean }>({});

    const toggleExpand = (index: number) => {
        setIsExpanded((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleAddTask: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!inputTask.trim()) return;
        if (!isEditing) {
            const newTask = {
                id: Date.now().toString(),
                content: inputTask,
                isCompleted: false,
            };
            setTasks([...tasks, newTask]);
            toast('Add new task successfully!');
        } else {
            const newTasks = tasks.map((task) => {
                if (task.id === editingTaskId) {
                    return { ...task, content: inputTask };
                }
                return task;
            });
            setTasks(newTasks);
            setIsEditing(false);
            setEditingTaskId(null);
            toast('Edit task successfully!');
        }
        setInputTask('');
    };

    const handleEditTask = (taskId: string) => {
        const taskToEdit = tasks.find((task) => task.id === taskId);
        if (!taskToEdit) return;
        setInputTask(taskToEdit.content);
        setEditingTaskId(taskId);
        setIsEditing(true);
    };

    const handleDeleteTask = (taskId: string) => {
        if (!taskId) return;
        setTasks(tasks.filter((task) => task.id !== taskId));
        toast('Delete task successfully!');
    };

    return (
        <div className='h-screen w-screen relative'>
            {/* header */}
            <div className='absolute top-5 flex items-center justify-between w-full px-5'>
                <ButtonToggleTheme />
                <ButtonLoginLogout />
            </div>

            {/* body */}
            <div className='flex h-screen justify-center items-center flex-col space-y-5'>
                {/* form input */}
                <form className='flex items-center' onSubmit={handleAddTask}>
                    <input
                        autoFocus
                        type='text'
                        value={inputTask}
                        onChange={(e) => setInputTask(e.target.value)}
                        placeholder="What's on your mind?"
                        className='w-[30vw] border border-gray-300 focus:border-blue-500/50 outline-none 
                        text-lg text-[#141a21] font-serif py-1 px-5 rounded-tl-lg rounded-bl-lg'
                    />
                    <div className='flex items-center space-x-1 bg-blue-500/50 outline-none border border-blue-500/50 hover:bg-blue-500 hover:text-white transition-colors duration-200 rounded-tr-lg rounded-br-lg py-1 px-3 text-lg font-serif'>
                        {isEditing ? <FaSave /> : <IoIosAdd size={25} />}
                        <button type='submit'>{isEditing ? 'Save' : 'Add Task'}</button>
                    </div>
                </form>

                {/* list tasks */}
                <ul className='rounded-lg py-2 px-5 w-[35vw] flex flex-col space-y-2'>
                    {tasks.map((task, index) => (
                        <li
                            key={task.id}
                            className='flex justify-between items-center bg-gray-100 px-5 py-3 rounded-lg'
                        >
                            {/* content */}
                            <div className='flex flex-1 overflow-hidden items-center space-x-2 min-w-0'>
                                {/* checkbox */}
                                <input type='checkbox' id={task.id} />

                                {/* content task */}
                                <div
                                    className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
                                        !isExpanded[index] ? 'max-w-[20vw]' : 'max-w-full'
                                    }`}
                                >
                                    <label
                                        htmlFor={task.id}
                                        className={`text-lg text-gray-700 font-serif leading-normal break-words
                                        ${isExpanded[index] ? 'whitespace-pre-wrap' : 'truncate'}`}
                                    >
                                        {task.content}
                                    </label>
                                </div>
                            </div>

                            {/* buttons */}
                            <div className='flex items-center justify-center space-x-2'>
                                {/* button expand content */}
                                <button
                                    className='text-blue-500 hover:underline hover:scale-125 transition duration-150'
                                    onClick={() => toggleExpand(index)}
                                >
                                    {isExpanded[index] ? (
                                        <FaEyeSlash className='text-gray-500' />
                                    ) : (
                                        <FaEye />
                                    )}
                                </button>

                                {/* button edit content */}
                                <button
                                    onClick={() => handleEditTask(task.id)}
                                    className='text-blue-500 hover:scale-125 transition duration-150'
                                >
                                    <CiEdit />
                                </button>

                                {/* button delete content */}
                                <button
                                    onClick={() => handleDeleteTask(task.id)}
                                    className='text-red-500 hover:scale-125 transition duration-150'
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
