//remove post, remove user, get user, get post
const mongoCollections = require('../config/mongoCollections');
const admin = mongoCollections.admin;
module.exports = {
    async get(id) {
		if (!id) throw 'You must provide an id to search for';
<<<<<<< HEAD
        const usersCollection = await users();
        const user = await this.get(id);
		const deletionInfo = await usersCollection.deleteOne({ _id: id });
		if (deletionInfo.deletedCount === 0) {
			throw `Could not delete user with id of ${id}`;
		}
		return user;
    }
};
=======
		const adminCollection = await admin();
		const a = await adminCollection.findOne({ _id: id });
		if (a === null) throw 'No administrator with that id';
		return a;
	}
}
>>>>>>> c072ab5870d4742c804de155323ea75570ea14b9
