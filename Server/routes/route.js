import { Router } from "express";
import {generateStep} from "../controllers/controller.js"

const router = Router()
router.post('/', generateStep)

export default router;