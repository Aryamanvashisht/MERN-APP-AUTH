import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';

const app = express();

/*middleware */

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

app.get('/', (req, res) => {
   res.status(201).json({message: 'Hello World!'});    
});


/** Api endpoint */
app.use('/api', router);

/*Start the server only when we have the valid connection*/

connect()
.then(()=>{
    try 
    {
        app.listen(4000, () => {
            console.log('Server is running on port 4000');
        });
    } 
    catch (error) {
        console.log(`Cannot connect to the server: ${error}`);
    }
})
.catch((err)=>{
   console.log('Invalid database connection', err);
})





