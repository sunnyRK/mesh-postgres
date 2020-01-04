import {Router} from 'express';
const router = Router();
import {getUser, getUserById, createUser,updateUser, deleteUser} from '../controllers/index.controller'

router.get('/user', getUser);
router.get('/user/:signature', getUserById);
router.post('/user', createUser);
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

export default router;