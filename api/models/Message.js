/**
 * Message.js
 *
 * @description :: Modelo que contiene los datos de configuracion de los mensajes SMS
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    // Referencia al User que contiene la cuenta
    user: {
      model: 'user',
      required: true
    },

    // Limite inferior del BPM para determinar que el usuario esta saludable
    bpmThreshold: {
      type: 'integer'
    },

    // Tiempo (en tics) minimo para mandar alertas
    requiredTics: {
      type: 'integer'
    },

    // Contador que lleva las veces que una medida ha pasado el threshold
    totalTics: {
      type: 'integer',
      defaultsTo: 0
    }

  }
};
