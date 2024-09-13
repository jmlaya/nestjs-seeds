import { Type } from '@nestjs/common';

export interface Seedable {
  run(): Promise<void>;
}
  
export type SeedModuleOptions = {
  include?: Type<Seedable>[];
  exclude?: Type<Seedable>[];
  autoStart?: boolean;
};
