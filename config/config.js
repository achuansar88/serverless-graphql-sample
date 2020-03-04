
import { Sequelize } from 'sequelize';

export default class ConfigConnection {

    connectpostgresSql () {
        this.sequelize = new Sequelize(process.env.DATABASE, process.env.USER_NAME,process.env.PASSWORD, {
            host:process.env.HOST,
            dialect: 'postgres',
            operatorsAliases: true,
            freezeTableName: true,
            pool: {
                max: 1,
                min: 0,
                acquire: 30000,
                idle: 10000,
                handleDisconnects: true
            },
        });
        this.sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.  ');

            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });

        return this.sequelize;
    }
}