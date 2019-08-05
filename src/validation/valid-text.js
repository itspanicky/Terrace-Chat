const validText = str => {
    return typeof str === 'string' && str.trim().length > 0;
}

const validDob = str => {
    let currentDate = Date.now();
    let dobTime = new Date(str).getTime();
    let age = new Date(currentDate - dobTime);
    return Math.abs(age.getUTCFullYear() - 1970) > 18;

}

module.exports = {
    validText,
    validDob
};