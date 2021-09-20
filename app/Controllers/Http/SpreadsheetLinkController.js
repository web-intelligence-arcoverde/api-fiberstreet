'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const crypto = require('crypto')
const moment = require('moment')

/**
 * Resourceful controller for interacting with spreadsheetlinks
 */
class SpreadsheetLinkController {
  /**
   * Show a list of all spreadsheetlinks.
   * GET spreadsheetlinks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {}

  /**
   * Create/save a new spreadsheetlink.
   * POST spreadsheetlinks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const ceoId = request.input('ceo_id')

    const existsSpreadsheet = await request.provider
      .spreadsheets()
      .where('ceo_id', ceoId)
      .first()

    if (!existsSpreadsheet) {
      return response.status(204).send({ error: 'Not exists spreadsheets' })
    }

    // verify if exists sublink to download spreadsheet
    const existsSpreadsheetLinks = await request.provider
      .spreadsheetLinks()
      .where('ceo_id', ceoId)
      .first()

    // delete revoked's sublinks
    const sublinkExpired = null
    if (sublinkExpired) {
      sublinkExpired = moment()
        .subtract('60', 'minutes')
        .isAfter(existsSpreadsheetLinks.sublink_created_at)
    }

    // create and send new sublink
    async function createSublink () {
      const sublink = crypto.randomBytes(10).toString('hex')
      const sublink_created_at = new Date()
      const spreadsheetLinks = await request.provider
        .spreadsheetLinks()
        .create({
          sublink,
          sublink_created_at,
          ceo_id: ceoId,
          spreadsheet_id: existsSpreadsheet.id
        })
      return spreadsheetLinks
    }

    // create new sublink for download spreadsheet
    if (!existsSpreadsheetLinks) {
      const sublink = await createSublink()
      return sublink
    }

    // if sublink is revoked, create and send new sublink
    if (sublinkExpired) {
      const sublink = await createSublink()
      return sublink
    }

    return existsSpreadsheetLinks
  }

  /**
   * Display a single spreadsheetlink.
   * GET spreadsheetlinks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    // create and send new sublink
    async function createSublink (ceoId, spreadsheet_id) {
      const sublink = crypto.randomBytes(10).toString('hex')
      const sublink_created_at = new Date()
      const spreadsheetLinks = await request.provider
        .spreadsheetLinks()
        .create({
          sublink,
          sublink_created_at,
          ceo_id: ceoId,
          spreadsheet_id: spreadsheet_id
        })
      return spreadsheetLinks
    }

    try {
      const ceoId = params.id

      const existsSpreadsheetLinks = await request.provider
        .spreadsheetLinks()
        .where('ceo_id', ceoId)
        .first()

      // verify if token is revoked
      const sublinkExpired = moment()
        .subtract('60', 'minutes')
        .isAfter(existsSpreadsheetLinks.sublink_created_at)

      // if sublink is revoked, create new sublink

      if (sublinkExpired) {
        const spreadsheet_id = existsSpreadsheetLinks.spreadsheet_id
        await existsSpreadsheetLinks.delete()
        const sublink = await createSublink(ceoId, spreadsheet_id)

        return sublink
        // response
        //   .status(200)
        //   .send({ error: { message: 'Sublink expirado' } })
      }

      return existsSpreadsheetLinks
    } catch (error) {
      return response.status(200).send()
    }
  }

  /**
   * Update spreadsheetlink details.
   * PUT or PATCH spreadsheetlinks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {}

  /**
   * Delete a spreadsheetlink with id.
   * DELETE spreadsheetlinks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const ceoId = params.id

      const existsSpreadsheetLinks = await request.provider
        .spreadsheetLinks()
        .where('ceo_id', ceoId)
        .first()

      await existsSpreadsheetLinks.delete()
    } catch (error) {}
  }
}

module.exports = SpreadsheetLinkController
