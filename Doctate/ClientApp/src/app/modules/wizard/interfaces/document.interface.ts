import { Feature } from '@app/modules/wizard/interfaces/feature.interface';
import { Software } from '@app/modules/wizard/interfaces/software.interface';

export interface DocumentObject {
  OperatingSystem: string,
  Features: Feature[],
  Type:string,
  Cpu: string,
  Memory: string,
  Disk: string,
  Software: Software[],
  Instructions: string,
  Debugging: string
}
