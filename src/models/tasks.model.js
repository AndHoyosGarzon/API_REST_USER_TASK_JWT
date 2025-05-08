import pool from "../libs/connectionDb.js";

export const createOneTask = async (userId, title, description) => {
  const query = {
    text: `
            INSERT INTO tasks (userid, title, description)
            VALUES ($1, $2, $3)
            RETURNING *
        `,
    values: [userId, title, description],
  };

  const { rows } = await pool.query(query);

  return rows[0];
};

export const findOneTask = async (title) => {
  const query = {
    text: `
      SELECT * FROM tasks
      WHERE title = $1
    `,
    values: [title],
  };

  const { rows, rowCount } = await pool.query(query);

  return { rows, rowCount };
};

export const getAllTaskByUser = async (userId) => {
  const query = {
    text: `
      SELECT taskid, title, description, createdat FROM tasks
      WHERE userid = $1
    `,
    values: [userId],
  };

  const { rows, rowCount } = await pool.query(query);
  return rows;
};

export const updateOneTask = async (title, description, taskid) => {
  const query = {
    text: `
      UPDATE tasks
      SET title = $1, description = $2, updateat = CURRENT_TIMESTAMP
      WHERE taskid = $3
      RETURNING *
    `,
    values: [title, description, taskid],
  };

  const { rows } = await pool.query(query);

  return rows[0];
};

export const deleteTaskById = async (taskId, userId) => {
  const query = {
    text: `
      DELETE FROM tasks 
      WHERE taskid = $1 AND userid = $2
    `,
    values: [taskId, userId],
  };
  
  const { rowCount } = await pool.query(query);
  
  return rowCount;
};
