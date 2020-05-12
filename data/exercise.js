const mongoCollections = require('../config/mongoCollections');
const exercise = mongoCollections.exercise;
const uuid = require('uuid');
module.exports = {
    async get(userId) {
		if (!userId) throw 'You must provide an id to search for';
		const exerciseCollection = await exercise();
		const e = await exerciseCollection.findOne({ userId: userId });
		if (e === null) throw 'No exercise with this user';
		return e;
	},

	async create(userId) {
        if (!userId) throw 'You must provide an userId';
		const exerciseCollection = await exercise();
		let newExercise = {
            _id: uuid(),
            userId:userId,
            outdoors:[],
            indoors:[],
            others:[]
        };
        //const temp = await this.get(userId); This has the same problem as health. It's not gonna run further since this doesn't exist
        //if(temp !== null) throw 'Already created';
        const insertInfo = await exerciseCollection.insertOne(newExercise);
		if (insertInfo.insertedCount === 0) throw 'Could not create exerices';
		//const newId = insertInfo.insertedId;
		const e = await this.get(userId);
		return e;
    },
    
	async remove(userId) {
		if (!userId) throw 'You must provide an userId to search for';
        const exerciseCollection = await exercise();
        const e = await this.get(userId);
		const deletionInfo = await exerciseCollection.deleteOne({ userId: userId });
		if (deletionInfo.deletedCount === 0) {
			throw `Could not delete exercises of user with id of ${id}`;
		}
		return h;
	},
	async addOutdoors(userId,outdoors) {
		if (!userId) throw 'You must provide an userId';
        if (!outdoors) throw 'You must provide outdoors activities';
        const exerciseCollection = await exercise();
        const e = await this.get(userId);
        e.outdoors.push(outdoors);
		let newE = {
            userId:userId,
            outdoors:e.outdoors,
            indoors:e.indoors,
            others:e.others
        };
		const updatedInfo = await exerciseCollection.updateOne({userId:userId},{$set:newE});
		if (updatedInfo.modifiedCount === 0) throw 'Could not update outdoors';
		return await this.get(userId);
    },
    async addIndoors(userId,indoors) {
		if (!userId) throw 'You must provide an userId';
        if (!indoors) throw 'You must provide indoors activities';
        const exerciseCollection = await exercise();
        const e = await this.get(userId);
        e.indoors.push(indoors);
		let newE = {
            userId:userId,
            outdoors:e.outdoors,
            indoors:e.indoors,
            others:e.others
        };
		const updatedInfo = await exerciseCollection.updateOne({userId:userId},{$set:newE});
		if (updatedInfo.modifiedCount === 0) throw 'Could not update indoors';
		return await this.get(userId);
    },
    async addOthers(userId,others) {
		if (!userId) throw 'You must provide an userId';
        if (!others) throw 'You must provide others activities';
        const exerciseCollection = await exercise();
        const e = await this.get(userId);
        e.others.push(others);
		let newE = {
            userId:userId,
            outdoors:e.outdoors,
            indoors:e.indoors,
            others:e.others
        };
		const updatedInfo = await exerciseCollection.updateOne({userId:userId},{$set:newE});
		if (updatedInfo.modifiedCount === 0) throw 'Could not update others';
		return await this.get(userId);
    }
};