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
      "INSERT INTO myTask (titulo,nota,data,horaInicio,horaFim,cor,stats,userId) VALUES ($titulo,$nota,$data,$horaInicio,$horaFim,$cor,$stats,$userId)"
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
        $cor: data.cor,
        $stats: "Em Aberto",
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
  const filterTask = async (data: string, stats: string) => {
    const userId = user?.id;
    if (!userId) {
      throw new Error("User ID is undefined");
    }
    try {
      if (data === "" && stats === "") {
        const query = "SELECT * FROM myTask WHERE userId = ?";
        const response = await db.getAllAsync<tasksProps>(query, userId);
        return response;
      }

      if (stats === "" && data !== "") {
        const query = "SELECT * FROM myTask WHERE data LIKE ? AND userId = ?";
        const response = await db.getAllAsync<tasksProps>(query, `%${data}%`, userId);
        return response;
      }

      const query = "SELECT * FROM myTask WHERE stats LIKE ? AND data LIKE ? AND userId = ?";
      const response = await db.getAllAsync<tasksProps>(query, stats, `%${data}%`, userId);
      return response;
    } catch (error) {
      throw error;
    }
  }


  //funcao para alterar task
  async function updateTask(data: tasksProps) {
    const statement = await db.prepareAsync(
      "UPDATE myTask SET titulo= $titulo ,nota= $nota ,data= $data ,horaInicio= $horaInicio ,horaFim= $horaFim, cor = $cor WHERE id = $id"
    )
    try {
      await statement.executeAsync({
        $id: data.id,
        $titulo: data?.titulo,
        $nota: data?.nota,
        $data: data?.data,
        $horaInicio: data?.horaInicio,
        $horaFim: data?.horaFim,
        $cor: data?.cor,
      })

    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  //altera o estatus da tarefa (concluido/em andamento)
  async function toggleStats(data: any) {
    const statement = await db.prepareAsync(
      "UPDATE myTask SET stats= $stats WHERE id = $id"
    )
    try {
      await statement.executeAsync({
        $id: data.id,
        $stats: data.stats,
      })

    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  //função para excluir uma task
  async function deletTasks(id: string) {
    try {
      const query = "DELETE FROM myTask WHERE id = ?"
      await db.runAsync(query, id);
      console.log('Tarefa deletada com sucesso!' + id);
    } catch (error) {
      console.error("Erro ao recuperar as tarefas:", error);
      return [];
    }
  }

  //função para excluir toda a tabela(consequentemente todas as tasks)
  function deletTable() {
    try {
      const query = "DROP TABLE IF EXISTS myTask"
      db.execAsync(query);
      console.log('sucesso!');
    } catch (error) {
      console.error("Erro");
      return [];
    }
  }

  return { createTask, updateTask, deletTasks, filterTask, toggleStats, deletTable }
}