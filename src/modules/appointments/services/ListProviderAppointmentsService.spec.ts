import 'reflect-metadata';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list appointments in a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 10, 14, 0, 0),
      user_id: 'user',
      provider_id: 'provider',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 10, 15, 0, 0),
      user_id: 'user',
      provider_id: 'provider',
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 10,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
