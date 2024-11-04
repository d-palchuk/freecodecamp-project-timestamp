exports.isDateValid = (dateValue) => {
    return !isNaN(Number(dateValue)) || !isNaN(new Date(dateValue));
};