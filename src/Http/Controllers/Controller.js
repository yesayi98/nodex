export default class Controller {
  constructor(app) {
    this.app = app
  }

  response() {
    return this.app.container.get('response')
  }

  async getConnection() {
    const dbConnection = await this.app.container.get('connection');

    return dbConnection.getConnection();
  }
}