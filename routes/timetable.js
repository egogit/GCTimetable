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

    // const data = JSON.stringify([
    //     {
    //             groupType: 20,
    //             searchYear: 2023,
    //             searchTerm: 10,
    //             searchUnivCD: "CS0000",
    //             searchDeptCD: "CS0200",
    //     },
    //  {
    //             groupType: 20,
    //             searchYear: 2023,
    //             searchTerm: 10,
    //             searchUnivCD: "CP0000",
    //             searchDeptCD: "CP0610",
    //     },
    // ])
    
    // const formdata = JSON.stringify({
    //     "groupType": 20,
    //     "searchYear": 2023,
    //     "searchTerm": 10,
    //     "searchUnivCD": "CS0000",
    //     "searchDeptCD": "CS0200",
    // })

    const response = await axios.post(
        'https://info.gachon.ac.kr/Ssu1000q/mainSearch.do',
        new URLSearchParams({
            'groupType': '20',
            'searchYear': '2023',
            'searchTerm': '10',
            'searchUnivCD': 'CS0000',
            'searchDeptCD': 'CS0200',
            'searchIsuCD': '002'
        }),
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

        fs.writeFileSync(`${filepath}\\${today.getFullYear() + '-' + (today.getMonth() + 1)+ '-' + today.getDate()+ '-' + (today.getHours() + 1)+ '-' + (today.getMinutes() + 1)+ '-' + (today.getSeconds() + 1)}` + ".json",
            JSON.stringify(res.data.MainData),
            "utf-8"
        );
    })
    .catch((err) => console.log(err));

    
})

module.exports = router;