const express = require('express');
const router = express.Router();
const validateName = require('../nameValidation');

const courses = [{
    id: 1,
    name: 'course 1'
}, {
    id: 2,
    name: 'course 2'
}, {
    id: 3,
    name: 'course 3'
}];


router.get('/:id', (req, resp) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (course) {
        resp.status(200).send(`Course Found ${course}`);
    } else {
        resp.status(404).send('Course not found');
    }

});


router.post('', (req, resp) => {

    const result = validateName(req.body);
    const {
        error
    } = result;

    if (error) {
        resp.status(400).send(validatedBody.error.details[0].message);
    } else {
        const newCourse = {
            id: courses.length + 1,
            name: req.body.name
        };

        courses.push(newCourse);
        resp.send(newCourse);
    }

});
router.put('/:id', (req, resp) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (course) {

        const result = validateName(req.body);
        const {
            error
        } = result;

        if (error) {
            resp.status(400).send(`Bad Request : ${error}`);
        } else {
            courses.name = req.body.name;
            resp.send(`${result} ${course}`);
        }

    } else {
        resp.status(404).send('Course not found');
    }

});


router.delete('/:id', (req, resp) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        resp.status(404).send('The course with the given ID is not found');
    } else {
        courses.splice(courses.indexOf(course), 1);

        resp.send(courses);
    }
});


module.exports = router;