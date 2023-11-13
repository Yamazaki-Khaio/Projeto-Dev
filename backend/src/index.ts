import express, { Application, Request, Response } from 'express';
import sequelize from './server/config/sequelize';


class App {
    private app: Application;

    constructor() {
        this.app = express();
        this.routes();

    }
    private routes(): void {
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Index');
        });

    }

    public listen(): void {
        sequelize.authenticate().then(() => {
            this.app.listen(3000, () => {
                console.log('Server running on port 3000');
            });
        }
        ).catch((error) => {
            console.log('',error);
            sequelize.close();
        });
  
}
}

const app = new App();
app.listen();