const { app } = require('./app');

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
