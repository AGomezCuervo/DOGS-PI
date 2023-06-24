import Routes, { Router } from "express";
import dogRouter from "./dogRouter";
import temperamentRouter from "./temperamentRouter";

const router = Routes()

router.use('/dogs', dogRouter)
router.use('/temperaments', temperamentRouter)


export default router;