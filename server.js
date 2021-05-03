const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8080;
const app = express();

const mongoURI = 'mongodb://localhost/veraemr_db';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/client'))

app.get('/', (req, res) => {
  res.status(200).render('index.ejs');
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;