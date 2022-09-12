import { useEffect, useState } from 'react';
import { Asignature } from './models/asignature.model';
import { Task } from './models/task.model';
import { capOpenStorageOptions, capValueResult, CapacitorDataStorageSqlite } from 'capacitor-data-storage-sqlite';

const TASK_KEY= 'my-task';
const ASIGNATURE_KEY = 'my-asignature';

export const useStorage = () => {
    const [task, setTask] = useState<Task[]>([]);
    const [allTask, setAllTask]  = useState<Task[]>([]);
    const [asignature, setAsignature] = useState<Asignature[]>([]);
    const [allAsignature, setAllAsignature] = useState<Asignature[]>([]);
    

    const taskStoreOptions: capOpenStorageOptions = {
        database: 'mydb',
        table: 'task',
    }

    useEffect(() => {
        const initTasks = async () => {
            await CapacitorDataStorageSqlite.openStore(taskStoreOptions);
            const storeKeyTasks: capValueResult = await CapacitorDataStorageSqlite.get({key: TASK_KEY});
            const storedTasks = JSON.parse(storeKeyTasks.value);
            setTask(storedTasks);
        }


        initTasks();
    }, []);

    useEffect(() => {

        const initAsignatures = async () => {
            await CapacitorDataStorageSqlite.openStore(taskStoreOptions);
            const storeKeyAsignatures: capValueResult = await CapacitorDataStorageSqlite.get({key: ASIGNATURE_KEY});
            const storedAsignatures = JSON.parse(storeKeyAsignatures.value);
            setAsignature(storedAsignatures);
        }
        initAsignatures();
    },[]);
    

    const addTask = async (name: string, description: string, nameAsignature: string, priority: number, date: string) => {
        const newTask = {
            id: ''+new Date().getTime(),
            name: name,
            description: description,
            nameAsignature: nameAsignature,
            priority: priority,
            date: date,
            done: false
        };
        await CapacitorDataStorageSqlite.openStore(taskStoreOptions);
        const storeKeyTasks: capValueResult = await CapacitorDataStorageSqlite.get({key: TASK_KEY});
        const storedTasks = JSON.parse(storeKeyTasks.value);
        const newTasks = [...storedTasks, newTask];
        await CapacitorDataStorageSqlite.set({key: TASK_KEY, value: JSON.stringify(newTasks)});
    }

    const getAllTask = async () => {
        await CapacitorDataStorageSqlite.openStore(taskStoreOptions);
        const storeKeyTasks: capValueResult = await CapacitorDataStorageSqlite.get({key: TASK_KEY});
        const storedTasks = JSON.parse(storeKeyTasks.value);
        setAllTask(storedTasks);
    }

    const deleteTask = async (id: string) => {
        await CapacitorDataStorageSqlite.openStore(taskStoreOptions);
        const storeKeyTasks: capValueResult = await CapacitorDataStorageSqlite.get({key: TASK_KEY});
        const storedTasks = JSON.parse(storeKeyTasks.value);
        const newTasks = storedTasks.filter((task: Task) => task.id !== id);
        await CapacitorDataStorageSqlite.set({key: TASK_KEY, value: JSON.stringify(newTasks)});
    
    }

    const updateTask = async (id: string, name: string, description: string, nameAsignature: string, priority: number, date: string) => {
        await CapacitorDataStorageSqlite.openStore(taskStoreOptions);
        const storeKeyTasks: capValueResult = await CapacitorDataStorageSqlite.get({key: TASK_KEY});
        const storedTasks = JSON.parse(storeKeyTasks.value);
        const newTask = storedTasks.map((task: Task) => {
            if (task.id === id) {
                task.name = name;
                task.description = description;
                task.nameAsignature = nameAsignature;
                task.priority = priority;
                task.date = date;
            }
            return task;
        });
        await CapacitorDataStorageSqlite.set({key: TASK_KEY, value: JSON.stringify(newTask)});
    }

    const addAsignature = async (name: string, credit: number) :Promise<void> => {
        const newAsignature = {
            name: name,
            credit: credit
        };
        await CapacitorDataStorageSqlite.openStore(taskStoreOptions);
        const storeKeyAsignatures: capValueResult = await CapacitorDataStorageSqlite.get({key: ASIGNATURE_KEY});
        const storedAsignatures = JSON.parse(storeKeyAsignatures.value);
        const newAsignatures = [...storedAsignatures, newAsignature];
        await CapacitorDataStorageSqlite.set({key: ASIGNATURE_KEY, value: JSON.stringify(newAsignatures)});
        
    }
    
    const getAllAsignatures = async () => {
        await CapacitorDataStorageSqlite.openStore(taskStoreOptions);
        const storeKeyAsignatures: capValueResult = await CapacitorDataStorageSqlite.get({key: ASIGNATURE_KEY});
        const storedAsignatures = JSON.parse(storeKeyAsignatures.value);
        return storedAsignatures;
    }

    const deleteAsignature = async (name: string) => {

        await CapacitorDataStorageSqlite.openStore(taskStoreOptions);
        const storeKeyAsignatures: capValueResult = await CapacitorDataStorageSqlite.get({key: ASIGNATURE_KEY});
        const storedAsignatures = JSON.parse(storeKeyAsignatures.value);
        const newAsignatures = storedAsignatures.filter((asignature: Asignature) => asignature.name !== name);
        await CapacitorDataStorageSqlite.set({key: ASIGNATURE_KEY, value: JSON.stringify(newAsignatures)});
    }

    const updateAsignature = async (name: string, credit: number) => {
        await CapacitorDataStorageSqlite.openStore(taskStoreOptions);
        const storeKeyAsignatures: capValueResult = await CapacitorDataStorageSqlite.get({key: ASIGNATURE_KEY});
        const storedAsignatures = JSON.parse(storeKeyAsignatures.value);
        const newAsignatures = storedAsignatures.map((asignature: Asignature) => {
            if (asignature.name === name) {
                asignature.credit = credit;
            }
            return asignature;
        });
        await CapacitorDataStorageSqlite.set({key: ASIGNATURE_KEY, value: JSON.stringify(newAsignatures)});
    }

    const getTaskByNameAsignature = async (name: string) => {
        await CapacitorDataStorageSqlite.openStore(taskStoreOptions);
        const storeKeyTasks: capValueResult = await CapacitorDataStorageSqlite.get({key:  TASK_KEY});
        const storedTasks= JSON.parse(storeKeyTasks.value);

        const tasksByNameAsignature = storedTasks.filter((task: Task) => task.nameAsignature === name);
        return tasksByNameAsignature;
    }

    return {
        task,
        allTask,
        addTask,
        getAllTask,
        getTaskByNameAsignature,
        asignature,
        getAllAsignatures,
        addAsignature,
        deleteAsignature
    }
}

