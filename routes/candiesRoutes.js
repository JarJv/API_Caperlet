import express from "express";
import { listCandies, createCandy } from "../controllers/candiesController.js";

const router = express.Router();

router.get("/candies", listCandies);
router.post("/candies", createCandy);

export default router;