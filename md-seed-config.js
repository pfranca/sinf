import mongooseLib from 'mongoose';
mongooseLib.Promise = global.Promise;

import Users from "./seeders/users.seeder";
// Export the mongoose lib
export const mongoose = mongooseLib;

// Export the mongodb url
export const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/web-store';

/*
  Seeders List
  ------
  order is important
*/
export const seedersList = {
    Users
};
