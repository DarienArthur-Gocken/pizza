import express from 'express';

const app = express();

const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

// form data in req.body
app.use(express.urlencoded({ extended: true }));

const orders = [];

app.get('/', (req, res) => {

    //res.sendFile(`${import.meta.dirname}/views/home.html`);
    res.render('home');
});

app.get('/contact-us', (req,res) => {

    res.render('contact');
   // res.sendFile(`${import.meta.dirname}/views/contact.html`);
});

app.get('/confirm', (req,res) => {

    res.render('confirmation');
   // res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

app.get('/admin', (req,res) => {

    res.send(orders);
    //res.sendFile(`${import.meta.dirname}/views/admin.html`);
});

app.post('/submit-order', (req,res) => {

    const order = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        method: req.body.method,
        toppings: req.body.toppings, 
        size: req.body.size,
        comment: req.body.comment,
        timestamp: new Date()
    };

    orders.push(order);
    console.log(orders);

    res.render('confirmation', { order: order});
    //res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});