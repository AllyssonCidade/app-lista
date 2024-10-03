import { createContext, useEffect, useState } from 'react'
import { usetasksDatabase } from '../database/useTasksDatabase';


export const TasksContext = createContext<any>({});

export const TasksProvider = ({ children }: any) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const { filterTask } = usetasksDatabase();
  const [notifications, setNotifications] = useState<any[]>([]);

  const onFilter = async (stats: string, data: string) => {
    try {
      const response = await filterTask(stats, data)
      setTasks(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const taskNotification = () => {
      const newNotifications = tasks.filter((task: any) => {
        const [day, month, year] = task.data.split("/");
        const taskDate = new Date(`${year}-${month}-${day}`);
        const currentDate = new Date();
        return taskDate < currentDate && task.stats === 'Em Aberto';
      });
      setNotifications(newNotifications);
    };
  
    taskNotification();
  }, [tasks]);

  return (
    <TasksContext.Provider value={{ onFilter, tasks, notifications }}>
      {children}
    </TasksContext.Provider>
  );
};