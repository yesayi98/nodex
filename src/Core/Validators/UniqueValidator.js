import {QueryTypes} from 'sequelize';

export default function UniqueValidator(name, value, param) {
  this.connection.then(async ({connection}) => {
    const [{count}] = await connection.query(
      `SELECT COUNT(${name}) AS count  
       FROM ${param}
       WHERE ${name} = :${name}`,
      {
        replacements: {[name]: value},
        type: QueryTypes.SELECT
      }
    );

    if (count > 0) {
      throw new Error(`${name} should be unique`);
    }
  }).catch((reason) => {
    throw new Error(reason.message);
  });

  return value;
}