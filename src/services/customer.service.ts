import { AppDataSource } from "../db/data-source";
import { Customer } from "../db/entities/customer.entity";
import { ICustomer } from "../models/customer.model";
import { Repository, UpdateResult, DeleteResult } from "typeorm";

export class CustomerService {
    private customerRepository: Repository<Customer>;

    constructor() {
        this.customerRepository = AppDataSource.getRepository(Customer)
    }

    async selectCustomers(query: { take: number, skip: number }): Promise<{ customers: ICustomer[], totalCus: number }> {
        let res = await this.customerRepository.find({ take: query.take, skip: query.skip, order: { created_at: 'DESC' } });
        let totalCus: number = await this.customerRepository.count();

        return {
            customers: res,
            totalCus
        };
        // return new Promise(resolve => setTimeout(resolve, 1000, res));
    }

    async selectCustomerById(id: string): Promise<ICustomer | null> {
        return await this.customerRepository.findOne({ where: { id } });
    }

    async selectCustomerByName(name: string): Promise<ICustomer[] | []> {
        // return await this.customerRepository.createQueryBuilder('customers')
        //     .where("customers.name like :name", { name: `%${name}%` })
        //     .getMany();
         return await this.customerRepository.find({
            where: { name: ILike(`%${name}%`) }
        })
    }

    async selectCustomerByPhone(phone: string): Promise<ICustomer[] | []> {
        return await this.customerRepository.createQueryBuilder('customers')
            .where("customers.phone like :phone", { phone: `%${phone}%` })
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
