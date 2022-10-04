import { Router, Request, Response } from "express";
import multer from 'multer';
import {CreateUserController} from './controllers/user/CreateUserController'
import {AuthUserController} from './controllers/user/AuthUserController'
import {DetailUserController} from './controllers/user/DetailUserController'
import {CreateCategoryController} from './controllers/category/CreateCategoryController'
import {ListCategoryController} from './controllers/category/ListCategoryController'
import {CreateProductController} from './controllers/product/CreateProductController'
import uploadConfig from './config/multer'
import {ListByCategoryController} from './controllers/product/ListByCategoryController'
import {CreateOrderController} from './controllers/order/CreateOrderController'
import { isAuthenticated} from './middlewares/isAuthenticated'
import {RemoveOrderController} from './controllers/order/RemoveOrderController'
import {AddItemController } from './controllers/order/AddItemController'
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import {SendeOrderController} from './controllers/order/SendOrderController'
import {ListOrdersController} from './controllers/order/ListOrdersController'
import {DetailOrderController} from './controllers/order/DetailOrderController'
import {FinishOrderController} from './controllers/order/FinishOrderController'

const router = Router();

const upload = multer(uploadConfig.upload("./tmp")); 

// ROTAS USERS
router.post('/users', new CreateUserController().handle)

router.post('/session', new  AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)

// Rotas de categoria

router.post('/category', isAuthenticated, new CreateCategoryController().handle)

router.get('/category', isAuthenticated, new ListCategoryController().handle)

// Rotas produto

router.post('/product', isAuthenticated, upload.single('file'),  new CreateProductController().handle)

router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)


// rotas order

router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)

router.put('/order/send', isAuthenticated, new SendeOrderController().handle)
router.get('/orders', isAuthenticated, new ListOrdersController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)






export {router};