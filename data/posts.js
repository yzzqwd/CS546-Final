const mongoCollections = require('../config/mongoCollections');
const posts = mongoCollections.posts;
const users = require('./users');
const uuid = require('uuid');
module.exports = {
    async create(userId,img, caption, time){
        if (!userId) throw 'You must provide userId for post.';
        if (!img) throw 'You must provide a img';
        if (!caption) throw 'You must provide a caption.';
        if (!time) throw 'You must provide a time.';
        const postCollection = await posts();
        let newP = {
            userId:userId,
            img:img,
            caption:caption,
            time:time
        };
        const insertInfo = await postCollection.insertOne(newP);
        if (insertInfo.insertedCount === 0) throw 'Could not add post';
        const newId = insertInfo.insertedId;
        await users.addPostToUser(userId,newId);
		return await this.get(newId);
    },

    async get(id) {
        if (!id) throw 'You must provide an id to search for';
        const postCollection = await posts();
		const p = await postCollection.findOne({ _id: id });
		if (p === null) throw 'No post with that id';
		return p;
    },

    async update(id, userId,img,caption, time) {
        if (!id) throw 'You must provide an id to search for';
        if (!userId) throw 'You must provide userId for post.';
        if (!img) throw 'You must provide img.';
        if (!caption) throw 'You must provide caption.';
        if (!time) throw 'You must provide time.';
        const postCollection = await posts();
        let newP = {
            userId:userId,
            img:img,
            caption:caption,
            time:time,
        };
		const updatedInfo = await postCollection.updateOne({ _id: id}, { $set: newP});
		if (updatedInfo.modifiedCount === 0) {
			throw 'could not update post successfully';
		}

		return await this.get(id);
    },

    async removePost(id) {
        if (!id) throw 'You must provide an id to search for';
        const postCollection = await posts();
        p = await this.get(id);
		const deletionInfo = await postCollection.deleteOne({ _id: id });
		if (deletionInfo.deletedCount === 0) {
			throw `Could not delete post with id of ${id}`;
        }
        await users.removePostFromUser(p.userId,id);
		return { deleted: true };
    },

    async getAll() {
        const postCollection = await posts();
		const pList = await postCollection.find({}).toArray();
		return pList;
    },
    async getAllByUserId(userId) {
        const postCollection = await posts();
        const pList = await postCollection.find({userId:userId}).toArray();
        return pList;
    }
};