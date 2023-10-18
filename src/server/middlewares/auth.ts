import { Request, Response, NextFunction } from "express"
import { User } from "../../db/models/user/model"
import { UserCRUD } from "../../db/models/user/crud"

const authMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    const user_tg_name = req.body.telegram_name
    if (!user_tg_name) {
        return res.status(401).json({error: 'Telegram name is required'})
    }
    const user = await UserCRUD.findOneByTgUserId(user_tg_name)
    if (!user) {
        return res.status(401).json({error: 'User not found'})
    }

    next()
}

export {
    authMiddleWare
}