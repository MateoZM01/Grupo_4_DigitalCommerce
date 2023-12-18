const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const rutas = require('./src/routes/mainRouter');


app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use('/', rutas)

app.get('*', (req, res) => {
    res.send(`
    <h1>No existe esa página</h1>
    <h3><a href="/">Volver al Home</a></h3>
    `)
});

app.listen(port, () => {
    console.log(`
    Servidor levantado correctamente en el puerto ${port}
    http://localhost:5000/
    `);
});






// app.listen(5000, ()=>{
//     console.log('Servidor Funcionando http://localhost:5000/');
// });

// app.get('/', (req,res)=>{
//     res.sendFile(__dirname + '/views/home.html');
// });

// app.get('/login', (req,res)=>{
//     res.sendFile(__dirname + '/views/login.html');
// });

// app.get('/register', (req,res)=>{
//     res.sendFile(__dirname + '/views/register.html');
// });

// app.get("/product_detail", (req, res) => {
//   res.sendFile(__dirname + "/views/product_Detail.html");
// });
