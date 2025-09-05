import express from "express"
import authUser from "../middlewares/auth.middleware.js"


const router = express.Router()

router.post('/',authUser)

export default router