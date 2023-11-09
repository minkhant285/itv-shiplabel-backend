import { Request, Response } from 'express';
import { CustomerService } from '../services/customer.service';
import { ICustomer, ICustomerInput } from '../models/customer.model';

let customerService = new CustomerService();

//get all users
const getAllCustomers = async (req: Request, res: Response) => {
    let users: ICustomer[] = await customerService.selectCustomers();
    return res.status(200).json({
        data: users,
        status: res.statusCode
    });
};

//get user with id
const getCustomerById = async (req: Request, res: Response) => {
    let id: string = req.params.id;
    let user: ICustomer | null = await customerService.selectCustomerById(id);
    return res.status(200).json({
        data: user,
        status: res.statusCode
    });
};

const getCustomerByName = async (req: Request, res: Response) => {
    let name: string = req.params.name;
    let user: ICustomer[] | null = await customerService.selectCustomerByName(name);
    return res.status(200).json({
        data: user,
        status: res.statusCode
    });
};

const getCustomerByPhone = async (req: Request, res: Response) => {
    let phone: string = req.params.phone;
    let user: ICustomer[] | null = await customerService.selectCustomerByPhone(phone);
    return res.status(200).json({
        data: user,
        status: res.statusCode
    });
};


// updating a user
const updateCustomer = async (req: Request, res: Response) => {
    // get the user id from the req.params
    let id: string = req.params.id;
    // get the data from req.body
    let body: ICustomer = req.body ?? null;
    // return response
    let updated = await customerService.updateCustomer(id, body);
    return res.status(204).json({
        data: updated,
        status: res.statusCode
    });
};

// deleting a user
const deleteCustomer = async (req: Request, res: Response) => {
    // get the user id from req.params
    let id: string = req.params.id;
    // return response
    let deleted = await customerService.deleteCustomer(id);
    // data: `user ID: ${id} deleted successfully`
    return res.status(204).json({
        data: deleted,
        status: res.statusCode
    });
};

// adding a user
const addCustomer = async (req: Request, res: Response) => {
    // get the data from req.body
    let body: ICustomerInput = req.body;
    let created = await customerService.createCustomer(body);
    // return response
    return res.status(201).json({
        data: created,
        status: res.statusCode
    });
};

export default { getCustomer: getCustomerById, getAllCustomers, addCustomer, deleteCustomer, updateCustomer, getCustomerByName, getCustomerByPhone };