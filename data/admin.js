//remove post, remove user, get user, get post
const mongoCollections = require('../config/mongoCollections');
const admin = mongoCollections.admin;
module.exports = {
    async get(id) {
		if (!id) throw 'You must provide an id to search for';
		const adminCollection = await admin();
		const a = await adminCollection.findOne({ _id: id });
		if (a === null) throw 'No administrator with that id';
		return a;
	}
}