import {Sequelize} from 'sequelize';
import models from '../Models';

export default class DB {
  constructor({driver, host, user, password, database}) {
    this.connection = new Sequelize(database, user, password, {
      host,
      dialect: driver
    });
  }

  getConnection() {
    return this.connection
    // try {
    //   const establishedConnection = await this.connection.authenticate();
    //
    //   console.log('Connection has been established successfully.');
    //
    //   return establishedConnection;
    // } catch (error) {
    //   console.error('Unable to connect to the database:', error);
    // }
  }

  async syncDB() {
    const connection = this.connection;

    models.map(({model, schema, options}) => {
      options.sequelize = connection;
      model.init(schema, options);
    });

    return this
  }
}