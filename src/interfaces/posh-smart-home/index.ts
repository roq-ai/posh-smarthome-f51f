import { ForumInterface } from 'interfaces/forum';
import { ProjectInterface } from 'interfaces/project';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PoshSmartHomeInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  forum?: ForumInterface[];
  project?: ProjectInterface[];
  user?: UserInterface;
  _count?: {
    forum?: number;
    project?: number;
  };
}

export interface PoshSmartHomeGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
