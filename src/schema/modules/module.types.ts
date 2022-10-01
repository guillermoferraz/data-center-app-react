export interface ModuleTypes {
  Id?: string;
  Name?: string;
  Description?: string;
  Private?: boolean;
  Created_At?: Date
}

export interface SubmoduleType {
  Id?: string;
  Name?: string;
  ModuleId?: string;
  Description?: string;
  Private?: boolean;
  Content?: string;
  Created_At?: Date
}