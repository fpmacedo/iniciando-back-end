import { container } from 'tsyringe';
import IMailTemplateProvider from './models/IMailTemplateProviders';
import HandlebarsMailTemplateProvider from './implementations/HandleBarsMailTemplateProvider';

const providers = {
  handleBars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handleBars,
);
