import { configureStore } from '@reduxjs/toolkit'
/* importado de la carpeta auth/index.js */
import { authSlice } from './auth' // hace referencia al archivo barril index.js
import { journalSlice } from './journal' // hace referencia al archivo barril index.js

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer,
  },
})