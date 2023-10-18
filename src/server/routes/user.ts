import { Request, Response, Router } from "express";
import { authMiddleWare } from "../middlewares/auth";

const router = Router();

router.post('/config', authMiddleWare, async (req: Request, res: Response) => {
    return res.status(200).json({ message: 'nothing changed' })
});

export default router;