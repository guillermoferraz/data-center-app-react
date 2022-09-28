export interface ModulesTypes {
  name: string;
  description?: string;
  private?: boolean
}
export interface SubmoduleTypes {
  name: string;
  description: string;
  private: boolean;
  moduleId: string;
}