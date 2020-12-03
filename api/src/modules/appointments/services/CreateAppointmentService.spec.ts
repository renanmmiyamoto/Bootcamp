import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
	it('should be able to create a now appointment', async () => {
		const fakeAppointmentsRepository = new FakeAppointmentsRepository();
		const createAppointmentService = new CreateAppointmentService(
			fakeAppointmentsRepository,
		);

		const appointment = await createAppointmentService.execute({
			date: new Date(),
			provider_id: '12312312',
		});

		expect(appointment).toHaveProperty('id');
		expect(appointment.provider_id).toBe('12312312');
	});

	it('should not be able to create two appointments at the same time', async () => {
		const fakeAppointmentsRepository = new FakeAppointmentsRepository();
		const createAppointmentService = new CreateAppointmentService(
			fakeAppointmentsRepository,
		);

		const appointmentDate = new Date();

		await createAppointmentService.execute({
			date: appointmentDate,
			provider_id: '12312312',
		});

		expect(
			createAppointmentService.execute({
				date: appointmentDate,
				provider_id: '12312312',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
