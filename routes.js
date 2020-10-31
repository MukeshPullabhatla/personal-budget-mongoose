const express = require("express")
const budget=require("./models/budgetData")
const router = express.Router()

router.get("/budget", async (req, res) => {
	const data = await budget.find()
	res.send(data)
})

router.post("/postnewdata", async (req, res) => {
	
	const budgetVals = new budget({
		title: req.body.title,
        budget: req.body.cost,
        color: req.body.color
	})
	await budgetVals.save()
	res.send(budgetVals)
})

module.exports = router