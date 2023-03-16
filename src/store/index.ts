import { configureStore } from '@reduxjs/toolkit'
import { mapReducer } from './Reducer/mapReducer'
import { deckglViewStateReducer } from './Reducer/deckglViewStateReducer'

const store = configureStore({
  reducer: { mapReducer, deckglViewStateReducer },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch

export type { RootState, AppDispatch }
export { store }
