const path = require('path')
const express = require('express')
const xss = require('xss')
const HoldsService = require('./holds-service')

const holdsRouter = express.Router()
const jsonParser = express.json()

const serializeHoldDate = hold => ({
  id: xss(hold.id),
  hold_date: xss(hold.hold_date)
})


const serializeHold = hold => ({
    id: xss(hold.id),
    hold_date: xss(hold.hold_date),
    date_of_req: xss(hold.date_of_req), 
    hold_status: xss(hold.hold_status),
    date_of_req: xss(hold.date_of_req),
    hold_type: xss(hold.hold_type),
    holdmonth_start: xss(hold.holdmonth_start),
    holdmonth_end: xss(hold.holdmonth_end),
    holdday_start: xss(hold.holdday_start),
    holdday_end: xss(hold.holdday_end),
    holdyear_start: xss(hold.holdyear_start),
    holdyear_end: xss(hold.holdyear_end),
    holds: [],
    holds_added: [],
    hold_type: xss(hold.hold_type),
    contact_type: xss(hold.contact_type), 
    event_type: xss(hold.event_type), 
    support_need: xss(hold.support_need), 
    dsupport_type: xss(hold.dsupport_type), 
    support_type3: xss(hold.support_type3), 
    support_type4: xss(hold.support_type4), 
    hold_firstname: xss(hold.hold_firstname), 
    hold_lastname: xss(hold.hold_lastname), 
    hold_email: xss(hold.hold_email),
    contact_act: xss(hold.contact_act),
    spotify: xss(hold.spotify),
    youtube: xss(hold.youtube),
    facebook: xss(hold.facebook),
    bandcamp: xss(hold.bandcamp),
    website: xss(hold.website),
    dsupport_title: xss(hold.dsupport_title),
    spotify2: xss(hold.spotify2),
    youtube2: xss(hold.youtube2),
    facebook2: xss(hold.facebook2),
    bandcamp2: xss(hold.bandcamp2),
    website2: xss(hold.website2),
    opener_title: xss(hold.opener_title),
    spotify3: xss(hold.spotify3),
    youtube3: xss(hold.youtube3),
    facebook3: xss(hold.facebook3),
    bandcamp3: xss(hold.bandcamp3),
    website3: xss(hold.website3),
    opener2_title: xss(hold.opener2_title),
    spotify4: xss(hold.spotify4),
    youtube4: xss(hold.youtube4),
    facebook4: xss(hold.facebook4),
    bandcamp4: xss(hold.bandcamp4),
    website4: xss(hold.website4),
    contact_org: xss(hold.contact_org),
    contact_phone: xss(hold.contact_phone),
    org_street1: xss(hold.org_street1),
    org_street2: xss(hold.org_street2),
    org_city: xss(hold.org_city),
    org_country: xss(hold.org_country),
    org_zip: xss(hold.org_zip),
    event_detail: xss(hold.event_detail),
    hold_number: xss(hold.hold_number)
})

holdsRouter
  .route('/holds/dates')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    HoldsService.getAllHolds(knexInstance)
      .then(holds => {
        res.json(holds.map(serializeHoldDate))
      })
      .catch(next)
  })
holdsRouter
  .route('/holds')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    HoldsService.getAllHolds(knexInstance)
      .then(holds => {
        res.json(holds.map(serializeHold))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { 
        id,
        date_of_req,        
        hold_status,
        hold_date,
        contact_type,         
        event_type,       
        support_need,         
        dsupport_type, 
        support_type3, 
        support_type4, 
        hold_firstname,  
        hold_lastname, 
        hold_email,      
        contact_act,       
        spotify,   
        youtube,   
        facebook,    
        bandcamp,    
        website,   
        dsupport_title, 
        spotify2,    
        youtube2,    
        facebook2,     
        bandcamp2,     
        website2,    
        opener_title,        
        spotify3,    
        youtube3,    
        facebook3,     
        bandcamp3,     
        website3,    
        opener2_title,         
        spotify4,    
        youtube4,    
        facebook4,     
        bandcamp4,     
        website4,    
        contact_org,       
        contact_phone,         
        org_street1,       
        org_street2,       
        org_city,    
        org_country,       
        org_zip,   
        event_detail, 
        hold_number   
    } = req.body

    console.log(req.body)

    const newHold = { 
        id,
        date_of_req,        
        hold_status,
        hold_date, 
        contact_type,         
        event_type,       
        support_need,         
        dsupport_type, 
        support_type3, 
        support_type4, 
        hold_firstname,  
        hold_lastname, 
        hold_email,      
        contact_act,       
        spotify,   
        youtube,   
        facebook,    
        bandcamp,    
        website,   
        dsupport_title, 
        spotify2,    
        youtube2,    
        facebook2,     
        bandcamp2,     
        website2,    
        opener_title,        
        spotify3,    
        youtube3,    
        facebook3,     
        bandcamp3,     
        website3,    
        opener2_title,         
        spotify4,    
        youtube4,    
        facebook4,     
        bandcamp4,     
        website4,    
        contact_org,       
        contact_phone,         
        org_street1,       
        org_street2,       
        org_city,    
        org_country,       
        org_zip,   
        event_detail,
        hold_number
     }

    HoldsService.insertHold(
      req.app.get('db'),
      newHold
    )
      .then(hold => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl))
          .json(serializeHold(hold))
      })
      .catch(next)
  })

  holdsRouter
  .route('/holds/:id')
  .patch(jsonParser, (req, res, next) => {
    const knexInstance = req.app.get('db')
    const { hold_status } = req.body
    const id = req.params.id
    HoldsService.updateHold(knexInstance, id, {hold_status})
      .then(hold => {
        res.json(serializeHold(hold))
      })
      .catch(next)
  })

module.exports = holdsRouter