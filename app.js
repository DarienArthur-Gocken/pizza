import express from 'express';

const app = express();

const PORT = 3000;

app.use(express.static('public'));

// form data in req.body
app.use(express.urlencoded({ extended: true }));

const orders = [];

app.get('/', (req, res) => {

    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.get('/contact-us', (req,res) => {

    res.sendFile(`${import.meta.dirname}/views/contact.html`);
});

app.get('/confirm', (req,res) => {

    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

app.get('/admin', (req,res) => {

    res.sendFile(`${import.meta.dirname}/views/admin.html`);
});

app.post('/submit-order', (req,res) => {

    console.log(req.body);
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});