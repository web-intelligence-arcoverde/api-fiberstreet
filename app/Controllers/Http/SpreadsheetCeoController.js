"use strict";

const Env = use("Env");

class SpreadsheetCeoController {
  async show({ params, request, response }) {
    const spreadsheet = await request.provider
      .spreadsheets()
      .where("ceo_id", params.id)
      .first();
    const host = Env.get("HOST");
    spreadsheet.url = `spreadsheets/${spreadsheet.id}`;
    return spreadsheet;
  }
}

module.exports = SpreadsheetCeoController;
