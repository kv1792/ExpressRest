const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const validateName = require('./nameValidation');
const logger = require('./middlewares/logger');


const app = express();

app.use(express.json()); // Makes the req body in json format and sets to req.body
app.use(express.static('public')); // This middleware is used to serve request for static files eg: images, txt files
app.use(helmet()); // This middleware is used to add headers to the req
app.use(morgan('tiny')); //avoid using for production environments
app.use(logger); // custom built middleware for the purpose of logging for every request

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

app.get('/', (req, resp) => {

    resp.send('Hello World, coming from Express');

});

app.get('/api/courses/:id', (req, resp) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (course) {
        resp.status(200).send(`Course Found ${course}`);
    } else {
        resp.status(404).send('Course not found');
    }

});


app.post('/api/courses', (req, resp) => {

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
app.put('/api/courses/:id', (req, resp) => {
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


app.delete('/api/courses/:id', (req, resp) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        resp.status(404).send('The course with the given ID is not found');
    } else {
        courses.splice(courses.indexOf(course), 1);

        resp.send(courses);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}....`));