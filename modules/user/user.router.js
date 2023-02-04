import { Router } from "express";
import { addUser, allUser, signin, getUserById,updateUser,deleteUser, searshStF, searshFrOrLa, searshStFOrL, searshAge, searshFrAndAge} from "./controller/user.js";

const router = Router()


router.get('/', allUser)
router.get('/searshfr', searshStF)//  Get users which thier firstname starts with(a)
router.get('/searshforl', searshStFOrL)//  Get users which thier firstname or last starts with(a)
router.get('/searshfrorla', searshFrOrLa)//  Get users which thier firstname or lastname contain(a)
router.get('/searshage', searshAge)// Get users which their age greater than 20
router.get('/searshfrandage', searshFrAndAge)// Get users which thier firstname starts with(a) and their age greater than or equal 20
router.get('/:id',getUserById)
router.post('/signup',addUser)
router.post('/signin',signin)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)


export default router