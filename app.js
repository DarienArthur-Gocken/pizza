import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

const app = express();

const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

// form data in req.body
app.use(express.urlencoded({ extended: true }));

dotenv.config();

const pool = mysql2.createPool({


    host: process.env.DB_HOST,


    user: process.env.DB_USER,


    password: process.env.DB_PASSWORD,


    database: process.env.DB_NAME,


    port: process.env.DB_PORT


}).promise();

app.get('/db-test', async(req, res) => {
    try {


        const [orders] = await pool.query('SELECT * FROM orders');


        res.send(orders);


    } catch(err) {


        console.error('Database error:', err);


    }


});


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

app.get('/admin', async(req, res) => {
    try {


        const [orders] = await 


        pool.query('SELECT * FROM orders ORDER BY timestamp DESC');


        res.render('admin', { orders });


    } catch(err) {


        console.error('Database error:', err);


    }

});
    
app.post('/submit-order', async (req,res) => {


    // Create a JSON object to store the data
    const order = req.body;
    order.timestamp = new Date()

    // Write a query to insert order into DB
    const sql = "INSERT INTO orders (fname, lname, email, size, method, toppings, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)";

    console.log(order);
    // Create array of parameters for each placeholder
    const params = [
        order.fname,
        order.lname,
        order.email,
        order.size,
        order.method,
        order.toppings,
        order.timestamp
    ];

    try {
        const [result] = await pool.execute(sql, params);
        
        // Send user to confirmation page
        res.render('confirmation', { order });
    } catch(err) {
        console.log("Database Error")
    }


});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});