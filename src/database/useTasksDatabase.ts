import { useSQLiteContext } from "expo-sqlite"
import { tasksProps } from "../utils/types"

export function usetasksDatabase() {
    //retornando o db que foi iniciado em initializeDatabase.ts
    const db = useSQLiteContext()

    // funcao para criar a tarefa
    async function createTask(data: Omit<tasksProps, "id">) {
      const statement = await db.prepareAsync(
        "INSERT INTO myTasks (titulo,nota,data,horaInicio,horaFim,repetir,cor) VALUES ($titulo,$nota,$data,$horaInicio,$horaFim,$repetir,$cor)"
      )
      try {
        const result = await statement.executeAsync({
          $titulo: data.titulo,
          $nota: data.nota,
          $data: data.data,
          $horaInicio: data.horaInicio,
          $horaFim: data.horaFim,
          $repetir: data.repetir,
          $cor: data.cor,
        })
  
        const insertedRowId = result.lastInsertRowId.toLocaleString()
  
        return { insertedRowId }
      } catch (error) {
        throw error
      } finally {
        await statement.finalizeAsync()
      }
    }

    //função para pegar as tarefas
    const getTasks= async(name: string) =>{
      try {
        const query = "SELECT * FROM myTasks WHERE titulo LIKE ?";

        const response = await db.getAllAsync(query, `%${name}%` );

        return(response);
      } catch (error) {
        throw error
      }
    }
    
    //função para filtrar as tarefas
    const filterTask= async(name: string) =>{
      try {
        const query = "SELECT * FROM myTasks WHERE CONCAT(cor, data) LIKE ?";

        const response = await db.getAllAsync<tasksProps>(query, `%${name}%` );
        console.log(name)
        return(response);
      } catch (error) {
        throw error
      }
    }

    //funcao para alterar task
    async function updateTask(data: tasksProps) {
      const statement = await db.prepareAsync(
        "UPDATE myTasks SET titulo= $titulo ,nota= $nota ,data= $data ,horaInicio= $horaInicio ,horaFim= $horaFim ,repetir= $repetir ,cor= $cor WHERE id = $id"
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
        const query =  "DELETE FROM myTasks WHERE id = ?"
        await db.runAsync(query, id);
        console.log('Tarefa deletada com sucesso!'+ id);
        
      } catch (error) {
        console.error("Erro ao recuperar as tarefas:", error);
        return [];
  }
  }
  return { createTask, updateTask, getTasks, deletTasks, filterTask } 
}