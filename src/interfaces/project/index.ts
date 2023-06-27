import { PoshSmartHomeInterface } from 'interfaces/posh-smart-home';
import { GetQueryInterface } from 'interfaces';

export interface ProjectInterface {
  id?: string;
  name: string;
  status: string;
  posh_smart_home_id: string;
  created_at?: any;
  updated_at?: any;

  posh_smart_home?: PoshSmartHomeInterface;
  _count?: {};
}

export interface ProjectGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  status?: string;
  posh_smart_home_id?: string;
}
