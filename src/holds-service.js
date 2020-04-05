const HoldsService = {
    getAllHolds(knex) {
      return knex.select('*').from('allholds_dibs')
    },
  
    insertHold(knex, newHold) {
      return knex
        .insert(newHold)
        .into('allholds_dibs')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },

    updateHold(knex, id, hold) {
      return knex ('allholds_dibs')
        .update(hold)
        .where({id})
    }

  }
  
  module.exports = HoldsService