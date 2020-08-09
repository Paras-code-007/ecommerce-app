const Sequelize= require('sequelize')
const {DataTypes}= require('sequelize')
const { use } = require('passport')
const db= new Sequelize('RLabUD9Ak3','RLabUD9Ak3', 'bYXUExw1gm', {
    host: 'remotemysql.com',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5
    }
})

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

