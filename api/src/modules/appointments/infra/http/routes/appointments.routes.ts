import { Router } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (req, res) => {
// 	const appointments = await appointmentsRepository.find();

// 	return res.json(appointments);
// });

appointmentsRouter.post('/', async (req, res) => {
	const { provider_id, date } = req.body;

	const parsedDate = parseISO(date);

	const createAppointment = container.resolve(CreateAppointmentService);

	const appointment = await createAppointment.execute({
		provider_id,
		date: parsedDate,
	});

	return res.json(appointment);
});

export default appointmentsRouter;
