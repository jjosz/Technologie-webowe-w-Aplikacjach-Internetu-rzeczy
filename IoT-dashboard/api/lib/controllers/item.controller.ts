import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import path from 'path';

//8AlrvGJq3SUr01d1

//

class ItemController implements Controller {
    public path = '/*';
    public router = Router();
    public items: any[] = [5,4,3,2,1];

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.delete("/items/:id",this.deleteItem)
        this.router.get("/items/:id",this.getItem)
        this.router.put("/items/:id",this.updateItem)
        this.router.post("/items",this.createNewItem);
        this.router.get("/items",this.getItems)
        this.router.get(this.path, this.serveIndex);
    }

    private serveIndex = async (request: Request, response: Response) => {
        response.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    }
    private createNewItem = async (request: Request, response: Response) => {
        const name = request.body.elem;

        this.items.push(name);
        return response.status(201).json( name );
    }
    private getItems = async (request: Request, response: Response) => {
        response.status(200).json(this.items);
    }
    private getItem = async (request: Request, response: Response) => {
        let id: number = parseInt(request.params.id);
        if(this.items.length>id && id>=0)
        response.status(200).json(this.items[id]);
    }
    private updateItem = async (request: Request, response: Response) => {
        let id: number = parseInt(request.params.id);
        const name = request.body.elem;
        if(this.items.length>id && id>=0)
        {
        this.items[id] = name;
        response.status(200).json(this.items);
        }
    }
    private deleteItem = async (request: Request, response: Response) => {
        let id: number = parseInt(request.params.id);
        if(this.items.length>id && id>=0)
        {
        this.items.splice(id, 1);
        response.status(200).json(this.items);
        }
    }
}

export default ItemController;