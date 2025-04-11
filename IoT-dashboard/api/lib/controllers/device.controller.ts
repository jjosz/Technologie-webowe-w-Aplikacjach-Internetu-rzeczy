import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import path from 'path';

class DeviceController implements Controller {
    public path = '/device/';
    public router = Router();
    public io: any;

    constructor(io : any) {
        this.io = io;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path + 'emit', this.emitReading);

    }
    private emitReading = async (request: Request, response: Response, next: NextFunction) => {
        try {
            this.io.emit('sensor-data', {temperature: request.params.temperature,humidity: request.params.humidity,pressure:request.params.pressure});
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

export default DeviceController;