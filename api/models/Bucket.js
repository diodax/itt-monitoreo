/**
 * Bucket.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 * @source      :: http://blog.mongodb.org/post/65517193370/schema-design-for-time-series-data-in-mongodb
 */

module.exports = {

  attributes: {
    // Referencia al User asociado a las mediciones
    username: {
      model: 'user'
    },

    hourTimestamp: {
      type: 'datetime'
    },

    // Como Sails.js no soporta inline documents, se hace el siguiente force:
    // Un atributo de timestamp para cada minuto, haciendo referencia a un modelo con los 60 segs.
    // Asi se mantiene la validación de cada elemento, y se pueden hacer queries hasta los segundos

    ts0: { model: 'minutes' },
    ts1: { model: 'minutes' },
    ts2: { model: 'minutes' },
    ts3: { model: 'minutes' },
    ts4: { model: 'minutes' },
    ts5: { model: 'minutes' },
    ts6: { model: 'minutes' },
    ts7: { model: 'minutes' },
    ts8: { model: 'minutes' },
    ts9: { model: 'minutes' },

    ts10: { model: 'minutes' },
    ts11: { model: 'minutes' },
    ts12: { model: 'minutes' },
    ts13: { model: 'minutes' },
    ts14: { model: 'minutes' },
    ts15: { model: 'minutes' },
    ts16: { model: 'minutes' },
    ts17: { model: 'minutes' },
    ts18: { model: 'minutes' },
    ts19: { model: 'minutes' },

    ts20: { model: 'minutes' },
    ts21: { model: 'minutes' },
    ts22: { model: 'minutes' },
    ts23: { model: 'minutes' },
    ts24: { model: 'minutes' },
    ts25: { model: 'minutes' },
    ts26: { model: 'minutes' },
    ts27: { model: 'minutes' },
    ts28: { model: 'minutes' },
    ts29: { model: 'minutes' },

    ts30: { model: 'minutes' },
    ts31: { model: 'minutes' },
    ts32: { model: 'minutes' },
    ts33: { model: 'minutes' },
    ts34: { model: 'minutes' },
    ts35: { model: 'minutes' },
    ts36: { model: 'minutes' },
    ts37: { model: 'minutes' },
    ts38: { model: 'minutes' },
    ts39: { model: 'minutes' },

    ts40: { model: 'minutes' },
    ts41: { model: 'minutes' },
    ts42: { model: 'minutes' },
    ts43: { model: 'minutes' },
    ts44: { model: 'minutes' },
    ts45: { model: 'minutes' },
    ts46: { model: 'minutes' },
    ts47: { model: 'minutes' },
    ts48: { model: 'minutes' },
    ts49: { model: 'minutes' },

    ts50: { model: 'minutes' },
    ts51: { model: 'minutes' },
    ts52: { model: 'minutes' },
    ts53: { model: 'minutes' },
    ts54: { model: 'minutes' },
    ts55: { model: 'minutes' },
    ts56: { model: 'minutes' },
    ts57: { model: 'minutes' },
    ts58: { model: 'minutes' },
    ts59: { model: 'minutes' },

  }
};

// Example Document
//
// {
//   timestamp_hour: ISODate("2013-10-10T23:00:00.000Z"),
//   type: “memory_used”,
//   values: {
//     0: { 0: 999999, 1: 999999, …, 59: 1000000 },
//     1: { 0: 2000000, 1: 2000000, …, 59: 1000000 },
//     …,
//     58: { 0: 1600000, 1: 1200000, …, 59: 1100000 },
//     59: { 0: 1300000, 1: 1400000, …, 59: 1500000 }
//   }
// }
