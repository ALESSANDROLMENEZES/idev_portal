const faker = require('faker');
const bk = require('bcrypt');
const moment = require('moment');
const currentDate = new Date();
'use strict';
module.exports = {
   up: async (queryInterface, Sequelize) => {
      
      await queryInterface.bulkInsert('users', [
         {
            id:1,
            name:faker.name,
            email:faker.internet.email,
            avatar:faker.internet.avatar,
            password:bk.hashSync('pass', 10),
            linkedin:faker.internet.url,
            github:faker.internet.url,
            score: faker.random.number(80),
            xp:faker.random.number(900),
            admin:'0',
            active:'1',
            createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
            updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
            coins: 3,
         },
         {
            id:2,
            name:faker.name,
            email:faker.internet.email,
            avatar:faker.internet.avatar,
            password:bk.hashSync('pass', 10),
            linkedin:faker.internet.url,
            github:faker.internet.url,
            score: faker.random.number(80),
            xp:faker.random.number(900),
            admin:'0',
            active:'1',
            createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
            updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
            coins: 3,
         },
         {
            id:3,
            name:faker.name,
            email:faker.internet.email,
            avatar:faker.internet.avatar,
            password:bk.hashSync('pass', 10),
            linkedin:faker.internet.url,
            github:faker.internet.url,
            score: faker.random.number(80),
            xp:faker.random.number(900),
            admin:'0',
            active:'1',
            createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
            updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
            coins: 3,
         },
         {
            id:4,
            name:faker.name,
            email:faker.internet.email,
            avatar:faker.internet.avatar,
            password:bk.hashSync('pass', 10),
            linkedin:faker.internet.url,
            github:faker.internet.url,
            score: faker.random.number(80),
            xp:faker.random.number(900),
            admin:'0',
            active:'1',
            createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
            updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
            coins: 3,
         },
         {
            id:5,
            name:faker.name,
            email:faker.internet.email,
            avatar:faker.internet.avatar,
            password:bk.hashSync('pass', 10),
            linkedin:faker.internet.url,
            github:faker.internet.url,
            score: faker.random.number(80),
            xp:faker.random.number(900),
            admin:'0',
            active:'1',
            createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
            updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
            coins: 3,
         },
         {
            id:6,
            name:'Alessandro',
            email:'alessandroadm@live.com',
            avatar:faker.internet.avatar,
            password:bk.hashSync('123', 10),
            linkedin:faker.internet.url,
            github:faker.internet.url,
            score: faker.random.number(80),
            xp:faker.random.number(900),
            admin:'1',
            active:'1',
            createdAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
            updatedAt: moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
            coins: 3,
         },
      ], {});
      
   },
   
   down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('users', null, {});
   }
};
