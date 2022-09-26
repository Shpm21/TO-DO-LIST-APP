import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { useEffect, useState } from "react";
import { Asignature } from "../models/asignature.model";
import { MiniTask } from "../models/miniTask.model";
import { Task } from "../models/task.model";
import { SQLiteServices } from "./sqliteServices";

let database: SQLiteDBConnection;

export const useStorage = () => {
  const sqlite = new SQLiteServices();
  sqlite.initializePlugin();

  const [task, setTask] = useState<Task[]>([]);
  const [allTask, setAllTask] = useState<Task[]>([]);
  const [asignature, setAsignature] = useState<Asignature[]>([]);
  const [allAsignature, setAllAsignature] = useState<Asignature[]>([]);
  const [dbConnect, setDbConnect] = useState<SQLiteDBConnection>();

  useEffect(() => {
    const connect = async () => {
      const db: SQLiteDBConnection = await sqlite.createConnection(
        "mydb.db",
        false,
        "no-encryption",
        1
      );
      database = db;
      await db.open();
      await db.execute(
        "CREATE TABLE IF NOT EXISTS task (id TEXT PRIMARY KEY, name TEXT, description TEXT, nameAsignature TEXT, priority INTEGER, date TEXT, done BOOL)"
      );
      await db.execute(
        "CREATE TABLE IF NOT EXISTS asignature (name TEXT, credit INTEGER)"
      );

      await db.execute(
        "CREATE TABLE IF NOT EXISTS miniTask (id TEXT PRIMARY KEY, id_task TEXT, title TEXT, description TEXT, priority INTEGER, done BOOL)"
      )
      setDbConnect(db!);
    };
    connect();
  }, []);

  useEffect(() => {
    const initAsignatures = async () => {
      const result = await database.query("SELECT * FROM asignature");
      setAllAsignature([
        ...allAsignature,
        ...result?.values!.map((asignature: any) => {
          return {
            name: asignature[0],
            credit: asignature[1],
          };
        }),
      ]);
    };
    initAsignatures();
  }, []);

  useEffect(() => {
    const initTasks = async () => {
      const result = await database.query("SELECT * FROM task");
      setAllTask([
        ...allTask,
        ...result?.values!.map((task: any) => {
          return {
            id: task[0],
            name: task[1],
            description: task[2],
            nameAsignature: task[3],
            priority: task[4],
            date: task[5],
            done: task[6],
          };
        }),
      ]);
    };
    initTasks();
  }, allTask);

  const getMiniTasksByTaskId = async (id: string) => {      
      await database.open();
      const result = await database.query("SELECT * FROM miniTask WHERE id_task = ?", [id]);
      return result?.values!

  }

  const addMiniTask = async (id_task: string, title: string, description: string, priority: number) => {
    try {
      
      await database.open();
      const newMiniTask: MiniTask ={
        id: Math.random().toString(36).substring(7),
        id_task,
        title,
        description,
        priority,
        done: false
      }
      await database.execute(
        `INSERT INTO miniTask (id, id_task, title, description, priority, done) VALUES ("${newMiniTask.id}", ${newMiniTask.id_task}, "${newMiniTask.title}", "${newMiniTask.description}", ${newMiniTask.priority}, ${newMiniTask.done})`
      );
    } catch (error) {
      alert(error)
    }
  }

  const updateMiniTask = async (id: string, id_task: string, title: string, description: string, priority: number, done: boolean) => {
    await database.open();
    await database.execute(
      `UPDATE miniTask SET id_task = ${id_task}, title = ${title}, description = ${description}, priority = ${priority}, done = ${done} WHERE id = ${id}`
    );
  }

  const addTask = async (
    name: string,
    description: string,
    nameAsignature: string,
    priority: number,
    date: string
  ) => {
    try {
      await database.open();
      const newTask: Task = {
        id: "" + new Date().getTime(),
        name: name,
        description: description,
        nameAsignature: nameAsignature,
        priority: priority,
        date: date,
        done: false,
      };
      await database.execute(
        `INSERT INTO task (id, name, description, nameAsignature, priority, date, done) VALUES ("${newTask.id}", "${newTask.name}", "${newTask.description}", "${newTask.nameAsignature}", ${newTask.priority}, ${newTask.date}, ${newTask.done})`
      );
      setAllTask([...allTask, newTask]);
    } catch (error) {
      alert(`No se pudo agregar la tarea: ${error}`);
    }
  };

  const getAllTask = async () => {
    await database.open();
    const result = await database.query(
      `SELECT * FROM TASK ORDER BY date`
    );
    return result?.values!;
  };

  const addAsignature = async (name: string, credit: number) => {
    try {
      await database.open();
      const newAsignature: Asignature = {
        name: name,
        credit: credit,
      };
      await database.execute(
        `INSERT INTO asignature (name, credit) VALUES ("${newAsignature.name}", ${newAsignature.credit});`
      );
    } catch (error) {
      alert("No se pudo insertar en la base de datos, error: " + error);
    }
  };

  const deleteTask = async (id: string) => {
    await database.open();
    await database.execute(`DELETE FROM task WHERE id = "${id}"`);
    setAllTask(allTask.filter((task) => task.id !== id));
  };

  const deleteAsignature = async (name: string) => {
    await database.open();
    await database.execute(`DELETE FROM asignature WHERE name = "${name}"`);
    await database.execute(`DELETE FROM task WHERE nameAsignature = "${name}"`);
    setAllAsignature(
      allAsignature.filter((asignature) => asignature.name !== name)
    );
    setAllTask(allTask.filter((task) => task.nameAsignature !== name));
  };

  const updateTask = async (
    id: string,
    name: string,
    description: string,
    nameAsignature: string,
    priority: number,
    date: string,
    done: boolean
  ) => {
    await database.open();
    await database.execute(
      `UPDATE task SET name = "${name}", description = "${description}", nameAsignature = "${nameAsignature}", priority = ${priority}, date = "${date}", done = ${done} WHERE id = ${id}`
    );
  };

  const updateAsignature = async (name: string, credit: number) => {
    await dbConnect?.execute(
      `UPDATE asignature SET description = ${credit} WHERE name = ${name}`
    );
  };

  const getAllAsignatures = async () => {
    await database.open();
    const result = await database.query("SELECT * FROM asignature");
    return result?.values!;
  };

  const getTaskByNameAsignature = async (nameAsignature: string) => {
    await database.open();
    const result = await database?.query(
      "SELECT * FROM task WHERE nameAsignature = ?",
      [nameAsignature]
    );
    return result?.values!;
  };

  const getTaskById = async (id: string) => {
    await database.open();
    const result = await database?.query("SELECT * FROM task WHERE id = ?", [
      id,
    ]);
    return result?.values!;
  };

  return {
    task,
    allTask,
    addTask,
    getAllTask,
    updateTask,
    getTaskByNameAsignature,
    asignature,
    getAllAsignatures,
    addAsignature,
    deleteAsignature,
    deleteTask,
    getTaskById,
    getMiniTasksByTaskId,
    addMiniTask,
    updateMiniTask,
  };
};
