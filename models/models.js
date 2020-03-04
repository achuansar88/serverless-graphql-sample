'use strict';

import config from '../config/config';
import Sequelize from 'sequelize'

var configInstance = new config();

//connect to postgress SQL
const sequelize = configInstance.connectpostgresSql();

//import User schema
import User from './user'

const models = {
  User: User.init(sequelize, Sequelize)  
};

export default class Models {

 modelIni () {
  
   return new Promise((resolve,reject) => {
   Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

      const db = {
        models,
        sequelize
      };

      resolve(db);

    })

  }

}

