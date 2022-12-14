import { ModuleTypes, SubmoduleType } from "./module.types";

export const ModuleSchema: ModuleTypes = {
   Id: undefined, 
   Name: undefined, 
   Description: undefined, 
   Created_At: undefined, 
   Private: undefined 
};

export const SubmodulesSchema: SubmoduleType = {
   Id: undefined,
   ModuleId: undefined,
   Name: undefined,
   Description: undefined,
   Content: undefined,
   Private: undefined,
   Created_At: undefined,
}