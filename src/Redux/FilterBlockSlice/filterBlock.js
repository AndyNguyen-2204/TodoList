import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filterBlock: null
}

export const FilterBlockSlice = createSlice({
  name: 'FilterBlock',
  initialState,
  reducers: {
    filterBLock: (state, action) => {
      state.filterBlock = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { filterBLock } = FilterBlockSlice.actions

export default FilterBlockSlice.reducer