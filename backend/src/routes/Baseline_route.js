import express from "express";
const router = express.Router();

router.get("/", function (req, res) {
	res.send("YOU ARE IN INDEX");
});

export default router;
