export const validateField = (data, validate) => {
    let error = {};

    for (let key in validate) {
        for (let field of validate[key]) {
            if (field.required && !data[key]) {
                error[key] = field.message;
                break;
            }
            if (field.pattern && !field.pattern.test(data[key])) {
                error[key] = field.message;
                break;
            }
            if (data[key] && data[key].length < field.length) {
                error[key] = field.message;
                break;
            }
        }
    }

    return error;
};
