module.exports = {
    async create(firstName, lastName, username,gender,email,city,state,age,hashedPassword) {
        if (!firstName) throw 'You must provide a firstname';
        if (!lastName) throw 'You must provide a lastname';
        if (!username) throw 'You must provide a username';
        if (!gender) throw 'You must provide gender';
        if (!email) throw 'You must provide email';
        if (!city) throw 'You must provide city';
        if (!state) throw 'You must provide state';
		if (!age || typeof(age) !== 'number') throw 'You must provide a vaild age';
		if (!hashedPassword) throw 'You must provide hash';
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
			posts:[],
			hashedPassword:hashedPassword
		};
		const insertInfo = await usersCollection.insertOne(newUser);
		if (insertInfo.insertedCount === 0) throw 'Could not add user';
		const newId = insertInfo.insertedId;
		const user = await this.get(newId);
		return user;
    },
    async removePostFromUser(id,postId) {
		const usersCollection = await users();
		const updateInfo = await usersCollection.updateOne({_id,id},{$pull:{posts:{id:postId}}});
		if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Could not remove post from user';
		return true;
    },
    async remove(id) {
		if (!id) throw 'You must provide an id to search for';
        const usersCollection = await users();
        const user = await this.get(id);
		const deletionInfo = await usersCollection.deleteOne({ _id: id });
		if (deletionInfo.deletedCount === 0) {
			throw `Could not delete user with id of ${id}`;
		}
		return user;
    }
};