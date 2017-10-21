let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');
    
let todoRoutes = require("./routes/todos");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'))

app.use('/api/todos', todoRoutes);

app.listen(port, (req, res) => {
    console.log(`server listening on ${port}`);
});

app.get('/', (req, res) => {
   res.sendFile('index.html');
});
    
    