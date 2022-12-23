import { Router } from "express";
import { check } from "express-validator";
import { deleteEvent, getEvents, newEvent, updateEvent } from "../controllers/events.js";
import { isDate } from "../helpers/isDate.js";
import { validateEntries } from "../middlewares/validateEntries.js";
import { validateJWT } from "../middlewares/validateJWT.js";

export const eventsRouter = Router()
eventsRouter.use( validateJWT ) //? si voy a usar un middleware global puedo usar router.use

eventsRouter.get( '/', getEvents)

eventsRouter.post( '/', [
  check('title', 'title is required').not().isEmpty(),
  check('start', 'Start date is required').custom( isDate ),
  check('end', 'end date is required').custom( isDate ),
  validateEntries
], newEvent )

eventsRouter.put( '/:id', updateEvent )
eventsRouter.delete( '/:id', deleteEvent )