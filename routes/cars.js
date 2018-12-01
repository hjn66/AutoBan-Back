const express = require("express");
const router = express.Router();
pool = require('../startup/db')


router.get("/", async (req, res, next) => {
    var result = await pool.query('SELECT 1 + 1 AS solution')
        console.log(result);
    return res.json({ success: true, msg: result });
})

module.exports = router;
