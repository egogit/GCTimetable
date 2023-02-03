const express = require('express');
const axios = require('axios');
const Timetable = require('../models/timetable');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res)=> {
    res.render('timetable');
});

router.get('/update', async (req, res)=> {

    const searchURL = 'https://info.gachon.ac.kr/Ssu1000q/mainSearch.do'
    const searchParams = [{
        'groupType': '20',
        'searchYear': '2023',
        'searchTerm': '10',
        'searchUnivCD': 'CS0000',
        'searchDeptCD': 'CS0200',
        'searchIsuCD': '002'
    },
    {
        'groupType': '20',
        'searchYear': '2023',
        'searchTerm': '10',
        'searchUnivCD': 'CP0000',
        'searchDeptCD': 'CP0610',
        'searchIsuCD': '002'
    }];

    for await (const param of searchParams) {
        await axios.post(
            searchURL,
            param,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }
        )
        .then((res) => {
            const filepath = path.join(__dirname, "..\\data");
            const today = new Date();
    
            fs.writeFileSync(`${filepath}\\${param.searchDeptCD}` + ".json",
                JSON.stringify(res.data.MainData),
                "utf-8"
            );
        })
        .catch((err) => {
            res.status(400).end();
        })
    }
    res.status(200).end();
    
})

router.get('/class', async (req, res) => {

    const code = req.query.code;
    const deptCd = {
        "CE": "CS0200",
        "FM": "CP0610"
    }
    const filepath = path.join(__dirname, "..\\data");
    
    fs.readFile(`${filepath}\\${deptCd[code]}` + ".json", "utf8", (err, data) => {
        if(err) {
            console.log(err);
            res.status(400).end();
        }else {
            res.json(data);
        }
    });
})

module.exports = router;