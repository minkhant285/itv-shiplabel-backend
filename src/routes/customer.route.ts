import express, { Request, Response } from 'express';
import controller from '../controllers/customer.controller';

const router = express.Router();

router.get('/customers', controller.getAllCustomers);
router.get('/customers/:take/:skip', controller.getAllCustomers);
router.get('/customer/:id', controller.getCustomer);
router.get('/customer/s/:name', controller.getCustomerByName);
router.get('/customer/s/p/:phone', controller.getCustomerByPhone);
router.put('/customer/:id', controller.updateCustomer);
router.delete('/customer/:id', controller.deleteCustomer);
router.post('/customer', controller.addCustomer);

export = router;