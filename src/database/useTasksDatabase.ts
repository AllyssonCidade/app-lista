import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite"
import { tasksProps } from "../utils/types.module"
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export function usetasksDatabase() {
    //retornando o db que foi iniciado em initializeDatabase.ts
    const db = useSQLiteContext()
    const { user } = useContext(AuthContext); 



    // funcao para criar a tarefa
    async function createTask(data: Omit<tasksProps, "id">) {
      
      const statement = await db.prepareAsync(
        "INSERT INTO myTask (titulo,nota,data,horaInicio,horaFim,repetir,cor,userId) VALUES ($titulo,$nota,$data,$horaInicio,$horaFim,$repetir,$cor,$userId)"
      )
      const userId = user?.id
      if (!userId) {
        throw new Error("User ID is undefined");
    }
      try {
        const result = await statement.executeAsync({
          $titulo: data.titulo,
          $nota: data.nota,
          $data: data.data,
          $horaInicio: data.horaInicio,
          $horaFim: data.horaFim,
          $repetir: data.repetir,
          $cor: data.cor,
          $userId: userId,
        })
  
        const insertedRowId = result.lastInsertRowId.toLocaleString()
  
        return { insertedRowId }
      } catch (error) {
        throw error
      } finally {
        await statement.finalizeAsync()
      }
    }
    
    //função para puxar e filtrar as tarefas
    const filterTask= async(name: string) =>{
      const userId = user?.id

    if (!userId) {
      throw new Error("User ID is undefined");
  }
      try {
        const query = "SELECT * FROM myTask WHERE (CONCAT(cor, data) LIKE ?) AND userId = ? ";

        const response = await db.getAllAsync<tasksProps>(query, `%${name}%`, userId );

        return(response);
      } catch (error) {
        throw error
      }
    }
    //funcao para alterar task
    async function updateTask(data: tasksProps) {
      const statement = await db.prepareAsync(
        "UPDATE myTask SET titulo= $titulo ,nota= $nota ,data= $data ,horaInicio= $horaInicio ,horaFim= $horaFim ,repetir= $repetir ,cor= $cor WHERE id = $id"
      )
      try {
        await statement.executeAsync({
          $id: data.id,
          $titulo: data.titulo,
          $nota: data.nota,
          $data: data.data,
          $horaInicio: data.horaInicio,
          $horaFim: data.horaFim,
          $repetir: data.repetir,
          $cor: data.cor,
        })
  
      } catch (error) {
        throw error
      } finally {
        await statement.finalizeAsync()
      }
    }
    
    //função para excluir uma task
    async function deletTasks(id:string) {
      try {
        const query =  "DELETE FROM myTask WHERE id = ?"
        await db.runAsync(query, id);
        console.log('Tarefa deletada com sucesso!'+ id);
      } catch (error) {
        console.error("Erro ao recuperar as tarefas:", error);
        return [];
  }
  }
  return { createTask, updateTask, deletTasks, filterTask } 
}