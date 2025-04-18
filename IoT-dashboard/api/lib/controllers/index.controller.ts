import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import path from 'path';

class IndexController implements Controller {
    public path = '/';
    public router = Router();
    public io: any;

    constructor(io : any) {
        this.io = io;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path + 'emit', this.emitReading);
        this.router.get(this.path, this.serveIndex);

    }
    private emitReading = async (request: Request, response: Response, next: NextFunction) => {
        try {
            this.io.emit("message", 'nowy pomiar');
            response.status(200).json({ res: "ok" });
            setInterval(() => this.io.emit('sensor-data', {temperature: 21.5,humidity: 55,pressure:1005}), 3000);
        } catch (error) {
            console.error("Błąd podczas emisji danych:", error);
            response.status(500).json({ error: "Błąd serwera" });
        }
    };


    private serveIndex = async (request: Request, response: Response) => {
        response.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    }
}

export default IndexController;