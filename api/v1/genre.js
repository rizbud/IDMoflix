import express from "express";
import { successResponse } from "../../helpers/response";

const router = express.Router()

router.get('/', (req, res) => {
  successResponse(res, {message: 'Genres'})
})

export default router