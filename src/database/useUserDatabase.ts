import { useSQLiteContext } from "expo-sqlite";
import { UserProps } from "../utils/types.module";
import { hashSync, compare } from "bcrypt-ts";

export function useUserDatabase() {
  //retornando o db que foi iniciado em initializeDatabase.ts
  const db = useSQLiteContext()

  // funcao para criar usuário 
  async function createUser({ nome, email, senha }: Omit<UserProps, "id">) {
    const hash = hashSync(senha, 5);    
    const statement = await db.prepareAsync(
      "INSERT INTO users (nome,email,senha) VALUES ($nome,$email,$senha)"
    )
    try {
      const result = await statement.executeAsync({
        $nome: nome,
        $email: email,
        $senha: hash,
      })
      const insertedRowId = result.lastInsertRowId.toLocaleString()
      return { insertedRowId }
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }
  
  // funcao para retornar usuário
  const readUser = async (email: string, senha: string): Promise<UserProps> => {
    try {
      const query = "SELECT * FROM users WHERE email == ?";
      const user = await db.getFirstAsync(query, [email, senha]) as UserProps;
      const hash = user.senha
      if (!user) {
        throw new Error("Usuário não encontrado");
      }
      const isPasswordValid = await compare(senha, hash);
      if (!isPasswordValid) {
        throw new Error("Senha incorreta");
      }
      console.log("usuario logado",user)
      return user;
    } catch (error) {
      throw error
    }
  }

  // funcao para alterar dados do usuário 
  async function updateUser(data: UserProps) {
    const statement = await db.prepareAsync(
      "UPDATE users SET email= $email ,name= $name ,senha= $senha WHERE id = $id"
    )
    try {
      await statement.executeAsync({
        $id: data.id,
        $email: data.email,
        $nome: data.nome,
        $senha: data.senha,
      })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  // funcao para deletar usuário
  async function deletUser(id: string) {
    try {
      const query = "DELETE FROM users WHERE id = ?"
      await db.runAsync(query, id);
      console.log('Usuario deletado' + id);

    } catch (error) {
      console.error("Erro ao deletar usuario:", error);
      return [];
    }
  }

  return { createUser, readUser, updateUser, deletUser }
}
