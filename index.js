const express = require('express')
const app = express()
const port = 3000
const { graphqlHTTP } = require('express-graphql');

app.use(express.json());

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/express_graphQL-learn', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.connection.on("open", function (ref) {
    console.log("Connected to mongo server.");
});

mongoose.connection.on("error", function (err) {
    console.log("Could not connect to mongo server!");
    return console.log(err);
});
const User = require('./models/user');
const schema = require('./graphQL_Schema/index');
const root = {
    Config: 'ajay kumar'
}
const context = async req => {
    // console.log(req.headers.host);
    const host = req.headers.host
    return { host: host }
}
app.use('/mainapi',
    //  graphqlHTTP({
    //     schema,
    //     rootValue: root,
    //     graphiql: true,
    //     context: () => contest(req),
    // })
    graphqlHTTP(async req => ({
        schema,
        rootValue: root,
        graphiql: true,
        context: () => context(req),
    }))
);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/insert', async (req, res) => {
    try {
        const data = new User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        })
        const resdata = await data.save();
        res.status(200).json({
            status: 1,
            data: resdata
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: error.message
        })
    }
})

app.get('/alluser', async (req, res) => {
    try {
        const resdata = await User.find();
        res.status(200).json({
            status: 1,
            data: resdata
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: error.message
        })
    }
})

// mongoose.set('debug', true);
// mongoose.set("debug", (collectionName, method, query, doc) => {
//     console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})