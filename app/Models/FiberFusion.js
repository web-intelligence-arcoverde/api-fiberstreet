'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class FiberFusion extends Model {
  fiber () {
    return this.belongsTo('App/Models/Fiber')
  }

  provider () {
    return this.belongsTo('App/Models/Provider')
  }

  fibers () {
    return this.hasMany('App/Models/Fiber')
  }
}

module.exports = FiberFusion
