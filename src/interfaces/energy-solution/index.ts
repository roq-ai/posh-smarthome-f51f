import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface EnergySolutionInterface {
  id?: string;
  name: string;
  description: string;
  provider_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface EnergySolutionGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  provider_id?: string;
}
