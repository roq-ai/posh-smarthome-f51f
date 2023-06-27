import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface EnergyUsageInterface {
  id?: string;
  user_id: string;
  energy_consumption: number;
  timestamp: any;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface EnergyUsageGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
