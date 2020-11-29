import { EntityRepository, Repository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsReposiroty extends Repository<Appointment> {
	public async findByDate(date: Date): Promise<Appointment | null> {
		const findAppointment = await this.findOne({
			where: { date },
		});

		return findAppointment || null;
	}
}

export default AppointmentsReposiroty;
