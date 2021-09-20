'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Provider extends Model {
  static boot () {
    super.boot()

    this.addTrait('@provider:Lucid/Slugify', {
      fields: { slug: 'name' },
      strategy: 'dbIncrement',
      disableUpdates: false
    })
  }

  users () {
    return this.belongsToMany('App/Models/User').pivotModel(
      'App/Models/UserProvider'
    )
  }

  cables () {
    return this.hasMany('App/Models/Cable')
  }

  clients () {
    return this.hasMany('App/Models/Client')
  }

  ctos () {
    return this.hasMany('App/Models/Cto')
  }

  fibers () {
    return this.hasMany('App/Models/Fiber')
  }

  ceos () {
    return this.hasMany('App/Models/Ceo')
  }

  splitters () {
    return this.hasMany('App/Models/Splitter')
  }

  splitterOutputs () {
    return this.hasMany('App/Models/SplitterOutput')
  }

  relCableCto () {
    return this.hasMany('App/Models/RelCableCto')
  }

  relCableCeo () {
    return this.hasMany('App/Models/RelCableCeo')
  }

  fiberfusions () {
    return this.hasMany('App/Models/FiberFusion')
  }

  relCableClient () {
    return this.hasMany('App/Models/RelCableClient')
  }

  spreadsheets () {
    return this.hasMany('App/Models/Spreadsheet')
  }

  spreadsheetLinks () {
    return this.hasMany('App/Models/SpreadsheetLink')
  }
}

module.exports = Provider
