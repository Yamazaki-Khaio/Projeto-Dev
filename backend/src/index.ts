import express, { Application, Request, Response } from 'express';
import sequelize from './server/config/sequelize';
import ContaRouters from './server/services/conta/contaRouters';

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

    this.app.use('/Conta', ContaRouters);
  }

  // utilizado para iniciar o servidor
  public async startServer(): Promise<void> {
    try {
      await sequelize.authenticate();
      console.log('Sequelize has been authenticated successfully');
      await this.app.listen(3000);
      console.log('Server is running on port 3000');
    } catch (error) {
      console.error('Error:', error);
      sequelize.close();
    }
  }
}

const app = new App();
app.startServer();
