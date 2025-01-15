import { FormEventHandler, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { FaEye, FaEyeSlash, FaSave } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { ButtonToggleTheme, ButtonLoginLogout } from '../../components/export';
import { toast } from 'react-toastify';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface Task {
    id: string;
    content: string;
    isCompleted: boolean;
    createdAt?: string;
}

export default function Todos() {
    const navigate = useNavigate();
    const { theme } = useSelector((state: RootState) => state.theme);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [inputTask, setInputTask] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState<{ [key: number]: boolean }>({});
    const { token } = useSelector((state: RootState) => state.user);
    // const token = true;

    // toggle expand content task
    const toggleExpand = (index: number) => {
        setIsExpanded((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    // handle add new task or edit task
    const handleAddTask: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!inputTask.trim()) {
            toast.error('Please enter a task!');
            return;
        }
        if (!isEditing) {
            // add new task
            const newTask = {
                id: Date.now().toString(),
                content: inputTask,
                isCompleted: false,
                createdAt: new Date().toISOString(),
            };
            setTasks([...tasks, newTask]);
            toast('Add new task successfully!');
        } else {
            // edit task
            const newTasks = tasks.map((task) => {
                if (task.id === editingTaskId) {
                    return { ...task, content: inputTask, createdAt: new Date().toISOString() };
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

    // Thêm hàm format thời gian ở đầu component
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();

        // Nếu là task tạo trong ngày hôm nay
        if (date.toDateString() === today.toDateString()) {
            return `Today at ${date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            })}`;
        }

        // Nếu là task tạo trong ngày hôm qua
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        if (date.toDateString() === yesterday.toDateString()) {
            return `Yesterday at ${date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            })}`;
        }

        // Các task cũ hơn
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    };

    // handle edit task by id
    const handleEditTask = (taskId: string) => {
        const taskToEdit = tasks.find((task) => task.id === taskId);
        if (!taskToEdit) return;
        setInputTask(taskToEdit.content);
        setEditingTaskId(taskId);
        setIsEditing(true);
    };

    // handle delete task by id
    const handleDeleteTask = (taskId: string) => {
        if (!taskId) return;
        setTasks(tasks.filter((task) => task.id !== taskId));
        toast('Delete task successfully!');
    };

    // handle check done task by id
    const handleCheckdoneTask = (taskId: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
            )
        );
    };

    return (
        <div className='h-screen w-screen relative'>
            {/* header */}
            <div
                className={`absolute top-5 ${
                    token ? 'flex items-center justify-between w-full px-5' : 'right-5'
                }`}
            >
                {token && <ButtonToggleTheme />}
                <ButtonLoginLogout />
            </div>

            {/* body */}
            {token ? (
                <div className='flex h-screen justify-center items-center pb-32 flex-col space-y-5'>
                    <div className='text-center w-full'>
                        <h1 className='text-4xl font-serif italic'>What's on your mind?</h1>
                    </div>

                    {/* form input */}
                    <form className='flex items-center' onSubmit={handleAddTask}>
                        <input
                            autoFocus
                            type='text'
                            value={inputTask}
                            onChange={(e) => setInputTask(e.target.value)}
                            placeholder="What's on your mind?"
                            className='w-[30vw] border border-gray-300 focus:border-gray-500/50 outline-none 
                            text-lg text-[#141a21] font-serif py-1 px-5 rounded-tl-lg rounded-bl-lg'
                        />
                        <div
                            className='flex items-center space-x-1 bg-gray-500/50 outline-none 
                        border border-gray-500/50 hover:bg-blue-500 hover:text-white transition-colors duration-200
                        rounded-tr-lg rounded-br-lg py-1 px-3 text-lg font-serif'
                        >
                            {isEditing ? <FaSave /> : <IoIosAdd size={25} />}
                            <button type='submit'>{isEditing ? 'Save' : 'Add Task'}</button>
                        </div>
                    </form>

                    {/* list tasks */}
                    <ul className='rounded-lg py-2 px-5 w-[35vw] flex flex-col space-y-2'>
                        {tasks.map((task, index) => (
                            <li
                                key={task.id}
                                className={`flex justify-between items-center cursor-pointer px-5 py-3 rounded-lg
                            ${
                                task.isCompleted
                                    ? 'bg-blue-500/20 dark:bg-blue-500/30'
                                    : 'bg-gray-100 dark:bg-gray-300/50'
                            }
                            transition-colors duration-200 border-none`}
                            >
                                {/* content */}
                                <div className='flex flex-col flex-1 overflow-hidden min-w-0 space-y-1'>
                                    <div className='flex items-center space-x-2'>
                                        <input
                                            type='checkbox'
                                            id={task.id}
                                            checked={task.isCompleted}
                                            onChange={() => handleCheckdoneTask(task.id)}
                                            className='w-4 h-4 cursor-pointer accent-blue-500'
                                        />
                                        <label
                                            htmlFor={task.id}
                                            className={`text-lg font-serif leading-normal break-words
                                            ${
                                                task.isCompleted
                                                    ? 'line-through text-blue-600 dark:text-blue-400'
                                                    : 'text-gray-700 dark:text-gray-800'
                                            }
                                            ${
                                                isExpanded[index]
                                                    ? 'whitespace-pre-wrap'
                                                    : 'truncate'
                                            }
                                            transition-all duration-200`}
                                        >
                                            {task.content}
                                        </label>
                                    </div>

                                    {/* Thời gian */}
                                    <span
                                        className={`text-xs ml-6 italic ${
                                            theme === 'light' ? 'text-gray-500' : 'text-gray-300'
                                        } `}
                                    >
                                        {task.createdAt && formatTime(task.createdAt)}
                                        {task.isCompleted && ' • Completed'}
                                    </span>
                                </div>

                                {/* buttons */}
                                <div className='flex items-center justify-center space-x-2'>
                                    {/* button expand content */}
                                    <button
                                        className={`
                                            ${theme === 'light' ? 'text-blue-500' : 'text-gray-300'}
                                            hover:underline hover:scale-125 transition duration-150`}
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
                                        className={`${
                                            theme === 'light' ? 'text-blue-500' : 'text-gray-300'
                                        } hover:scale-125 transition duration-150 font-semibold`}
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
            ) : (
                <div
                    className={`h-screen w-screen overflow-hidden text-center pt-[20vh]
                bg-[url('/main.jpg')] bg-cover bg-center bg-no-repeat bg-fixed bg-opacity-50`}
                >
                    <h1 className='text-4xl font-serif text-white'>
                        Please{' '}
                        <span
                            onClick={() => navigate('/login')}
                            className='font-bold italic hover:text-yellow-500 cursor-pointer'
                        >
                            login
                        </span>{' '}
                        to use this feature!
                    </h1>
                </div>
            )}
        </div>
    );
}
