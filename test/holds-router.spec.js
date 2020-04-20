const knex = require("knex")

const app = require('../src/app')
//get, getbyid, post, patch
const testHolds = [
    {
        date_of_req: new Date(),
        // hold_date: "Test",
        hold_type: "single",
        holdmonth_start: "January",
        holdmonth_end: "January",
        holdday_start: "1",
        holdday_end: "1",
        holdyear_start: "2020",
        holdyear_end: "2020",
        hold_status: "Test",
        holds: [],
        holds_added: [],
        contact_type: "Test",
        event_type: "Test",
        support_need: "Test",
        dsupport_type: "Test",
        support_type3: "Test",
        support_type4: "Test",
        hold_firstname: "Test",
        hold_lastname: "Test",
        hold_email: "Test",
        contact_act: "Test",
        spotify: "Test",
        youtube: "Test",
        facebook: "Test",
        bandcamp: "Test",
        website: "Test",
        dsupport_title: "Test",
        spotify2: "Test",
        youtube2: "Test",
        facebook2: "Test",
        bandcamp2: "Test",
        website2: "Test",
        opener_title: "Test",
        spotify3: "Test",
        youtube3: "Test",
        facebook3: "Test",
        bandcamp3: "Test",
        website3: "Test",
        opener2_title: "Test",
        spotify4: "Test",
        youtube4: "Test",
        facebook4: "Test",
        bandcamp4: "Test",
        website4: "Test",
        contact_org: "Test",
        contact_phone: "Test",
        org_street1: "Test",
        org_street2: "Test",
        org_city: "Test",
        org_country: "Test",
        org_zip: "Test",
        event_detail: "Test",
        hold_number: "Test"
    }
]
describe('holds-router', () => {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('allholds_dibs').truncate())

    context('Given there are articles in the database', () => {
        beforeEach('insert articles', () => {
            return db
                .into('allholds_dibs')
                .insert(testHolds)
        })
        it('GET /holds responds with a list of all holds in database', () => {
            return supertest(app)
                .get('/holds')
                .expect(200, testHolds)
        })
    })
})