/**
 * Patient.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    // Referencia al User que contiene la cuenta
    user: {
      model: 'user'
    },
    // Estado actual del Paciente
    currentStatus: {
      type: 'string',
      enum: ['stable', 'critical']
    },

    // Referencia al Doctor responsable del Paciente
    doctor: {
      model: 'doctor'
    }
  }
};
