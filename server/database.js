const { Sequelize } = require('sequelize');


const db = new Sequelize('mysql://root:umur133@localhost:3306/okul', {
  define: { freezeTableName: true },
});

try {
  db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = db;