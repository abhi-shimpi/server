
const express = require("express");
const Response = require("../model/Response");

const router = express.Router();

const CSVParser = require('json2csv').Parser;


//Get response of specific form in excel sheet 
router.get('/responses/:id', async (req, res) => {

    try {
        let responsesArray = [];
        var responseData = await Response.find({ formId: req.params.id });
        let i = 0;

        responseData.forEach((response) => {

            var newArr = [];
            response.responses.forEach((arr) => {
                newArr.push(arr.answer);
            })
            let answers = newArr;
            let obj = {}
            for (let i = 1; i <= answers.length; i++) {
                obj[i] = answers[i-1];
            }
            responsesArray.push({ obj });
            i = i + 1;
        })
        const csvFields = ['answer'];
        const csvParser = new CSVParser({ csvFields });
        const csvData = csvParser.parse(responsesArray);

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attatchment: filename=responseData.csv");

        res.status(200).end(csvData);
    }
    catch (err) {
        if (err) throw err;

        res.send({ status: 400, meassage: err.meassage })
    }
})

module.exports = router;