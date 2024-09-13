/* eslint-disable @typescript-eslint/ban-types */

import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const SEED_SERVICE = 'SEED_SERVICE';

export const Seed = (): CustomDecorator<string> => SetMetadata(SEED_SERVICE, true);
