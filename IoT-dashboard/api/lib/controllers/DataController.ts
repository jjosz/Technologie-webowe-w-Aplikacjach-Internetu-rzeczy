import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import DataService from '../modules/services/data.service';
import { IData } from '../modules/models/data.model';


class DataController implements Controller {
    public path = '/api/data';
    public router = Router();
    private dataService = new DataService();


    constructor() {
        this.initializeRoutes();
    }


    private initializeRoutes() {
        this.router.get(`${this.path}/get`, this.getAll);
        this.router.post(`${this.path}/add`, this.addData);
        this.router.delete(`${this.path}/delete/:id`, this.deleteData);
         };
    private getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
             const data = await this.dataService.getAll();
             res.status(200).json(data);
             } catch (error) {
             next(error);
             }
    };

    private addData = async (request: Request, response: Response) => {
             const { temperature, pressure, humidity, deviceId, readingDate } = request.body;
             if (!temperature || !pressure || !humidity || !deviceId) {
                 return response.status(400).send();
             }
             await this.dataService.addData({ temperature, pressure, humidity, deviceId, readingDate });
             response.send('Added');
    }

    private deleteData = async (request: Request, response: Response) => {
             const { id } = request.params;

             const deletedData = await this.dataService.deleteData(id);
             if (deletedData) {
                 response.send('Deleted');
             } else {
                 response.status(404).send();
             }
    }
}


export default DataController;