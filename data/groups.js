const mongoCollections = require('../config/mongoCollections');
const groups = mongoCollections.groups;
const uuid = require('uuid');
module.exports = {
    async get(id) {
		if (!id) throw 'You must provide an id to search for';
		const groupsCollection = await groups();
		const group = await groupsCollection.findOne({ _id: id });
		if (group === null) throw 'No group with that id';
		return group;
	},
	async getAll() {
		const groupsCollection = await groups();
		const gList = await groupsCollection.find({}).toArray();
		return gList;
	},

	async create(name,ltg,announcements) {
        if (!name) throw 'You must provide a name';
        if (!ltg) throw 'You must provide ltg';
        if (!announcements) throw 'You must provide announcements';
		const groupsCollection = await groups();
		let newG = {
			_id: uuid(),
            name:name,
            members:[],
            ltg:ltg,
            announcements:announcements
		};
		const insertInfo = await groupsCollection.insertOne(newG);
		if (insertInfo.insertedCount === 0) throw 'Could not add group';
		const newId = insertInfo.insertedId;
		const group = await this.get(newId);
		return group;
    },
    
	async remove(id) {
		if (!id) throw 'You must provide an id to search for';
        const groupsCollection = await groups();
        const group = await this.get(id);
		const deletionInfo = await groupsCollection.deleteOne({ _id: id });
		if (deletionInfo.deletedCount === 0) {
			throw `Could not delete group with id of ${id}`;
		}
		return group;
	},
	//group and user are complicated 
	async addUserToGroup(id,userId) {
		const groupsCollection = await groups();
		const updateInfo = await groupsCollection.updateOne({_id:id},{$addToSet:{members:{id:userId}}});
		if(!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Cound not add user to group';
		return true;
	},
	async removeUserFromGroup(id,userId) {
		const groupsCollection = await groups();
		const updateInfo = await groupsCollection.updateOne({_id:id},{$pull:{members:{id:userId}}});
		if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Could not remove user from group';
		return true;
	}

};