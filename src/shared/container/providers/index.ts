import { container } from 'tsyringe';

import IMailProvider from './MailProvider/models/IMailProviders';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
