const { Sequelize, DataTypes } = require("sequelize");
const { resolve } = require("path");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: resolve(__dirname, "../../data.db")
});

const userModel = sequelize.define(
    "user",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.TEXT,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        timestamps: true,
        tableName: "users"
    }
);

const blogModel = sequelize.define(
    "blog",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        blogTitle: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        blogContent: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: true,
        tableName: "blogs"
    }
);

blogModel.belongsTo(userModel, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});

sequelize.sync();
module.exports = {
    sequelize,
    userModel,
    blogModel
};
