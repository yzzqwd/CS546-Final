//remove post, remove user, get user, get post
const mongoCollections = require('../config/mongoCollections');
const admin = mongoCollections.admin;
const uuid = require('uuid');
module.exports = {
    async getByUserName(username) {
		if (!username) throw 'You must provide name to search for';
      const adminCollection = await admin();
      const a = await adminCollection.findOne({ username: username });
      if (a === null) throw 'No administrator with that username';
      return a;
    },
    async create(username,hashedPassword) {
        if (!username) throw 'You must provide username';
        const adminCollection = await admin();
        let newA = {
            //_id: uuid(),
            username:username,
            hashedPassword:hashedPassword
        }
        const insertInfo = await adminCollection.insertOne(newA);
        if (insertInfo.insertedCount === 0) throw 'Could not add administrator';
        const a = await this.getByUserName(username);
        return a;
    }
    
}