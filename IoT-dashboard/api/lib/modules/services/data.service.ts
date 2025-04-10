import DataModel from '../schemas/data.schema';
import {IData} from "../models/data.model";

export default class DataService {


    public async getAll() {
        try {
            const data = await DataModel.find();
            return data;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }
    public async addData(data: IData) {
        try {
            const newData = new DataModel(data);
            await newData.save();
            return 'added';
        } catch (error) {
            throw new Error(`Add data failed: ${error}`);
        }
    }
    public async deleteData(id: string) {
        try {
            const deletedData = await DataModel.findByIdAndDelete(id);
            if (!deletedData) {
                return null;
            }
            return 'deleted';
        } catch (error) {
            throw new Error(`Delete data failed: ${error}`);
        }
    }
}
