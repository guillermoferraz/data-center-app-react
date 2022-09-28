import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ModuleSchema } from "../../schema/modules/modules.schema";
import Modules from "../../services/modules/modules";
import { ModulesTypes, SubmoduleTypes } from "../../services/modules/modules.types";

export const addModule = createAsyncThunk('/addmodule', async (data: ModulesTypes) => {
  try {
    const response = await Modules.addModule(data)
    return response;
  } catch (err: any) {
    console.error(err)
    return err?.response?.data
  }
});

export const getModules = createAsyncThunk('/modules', async () => {
  try {
    const response = await Modules.getModules();
    return response;
  } catch (err: any) {
    console.error(err)
    return err?.response?.data
  }
})

export const addSubmodule = createAsyncThunk('/addsubmodules', async (data: SubmoduleTypes) => {
  try {
    const response = await Modules.addSubmodule(data);
    return response;
  } catch (err: any) {
    console.error(err)
    return err?.response?.data
  }
})

const modulesSlice = createSlice({
  name: 'modules',
  initialState: {
    addModuleResponse: { message: undefined, status: undefined },
    addSubmoduleResponse: { message: undefined, status: undefined },
    loading: false,
    addNewModule: false,
    addNewSubmodule: false,
    modules: [{...ModuleSchema}],
    moduleSelected: {...ModuleSchema}
  },
  reducers: {
    setAddNewModule: (state, { payload }) => {
      state.addNewModule = payload.value
    },
    setAddNewSubmodule: (state, { payload }) => {
      state.addNewSubmodule = payload.value
    },
    setCleanAddModuleResponse: (state) => {
      state.addModuleResponse = { message: undefined, status: undefined }
    },
    setModuleSelected:(state, { payload }) => {
      state.moduleSelected = payload
    },
    setCleanAddSubmoduleResponse: (state) => {
      state.addSubmoduleResponse = { message: undefined, status: undefined }
    }
  },
  extraReducers: builder => {
    builder.addCase(addModule.fulfilled, (state, { payload }: any) => {
      state.addModuleResponse = payload;
      state.loading = false;
    })
      .addCase(addModule.pending, (state) => {
        state.loading = true;
      })
      .addCase(getModules.fulfilled, (state, { payload }) => {
        state.modules = payload;
        state.loading = false;
      })
      .addCase(getModules.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSubmodule.fulfilled, (state, { payload }) => {
        state.addSubmoduleResponse = payload;
        state.loading = false
      })
      .addCase(addSubmodule.pending, (state) => {
        state.loading = true;
      })
  }
});
export default modulesSlice;