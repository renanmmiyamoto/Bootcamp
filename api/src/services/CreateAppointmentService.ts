import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsReposiroty from '../repositories/AppoitmentsRepository';

interface Request {
	provider: string;
	date: Date;
}

class CreateAppointmentService {
	private appointmentsRepository: AppointmentsReposiroty;

	constructor(appointmentsRepository: AppointmentsReposiroty) {
		this.appointmentsRepository = appointmentsRepository;
	}

	public execute({ provider, date }: Request): Appointment {
		const appointmentDate = startOfHour(date);

		const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
			appointmentDate,
		);

		if (findAppointmentInSameDate)
			throw Error('This appointment is already booked');

		const appointment = this.appointmentsRepository.create({
			provider,
			date: appointmentDate,
		});

		return appointment;
	}
}

export default CreateAppointmentService;
