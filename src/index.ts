import http from 'http';
import express, { Express } from 'express';
import userRoutes from './routes/users.route';
import customerRoutes from './routes/customer.route';
import "reflect-metadata"
import { AppDataSource } from './db/data-source';
import { envData } from './environment';
import cors from 'cors';

const router: Express = express();
const allowedOrigins = ['http://192.168.100.229:5173'];

const options: cors.CorsOptions = {
    origin: '*'
};

/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

router.use(cors(options))


/** Routes */
// router.use('/', (req, res) => res.send('Hello World!'));
router.use('/api', userRoutes);
router.use('/api', customerRoutes);

/** Error handling */
router.use((req, res) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = envData.app_port;
AppDataSource.initialize().then(() => console.log("DB initialized!!")).catch((err) => console.log(err));
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));