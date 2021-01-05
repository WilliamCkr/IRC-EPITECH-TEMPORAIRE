const express = require("express");
const router = express.Router();
const persons=[
    {id:0,name:'John'},
    {id:1,name:'Jane'}
];

function getPerson(id) {
    return persons.find(p => p.id === +id);
}

function insertPerson(p) {
    p.id = persons.length;
    persons.push(p);
    return p;
}

function removePerson(id) {
    persons = persons.filter(p => p.id !== +id);
}

function updatePerson(person) {
    persons = persons.map(p => p.id === +person.id ? person : p);
}

router
    .patch('/person/:id',
        (req, res) => {
            updatePerson(req.body);
            res
                .status(200)
                .json(req.body);
        })

router
    .delete('/person/:id',
        (req, res) => {
            removePerson(req.params.id);
            res
                .status(204)
                .end();
        })

router
    .post('/person',
        (req, res) => {
            const p = insertPerson(req.body);
            res.status(201)
                .set('Location', '/persons/' + p.id)
                .json(p);
        })

// router
//     .get("/persons/:id",(req,res)=>{
//             res.json(getPerson(req.params.id));
//         })

// router
//     .get("/persons",(req,res)=>{
//             res.json(persons);
//         })

router
   .get("/", (req, res) => {
       res.json("Hello world!!");
   });

router
    .use((req, res) => {
        res.status(404);
        res.json({
            error: "Coucou la page est CASSE, mais au moins tu reçois ce message d'erreur"
        });
    });

module.exports = router;