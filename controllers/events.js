import { request, response } from "express";
import Event from '../models/eventModel.js'

export const getEvents = async( req = request, res = response ) => { 

  const events = await Event.find().populate( 'user', 'name' )

  res.json({
    ok: true,
    events
  })
}

export const newEvent = async( req = request, res = response ) => { 
  
  const newEvent = new Event( req.body )

  try {
    newEvent.user = req.uid;
    const savedEvent = await newEvent.save()

    console.log(savedEvent);

    res.status(201).json({ 
      ok: true,
      event: savedEvent
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'please talk to admin'
    })
  }
  
}

export const updateEvent = async( req = request, res = response ) => { 
  const { id } = req.params;

  try {
    const event = await Event.findById( id );

    console.log(event);

    if( !event ) return res.status(400).status({
      ok: false,
      msg: 'event with this id does not exist'
    })

    if( event.user.toString() !== req.uid ) return res.status(401).json({
      ok: false,
      msg: 'no privilege to edit this event'
    })

    const newEvent  = { 
      ...req.body,
      user: req.uid
    }

    const updatedEvent = await Event.findByIdAndUpdate( id, newEvent, { new: true } )

    res.json({
      ok: true,
      updatedEvent
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'speak with the admin'
    })
  }
}

export const deleteEvent = async( req = request, res = response ) => { 
    const { id } = req.params;

  try {
    const event = await Event.findById( id );

    if( !event ) return res.status(400).status({
      ok: false,
      msg: 'event with this id does not exist'
    })

    if( event.user.toString() !== req.uid ) return res.status(401).json({
      ok: false,
      msg: 'no privilege to delete this event'
    })
    await Event.findByIdAndDelete( id )

    res.json({
      ok: true
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'speak with the admin'
    })
  }
}