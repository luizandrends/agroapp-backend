import { container } from 'tsyringe';

import IHashProvider from './HashProvider/interfaces/IHashProvider';

import BCryptHashProvider from './HashProvider/implementations/BCryotHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
