import pool from "../libs/connectionDb.js";

export const createUserDb = async (firstname, lastname, email, password) => {
  const query = {
    text: `
        INSERT INTO users (firstname, lastname, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
    values: [firstname, lastname, email, password],
  };

  const { rows } = await pool.query(query);

  return rows[0];
};

export const findOneEmailUser = async (email) => {
  const query = {
    text: `
      SELECT firstname, lastname, password FROM users
      WHERE email = $1
    `,
    values: [email],
  };

  const { rows } = await pool.query(query);

  return rows[0];
};

export const updateDataUser = async (
  firstname,
  lastname,
  password,
  id,
  email
) => {
  const query = {
    text: `
      UPDATE users
      SET firstname = $1, lastname = $2, password = $3, updateat = CURRENT_TIMESTAMP
      WHERE userid = $4 AND email = $5
      RETURNING firstname, lastname, email, createdat, updateat
      `,
    values: [firstname, lastname, password, id, email],
  };

  const { rows } = await pool.query(query);

  return rows[0];
};

export const deleteOneUser = async (id, email) => {
  const query = {
    text: `
      DELETE FROM users
      WHERE userid = $1 AND email = $2
    `,
    values: [id, email],
  };

  const { rowCount } = await pool.query(query);

  return rowCount;
};
