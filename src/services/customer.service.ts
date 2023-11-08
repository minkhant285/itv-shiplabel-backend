import { AppDataSource } from "../db/data-source";
import { Customer } from "../db/entities/customer.entity";
import { ICustomer } from "../models/customer.model";
import { Repository, UpdateResult, DeleteResult } from "typeorm";

export class CustomerService {
    private customerRepository: Repository<Customer>;

    constructor() {
        this.customerRepository = AppDataSource.getRepository(Customer)
    }

    async selectCustomers(): Promise<ICustomer[]> {
        let res = await this.customerRepository.find();
        return res;
        // return new Promise(resolve => setTimeout(resolve, 1000, res));
    }

    async selectCustomerById(id: string): Promise<ICustomer | null> {
        return await this.customerRepository.findOne({ where: { id } });
    }

    async selectCustomerByName(name: string): Promise<ICustomer[] | []> {
        return await this.customerRepository.createQueryBuilder('customers')
            .where("customers.name like :name", { name: `%${name}%` })
            .getMany();
    }

    async createCustomer(customerData: ICustomer): Promise<ICustomer> {
        return await this.customerRepository.save(customerData);
    }

    async updateCustomer(id: string, customerData: ICustomer): Promise<UpdateResult> {
        return await this.customerRepository.update(id, customerData);
    }

    async deleteCustomer(id: string): Promise<DeleteResult> {
        return await this.customerRepository.delete(id);
    }

}