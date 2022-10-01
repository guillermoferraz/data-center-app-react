import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ModuleSchema, SubmodulesSchema } from "../../schema/modules/modules.schema";
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

export const patchModule = createAsyncThunk('/module/edit', async (data: ModulesTypes & {id: string}) => {
  try {
    const response = await Modules.patchModule(data)
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
export const patchSubmodule = createAsyncThunk('/submodule/edit', async (data: SubmoduleTypes & {id: string}) => {
  try {
    const response = await Modules.patchSubmodule(data);
    return response;
  } catch (err: any) {
    console.error(err)
    return err?.response?.data
  }
})
export const getSubmodulesByModule = createAsyncThunk('/submodulesbymodule/:id', async(id: string) => {
  try {
    const response = await Modules.getSubmodulesByModule(id);
    return response;
  } catch (err: any) {
    console.error(err)
    return err?.response?.data
  }
})

export const deleteSubmodule = createAsyncThunk('/delete/submodule/:id', async (id: string) => {
  try {
    const response = await Modules.deleteSubmodule(id);
    return response;
  } catch (err: any) {
    console.error(err)
    return err?.response?.data
  }
})

export const deleteModule = createAsyncThunk('/delete/module/:id', async (id: string) => {
  try {
    const response = await Modules.deleteModule(id);
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
    editModule: false,
    editSubmodule: false,
    modules: [{...ModuleSchema}],
    moduleSelected: {...ModuleSchema},
    showInfoCard: true,
    submodulesByModule: [{...SubmodulesSchema}],
    submoduleSelected: { ...SubmodulesSchema },
    deleteSubmoduleResponse: { message: undefined, status: undefined },
    deleteModuleResponse: { message: undefined, status: undefined },
    patchModuleResponse: { message: undefined, status: undefined },
    patchSubmoduleResponse: { message: undefined, status: undefined }
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
    },
    setShowInfo:(state, { payload }) => {
      state.showInfoCard = payload.value
    },
    setSubmoduleSelected: (state, { payload }) => {
      state.submoduleSelected = payload
    },
    setCleanDeleteSubmoduleResponse: (state) => {
      state.deleteSubmoduleResponse = { message: undefined, status: undefined }
    },
    setCleanDeleteModuleResponse: (state) => {
      state.deleteModuleResponse = { message: undefined, status: undefined }
    },
    setSubmoduleByModule: (state) => {
      state.submodulesByModule = [{ ...SubmodulesSchema  }]
    },
    setEditModule:(state, { payload }) => {
      state.editModule = payload
    },
    setEditSubmodule:(state, { payload }) => {
      state.editSubmodule = payload
    },
    setCleanPatchModuleResponse: (state) => {
      state.patchModuleResponse = { message: undefined, status: undefined }
    },
    setCleanPatchSubmoduleResponse: (state) => { 
      state.patchSubmoduleResponse = { message: undefined, status: undefined }
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
      .addCase(getSubmodulesByModule.fulfilled, (state, { payload }) => {
        state.submodulesByModule = payload;
        state.loading = false
      })
      .addCase(getSubmodulesByModule.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSubmodule.fulfilled, (state, { payload }) => {
        state.deleteSubmoduleResponse = payload;
        state.loading = false;
      })
      .addCase(deleteSubmodule.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteModule.fulfilled, (state, { payload }) => {
        state.deleteModuleResponse = payload;
        state.loading = false;
      })
      .addCase(deleteModule.pending, (state) => {
        state.loading = true;
      })
      .addCase(patchModule.fulfilled, (state, { payload }) => {
        state.patchModuleResponse = payload;
        state.loading = false;
      })
      .addCase(patchModule.pending, (state) => {
        state. loading = true;
      })
      .addCase(patchSubmodule.fulfilled, (state, { payload }) => {
        state.patchSubmoduleResponse = payload;
        state.loading = false;
      })
      .addCase(patchSubmodule.pending, (state) => {
        state. loading = true;
      })
  }
});
export default modulesSlice;