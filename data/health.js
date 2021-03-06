const mongoCollections = require('../config/mongoCollections');
const health = mongoCollections.health;
const uuid = require('uuid');
const ObjectID = require('mongodb').ObjectID

module.exports = {
    async get(userId) {
		if (!userId) throw 'You must provide an id to search for';
		const healthCollection = await health();
		userId = ObjectID(userId)
		const h = await healthCollection.findOne({ userId: userId });
		if (h === null) throw 'No data with this user';
		return h;
	},

	async getAll() {
		const healthCollection = await health();
		const hList = await healthCollection.find({}).toArray();
		return hList;
	},

	async create(userId) {
		if (!userId) throw 'You must provide an userId';
		const healthCollection = await health();
		let newHealth = {
            userId:userId,
            height:0,
            weight:0,
            medicalConditions:"Healthy",
            BMI:0,
            BF:0
		};
		const insertInfo = await healthCollection.insertOne(newHealth);
		if (insertInfo.insertedCount === 0) throw 'Could not add health status';
		const h = await this.get(userId);
		return h;
    },
    
	async remove(userId) {
		if (!userId) throw 'You must provide an id to search for';
        const healthCollection = await health();
        const h = await this.get(userId);
		const deletionInfo = await healthCollection.deleteOne({ userId: userId });
		if (deletionInfo.deletedCount === 0) {
			throw `Could not delete health status of user with id of ${id}`;
		}
		return h;
    },
	async updateHealth(userId,height,weight,mc,BMI,BF) {
		if (!userId) throw 'You must provide an userId';
		if (!mc) throw 'You must provide your mc';
		height = parseInt(height)
		weight = parseInt(weight)
		BMI = parseInt(BMI)
		BF = parseInt(BF)
        if (!height || typeof(height) !== 'number'|| height <= 0) throw 'You must provide a vaild height';
        if (!weight || typeof(weight) !== 'number'|| weight <= 0) throw 'You must provide a vaild weight';
        if (!BMI || typeof(BMI) !== 'number'|| BMI <= 0) throw 'You must provide a vaild BMI';
        if (!BF || typeof(BF) !== 'number'|| BF <= 0 || BF >= 100) throw 'You must provide a vaild BF%';
		const healthCollection = await health();
		userId = ObjectID(userId)
		let newHealth = {
            userId:userId,
            height:height,
            weight:weight,
            medicalConditions:mc,
            BMI:BMI,
            BF:BF
		};
		
		const updatedInfo = await healthCollection.updateOne({userId:userId},{$set:newHealth});
		if (updatedInfo.modifiedCount === 0) throw 'Could not update health status';
		return await this.get(userId);
	}
};
