import { createSlice } from '@reduxjs/toolkit'
import { getLocalStorage, setLocalStorage } from '@/utils'
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit'

const STORAGE_KEY = 'mapFileList'

type Data = {
  name: string
  file: string
}
type InitialState = {
  mapFileList: Data[]
}
type MapFileListActions = {
  addMapFile: ActionCreatorWithPayload<Data, string>
  editMapFile: ActionCreatorWithPayload<{ index: number; value: Data }, string>
  deleteMapFile: ActionCreatorWithPayload<number, string>
}

const initialState: InitialState = {
  mapFileList: getLocalStorage(STORAGE_KEY, true) ?? [],
}

const mapReducerSlice = createSlice({
  name: 'mapReducer',
  initialState,
  reducers: {
    addMapFile: (state, action: { payload: Data }) => {
      state.mapFileList.push(action.payload)
      setLocalStorage(STORAGE_KEY, state.mapFileList)
    },

    editMapFile: (state, action: { payload: { index: number; value: Data } }) => {
      state.mapFileList[action.payload.index] = action.payload.value
      setLocalStorage(STORAGE_KEY, state.mapFileList)
    },

    deleteMapFile: (state, action: { payload: number }) => {
      state.mapFileList.splice(action.payload, 1)
      setLocalStorage(STORAGE_KEY, state.mapFileList)
    },
  },
})

// Action creators are generated for each case reducer function
const { addMapFile, editMapFile, deleteMapFile }: MapFileListActions = mapReducerSlice.actions

const mapReducer = mapReducerSlice.reducer

export { addMapFile, editMapFile, deleteMapFile, mapReducer }
export type { InitialState, Data }
