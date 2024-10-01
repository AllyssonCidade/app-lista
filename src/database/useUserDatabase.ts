import { useSQLiteContext } from "expo-sqlite";
import { UserProps } from "../utils/types.module";
import { hashSync, compare } from "bcrypt-ts";
import { compareSync } from "bcrypt-ts";

export function useUserDatabase() {
  //retornando o db que foi iniciado em initializeDatabase.ts
  const db = useSQLiteContext()

  // funcao para criar usuário 
  async function createUser({ nome, email, senha }: Omit<UserProps, "id">) {
    const hash = hashSync(senha);    
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
      return user;
    } catch (error) {
      throw error
    }
  }

  // funcao para wditar dados do usuário 
  async function updateUser(data: any) {
    const hashAtual = hashSync(data.senha);
    const hash = hashSync(data.novaSenha);
  
    try {
      const query = "SELECT senha FROM users WHERE id = ?";
      const result = await db.getFirstAsync<any>(query, [data.id]);
  
      if (!result || !result.senha) {
        throw new Error("Usuário não encontrado ou senha não recuperada");
      }
      const senhaDb = result.senha; 
    
      const isPasswordValid = await compare(data.senha, senhaDb);
  
      if (!isPasswordValid) {
        throw new Error("Senha incorreta");
      }

    } catch (error) {
      console.log("Erro na validação da senha: ", error);
      return; 
    }
    const statement = await db.prepareAsync(
      "UPDATE users SET email = $email, nome = $nome, senha = $senha WHERE id = $id"
    );
  
    try {
      await statement.executeAsync({
        $id: data.id,
        $email: data.email,
        $nome: data.nome,
        $senha: hash || hashAtual, 
      });
      
    } catch (error) {
      console.log("Erro ao atualizar os dados: ", error);
      throw error;
    } finally {
      await statement.finalizeAsync();
      console.log("Atualização finalizada");
    }
  }
  
  // funcao para deletar usuário
  async function deletUser(id: number) {
    try {
      const delet = "DELETE FROM users WHERE id = ?";
      const result = await db.runAsync(delet, [id]);
  
      if (result?.changes > 0) { 
        console.log('Usuário deletado com sucesso');
      } else {
        console.log('Nenhum usuário encontrado para deletar');
      }
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  }

  return { createUser, readUser, updateUser, deletUser }
}
