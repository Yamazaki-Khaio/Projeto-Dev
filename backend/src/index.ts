import express, { Application, Request, Response } from 'express';
import sequelize from './server/config/sequelize';
import router from './server/services/routers';


class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.configureServer();
    this.routes();
  }
// utilizado para configurar o servidor express para receber requisições JSON
  private configureServer(): void {
    this.app.use(express.json());
  }
// utilizado para configurar as rotas da aplicação
  private routes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.send('Index');
    });

    this.app.use('', router)

  }

  // utilizado para iniciar o servidor
  public async startServer(): Promise<void> {
    try {
      sequelize;
      console.log('Sequelize has been authenticated successfully');
      this.app.listen(3000);
      console.log('Server is running on port 3000');
    } catch (error) {
      console.error('Error:', error);
      sequelize.close();
      
    }
  }
}


const app = new App();
app.startServer();
