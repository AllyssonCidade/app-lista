import { SQLiteDatabase } from "expo-sqlite";


export async function initializeDatabase(database: SQLiteDatabase) {
  try {
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS myTasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        nota TEXT NOT NULL,
        data TEXT NOT NULL,
        horaInicio TEXT NOT NULL,
        horaFim TEXT NOT NULL,
        repetir TEXT NOT NULL,
        cor TEXT NOT NULL
      );
    `);
    console.log('Tabela myTasks criada ou já existe.');
  } catch (error) {
    console.error('Erro ao criar a tabela myTasks:', error);
  }
}
