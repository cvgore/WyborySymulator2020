import { randomBytes as _randomBytes } from 'crypto';
import { promisify } from 'util';

export const randomBytes = promisify(_randomBytes);
