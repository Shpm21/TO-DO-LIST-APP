import { Storage } from '@ionic/storage';
import { useEffect, useState } from 'react';
import { Asignature } from './models/asignature.model';
import { Task } from './models/task.model';

const TASK_KEY= 'my-task';
const ASIGNATURE_KEY = 'my-asignature';

export const useStorage = () => {
    const [store, setStore] = useState<Storage>();
    const [task, setTask] = useState<Task[]>([]);
    const [allTask, setAllTask]  = useState<Task[]>([]);
    const [asignature, setAsignature] = useState<Asignature[]>([]);
    const [allAsignature, setAllAsignature] = useState<Asignature[]>([]);
    
    useEffect(() => {
        const initStorage = async () => {
            const newStore = new Storage({
                name: '_mydb',
            });
            const store = await newStore.create();
            setStore(store);
            const storedTask = await store.get(TASK_KEY);
            
            setTask(storedTask);
        }
        initStorage();
    },[]);

    useEffect(() => {
        const getAsignature = async () => {
            const asignature = await store?.get(ASIGNATURE_KEY);
            if (asignature) {
                setAsignature(asignature);
            }
        }
        getAsignature();
    }, []);
    

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
        const task = await store?.get(TASK_KEY);
        await store?.set(TASK_KEY, [...task, newTask]);
    }

    const getAllTask = async () => {
        const storedTask = await store?.get(TASK_KEY);
        setAllTask(storedTask);
    }

    const deleteTask = async (id: string) => {
        const task = await store?.get(TASK_KEY);
        const newTask = task.filter((task: Task) => task.id !== id);
        await store?.set(TASK_KEY, newTask);
    
    }

    const updateTask = async (id: string, name: string, description: string, nameAsignature: string, priority: number, date: string) => {
        const task = await store?.get(TASK_KEY);
        const newTask = task.map((task: Task) => {
            if (task.id === id) {
                task.name = name;
                task.description = description;
                task.nameAsignature = nameAsignature;
                task.priority = priority;
                task.date = date;
            }
            return task;
        });
        await store?.set(TASK_KEY, newTask);
    }

    const addAsignature = async (name: string, credit: number) :Promise<void> => {
        const newAsignature = {
            name: name,
            credit: credit
        };
        const asignature = await store?.get(ASIGNATURE_KEY);
        await store?.set(ASIGNATURE_KEY, [...asignature, newAsignature]);
        
    }
    
    const getAllAsignatures = async () => {
        const storedAsignature = await store?.get(ASIGNATURE_KEY);
        setAllAsignature(storedAsignature);
        return storedAsignature ? storedAsignature : [];
    }

    const deleteAsignature = async (name: string) => {
        const storedAsignature = await store?.get(ASIGNATURE_KEY);
        const newAsignatures = storedAsignature.filter((asignature: Asignature) => asignature.name !== name);
        await store?.set(ASIGNATURE_KEY, newAsignatures);
    }

    const updateAsignature = async (name: string, credit: number) => {

    }

    const getTaskByNameAsignature = async (name: string) => {
        const storedTask = await store?.get(TASK_KEY);
        const taskByNameAsignature = storedTask.filter((task: Task) => task.nameAsignature === name);
        return taskByNameAsignature;
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

