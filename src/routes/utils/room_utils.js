const LivingRoom = require("../../models/LivingRoom");
const User = require("../../models/User");

const createRoom = async (user) => {
    const count = {
        "Male": 3,
        "Female": 3
    }

    let males = [];
    let females = [];
    count[user.gender] -= 1
    User.find({ gender: "Male", livingroom: null, _id: { $ne: user._id } }).limit(count["Male"]).exec( (err, data) => {
        males.concat(data)
    })
    User.find({ gender: "Female", livingroom: null, _id: { $ne: user._id }  }).limit(count["Female"]).exec( (err, data) => {
        females.concat(data)
    })

    user.updateOne({name: "changed"})

    if (males.length + females.length === 5) {
        const newLivingRoom = new LivingRoom();
        newLivingRoom.usersInRoom.push(user);
        user.livingroom = newLivingRoom._id
        try {
            for (let i = 0; i < 3; i++) {
                if (males[i]) {
                    newLivingRoom.usersInRoom.push(males[i]);
                    males[i].livingroom = newLivingRoom._id
                }
                if (females[i]) {
                    newLivingRoom.usersInRoom.push(females[i]);
                    females[i].livingroom = newLivingRoom._id;
                }
            }
            await newLivingRoom.save();
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = {
  createRoom
};
