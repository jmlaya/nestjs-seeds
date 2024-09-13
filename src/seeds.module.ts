import { DynamicModule, Module } from '@nestjs/common';
import { RunnerService } from './runner.service';
import { DiscoveryModule } from '@nestjs/core';
import { SeedModuleOptions } from './types';

export const SEED_MODULE_OPTIONS = 'SEED_MODULE_OPTIONS';

@Module({})
export class SeedsModule {
  static forRoot(options?: SeedModuleOptions): DynamicModule {
    return {
      module: SeedsModule,
      imports: [DiscoveryModule],
      providers: [
        RunnerService,
        {
          provide: SEED_MODULE_OPTIONS,
          useValue: options || {},
        },
      ],
    };
  }
}
