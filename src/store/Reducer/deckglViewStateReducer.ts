import { createSlice } from '@reduxjs/toolkit'
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit'

type ViewState = {
  longitude: number
  latitude: number
  zoom: number
  [key: string]: any
}
type InitialState = {
  deckglViewState: ViewState
}
type DeckGlViewStateActions = {
  setViewState: ActionCreatorWithPayload<ViewState, string>
}

const INITIAL_VIEW_STATE = {
  longitude: 114.07131316936093,
  latitude: 22.56833837847965,
  zoom: 12,
}

const initialState: InitialState = {
  deckglViewState: INITIAL_VIEW_STATE,
}

const deckglViewStateReducerSlice = createSlice({
  name: 'deckglViewStateReducer',
  initialState,
  reducers: {
    setViewState: (state, action: { payload: ViewState }) => {
      state.deckglViewState = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
const { setViewState }: DeckGlViewStateActions = deckglViewStateReducerSlice.actions

const deckglViewStateReducer = deckglViewStateReducerSlice.reducer

export { setViewState, deckglViewStateReducer }
export type { InitialState, ViewState }
