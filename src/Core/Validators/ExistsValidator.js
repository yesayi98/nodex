import {QueryTypes} from 'sequelize';

export default async function ExistsValidator(name, value, param) {
  const {connection} = await this.connection;

  const [{count}] = await connection.query(
    `SELECT COUNT(${name}) AS count  
       FROM ${param}
       WHERE ${name} = :${name}`,
    {
      replacements: {[name]: value},
      type: QueryTypes.SELECT
    }
  );

  if (count === 0) {
    throw new Error(`${name} does not exist in table ${param}`);
  }

  return value;
}