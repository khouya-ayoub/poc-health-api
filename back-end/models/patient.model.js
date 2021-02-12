/**
 * Model d'un patient
 * */

const patient_model = {
    createPatient: (firstname, lastname, age, sexe, weight, cardiac, breath) => {
        return {
            firstname: firstname,
            lastname: lastname,
            age: age,
            sexe: sexe,
            weight: weight,
            cardiac: cardiac,
            breath: breath
        };
    }
};

module.exports = patient_model;