const express = require('express');
const path = require('path');
const apiRouter = require('./routes/api');
const mongoose = require('mongoose');

const PORT = 3000;
const app = express();

const mongoURI = 'mongodb://localhost/veraemr_db';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.resolve(__dirname, '../client/src')))
app.use('/api', apiRouter);


app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
})
app.use('/build', express.static(path.resolve(__dirname,'../build')))


app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// app.post('/createpatients', (req, res) =>{
//   console.log('post createpatients')
// })


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
