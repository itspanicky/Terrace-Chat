
module.exports = function validateRoom(data) {
    let errors = {} 

    if (data.usersInRoom.length > 5 || data.usersInRoom < 1) {
        errors.usersInRoom = "Room needs to have only 2 - 5 members."
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}
