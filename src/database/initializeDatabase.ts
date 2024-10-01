import { SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {
  try {
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        senha TEXT NOT NULL
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS myTask (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        nota TEXT NOT NULL,
        data TEXT NOT NULL,
        horaInicio TEXT NOT NULL,
        horaFim TEXT NOT NULL,
        cor TEXT NOT NULL,
        stats TEXT NOT NULL,
        userId INTEGER NOT NULL
      );
    `);
    console.log('Tabelas criadas ou já existem.');
  } catch (error) {
    console.error('Erro ao criar a tabela myTask:', error);
  }
}
