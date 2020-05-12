const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const groups = require('./groups');
const ObjectID = require('mongodb').ObjectID
const uuid = require('uuid/v4');

module.exports = {
    async get(id) {
		if (!id) throw 'You must provide an id to search for';
		const usersCollection = await users();
		const user = await usersCollection.findOne({ _id: id });
		if (user === null) throw 'No user with that id';
		return user;
	},
	async getByUsername(username) {
		if (!username) throw 'You must provide username to search for';
		const usersCollection = await users();
		const user = await usersCollection.findOne({ username: username });
		if (user === null) throw 'No user with that username';
		return user;
	},
	async getAll() {
		const usersCollection = await users();
		const userList = await usersCollection.find({}).toArray();
		return userList;
	},

	async create(firstName, lastName, username,gender,email,city,state,age,hashedPassword) {
        if (!firstName) throw 'You must provide a firstname';
        if (!lastName) throw 'You must provide a lastname';
        if (!username) throw 'You must provide a username';
        if (!gender) throw 'You must provide gender';
        if (!email) throw 'You must provide email';
        if (!city) throw 'You must provide city';
        if (!state) throw 'You must provide state';
		if (!age) throw 'You must provide a valid age';
		if (!hashedPassword) throw 'You must provide hash';
		const usersCollection = await users();
		let newUser = {
			_id: uuid(),
			firstName: firstName,
            lastName: lastName,
            username:username,
            gender:gender,
            email:email,
            city:city,
            state:state,
			age:age,
			posts:[],
			hashedPassword:hashedPassword,
			group_id:""
		};
		const insertInfo = await usersCollection.insertOne(newUser);
		if (insertInfo.insertedCount === 0) throw 'Could not add user';
		const newId = insertInfo.insertedId;
		const user = await this.get(newId);
		return user;
    },
    
	async remove(id) {
		if (!id) throw 'You must provide an id to search for';
        const usersCollection = await users();
        const user = await this.get(id);
		const deletionInfo = await usersCollection.deleteOne({ _id: id });
		if (deletionInfo.deletedCount === 0) {
			throw `Could not delete user with id of ${id}`;
		}
		await groups.removeUserFromGroup(user.group_id,id);
		return user;
	},
	async updateUser(userId,firstName, lastName, username,gender,email,city,state,age,hashedPassword,posts,group_id) {
		if (!userId) throw 'You must provide userId';
		if (!firstName) throw 'You must provide a firstname';
        if (!lastName) throw 'You must provide a lastname';
        if (!username) throw 'You must provide a username';
        if (!gender) throw 'You must provide gender';
        if (!email) throw 'You must provide email';
        if (!city) throw 'You must provide city';
		if (!state) throw 'You must provide state';
		if (!group_id) throw 'You must provide group_id';
		if (!age || typeof(age) !== 'number') throw 'You must provide a vaild age';
		const usersCollection = await users();
		let newUser = {
			firstName: fristName,
            lastName: lastName,
            username:username,
            gender:gender,
            email:email,
            city:city,
            state:state,
			age:age,
			hashedPassword:hashedPassword,
			posts:posts,
			group_id:group_id
		};
		const updatedInfo = await usersCollection.updateOne({_id:userId},{$set:newUser});
		if (updatedInfo.modifiedCount === 0) throw 'Could not update user';
		return await this.get(userId);
	},
	async addPostToUser(id,postId) {
		console.log(id)
		id = ObjectID(id)
		const usersCollection = await users();
		const updateInfo = await usersCollection.updateOne({_id:id},{$addToSet:{posts:postId}});
		if(!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Cound not add post to user';
		return await this.get(id);
	},

	async removePostFromUser(id,postId) {
		const usersCollection = await users();
		const updateInfo = await usersCollection.updateOne({_id:id},{$pull:{posts:postId}});
		if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Could not remove post from user';
		return await this.get(id);
	},

};
