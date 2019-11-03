const Room = require("../../models/Room")

const createRoom = async (user) => {
    const count = {
        "Male": 3,
        "Female": 3
    }
    const males = await User.find({ gender: "Male", livingroom: null });
    const females = await User.find({ gender: "Female", livingroom: null });

    count[user.gender] -= 1
    
      if (males.length >= count["Male"] && females.length >= count["Female"]) {
        const newLivingRoom = new LivingRoom();
        newLivingRoom.usersInRoom.push(user);
        await user.updateOne({ livingroom: newLivingRoom._id })
        try {
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
            await newLivingRoom.save()
        } catch (e) {
            console.log(e)
        }
      }
}

module.exports = {
    createRoom
}


