import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { SEED_SERVICE } from './seed.decorator';
import { Seedable, SeedModuleOptions } from './types';
import { SEED_MODULE_OPTIONS } from './seeds.module';

@Injectable()
export class RunnerService implements OnApplicationBootstrap {
  private readonly logger = new Logger(`Seeds - ${RunnerService.name}`);

  constructor(
    private readonly discoveryService: DiscoveryService,
    @Inject(SEED_MODULE_OPTIONS) private readonly moduleOptions: SeedModuleOptions,
  ) {}

  onApplicationBootstrap() {
    if (this.moduleOptions.autoStart === undefined || this.moduleOptions.autoStart) {
      this.runAllSeeds();
    }
  }

  async runAllSeeds() {
    const providers = this.discoveryService.getProviders();

    const seedProviders = providers.filter((provider) => {
      const instance = provider.instance as Seedable;
      return instance && Reflect.getMetadata(SEED_SERVICE, provider.metatype);
    });

    let seedsToRun = seedProviders;
    
    if (!!this.moduleOptions.include) {
      seedsToRun = seedProviders.filter((sp) => this.moduleOptions.include?.find((is) => is.name === sp.name));
    }

    if (this.moduleOptions?.exclude) {
      seedsToRun = seedProviders.filter((sp) => this.moduleOptions.exclude?.find((is) => is.name === sp.name));
    }

    for (const provider of seedsToRun) {
      const seedInstance = provider.instance as Seedable;
      this.logger.log(`Running seed for ${provider.metatype.name}`);
      await seedInstance.run();
    }
  }
}
