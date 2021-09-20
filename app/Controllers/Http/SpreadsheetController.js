'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Helpers = use('Helpers')
const SpreadsheetLink = use('App/Models/SpreadsheetLink')
const Spreadsheet = use('App/Models/Spreadsheet')
const Drive = use('Drive')
/**
 * Resourceful controller for interacting with spreadsheets
 */
class SpreadsheetController {
  /**
   * Show a list of all spreadsheets.
   * GET spreadsheets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {}

  /**
   * Create/save a new spreadsheet.
   * POST spreadsheets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      if (!request.file('file')) return

      const id = request.input('ceo_id')

      const existsSpreadsheet = await request.provider
        .spreadsheets()
        .where('ceo_id', id)
        .first()

      if (existsSpreadsheet) return // manda o erro

      const upload = request.file('file', {
        size: '10mb',
        allowedExtensions: ['xls', 'xlsx']
      })

      const fileName = `${Date.now()}.${upload.subtype}`
      const providerslug = await request.provider.slug

      await upload.move(
        Helpers.tmpPath(`uploads/${providerslug}/spreadsheet`),
        {
          name: fileName
        }
      )

      if (!upload.moved()) {
        throw upload.error()
      }

      const spreadsheetFile = await request.provider.spreadsheets().create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
        provider_id: request.provider.id,
        ceo_id: id
      })

      return spreadsheetFile
    } catch (error) {
      return response
        .status(400)
        .json({ msg: 'Calma, não se estressa Kevin', error })
    }
  }

  /**
   * Display a single spreadsheet.
   *
   * Send download spreadsheet.
   *
   * Esta rota deve ser pública, deve ser remontada para
   * aceitar download de qualquer pessoa que tenha este
   * link por x minutos
   * GET spreadsheets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const spreadsheetLink = await SpreadsheetLink.findByOrFail(
        'sublink',
        params.id
      )

      const spreadsheet = await Spreadsheet.findByOrFail(
        'id',
        spreadsheetLink.spreadsheet_id
      )

      if (spreadsheet && spreadsheetLink) {
        const file = await Spreadsheet.findByOrFail('id', spreadsheet.id)

        const providerslug = await params.slug

        const filePath = Helpers.tmpPath(
          `uploads/${String(providerslug)}/spreadsheet/${file.file}`
        )

        return response.attachment(filePath, 'CAIXA_EXPLODIDA.xlsx')
      }

      return response.status(204).send({ content: 'Not content' })
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'File not found' } })
    }
  }

  /**
   * Update spreadsheet details.
   * PUT or PATCH spreadsheets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      if (!request.file('file')) return

      const upload = request.file('file', {
        size: '10mb',
        allowedExtensions: ['xls', 'xlsx']
      })

      // const id = request.input('ceo_id')
      const id = params.id
      const fileName = `${Date.now()}.${upload.subtype}`
      const providerslug = await request.provider.slug

      const oldSpreadsheetFile = await request.provider
        .spreadsheets()
        .where('ceo_id', id)
        .first()

      await upload.move(
        Helpers.tmpPath(`uploads/${providerslug}/spreadsheet`),
        {
          name: fileName
        }
      )

      if (!upload.moved()) {
        throw upload.error()
      }

      oldSpreadsheetFile.merge({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })
      await oldSpreadsheetFile.save()

      // delete old file
      const tmpPathOldFile = await Helpers.tmpPath(
        `uploads/${providerslug}/spreadsheet/${oldSpreadsheetFile.file}`
      )
      await Drive.delete(tmpPathOldFile)

      return oldSpreadsheetFile
    } catch (error) {
      return error
    }
  }

  /**
   * Delete a spreadsheet with id.
   * DELETE spreadsheets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const spreadsheet = await request.provider
      .spreadsheets()
      .where('ceo_id', params.id)
      .first()

    const providerslug = await request.provider.slug

    const path = await Helpers.tmpPath(
      `uploads/${providerslug}/spreadsheet/${spreadsheet.file}`
    )

    await Drive.delete(path)
    await spreadsheet.delete()
    return spreadsheet
  }
}

module.exports = SpreadsheetController
