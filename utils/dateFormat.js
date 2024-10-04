function dateFormat(dateVal) {
    //format the date as MM/DD/YYYY
    return `${new Date(dateVal).toLocaleDateString()}`;
}

module.exports = dateFormat;