const Room = require("../../models/Room")
const User = require("../../models/User")

const createRoom = async (user) => {
    const count = {
        "Male": 3,
        "Female": 3
    }
    try {
        const males = await User.find({ gender: "Male", livingroom: null });
        const females = await User.find({ gender: "Female", livingroom: null });
        console.log(`males: ${males.length}`);
        console.log(`females: ${females.length}`);

        count[user.gender] -= 1
    
      if (males.length >= count["Male"] && females.length >= count["Female"]) {
        console.log("Creating Room");
        const newLivingRoom = new Room();
        newLivingRoom.usersInRoom.push(user);
        console.log("New Living Room", newLivingRoom.usersInRoom);

        const updatedUser = await User.findOneAndUpdate({ _id: user._id }, { livingroom: newLivingRoom._id }, { new: true });
        console.log("updated user", updatedUser);

        for (let i = 0; i < count["Male"]; i++) {
            if (user !== males[i]) {
                newLivingRoom.usersInRoom.push(males[i]);
                await males[i].updateOne({ livingroom: newLivingRoom._id });

            } else {
                count["Male"] += 1
            }
        }
        for (let i = 0; i < count["Female"]; i++) {
            if (user !== females[i]) {
                newLivingRoom.usersInRoom.push(females[i]);
                await females[i].updateOne({ livingroom: newLivingRoom._id });
            } else {
                count["Female"] += 1
            }
        }

        console.log("New Living Room", newLivingRoom.usersInRoom);
        await newLivingRoom.save()
        return updatedUser;
        }

    } catch (e) {
        console.log(e);
        return null;
    }
}

module.exports = {
    createRoom
}


