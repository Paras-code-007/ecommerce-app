const Sequelize= require('sequelize')
const {DataTypes}= require('sequelize')
// var SequelizeStore = require("connect-session-sequelize")(session.Store);
const db= new Sequelize('J8iRb3T9ti','J8iRb3T9ti', 'XBEKMQYSxk', {
    host: 'remotemysql.com',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5
    },
    // storage: "./session.mysql"
})
//mysql-defaultport:3306 therefore not mentioned

const Users= db.define('users',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    business: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const Products= db.define('products',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    manufacturer: DataTypes.STRING,
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

const Carts= db.define('cart',{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
})

Carts.belongsTo(Users)
Carts.belongsTo(Products)

Users.hasMany(Carts)
Products.hasMany(Carts)



async function getuserbyemail(email) {
    const user= await Users.findAll({
        where: {
            email: email
        }
    })
    
    return user[0]
}

async function getuserbyid(id) {
    const user= await Users.findAll({
        where: {
            id: id
        }
    })
    
    return user[0]
}

// var Session = sequelize.define("Session", {
//     sid: {
//         type: Sequelize.STRING,
//         primaryKey: true,
//     },
//     userId: Sequelize.STRING,
//     expires: Sequelize.DATE,
//     data: Sequelize.STRING(50000),
// });

// function extendDefaultFields(defaults, session) {
//     return {
//         data: defaults.data,
//         expires: defaults.expires,
//         userId: session.userId,
//     };
// }

// var store = new SessionStore({
//     db: sequelize,
//     table: "Session",
//     extendDefaultFields: extendDefaultFields,
// });

db.sync()
.then(function () {
    console.log("database has been synced")
})
.catch(function (err) {
    console.log("error creating database",err)
})

exports=module.exports={
    db, Users, Products, Carts, getuserbyemail, getuserbyid
}

