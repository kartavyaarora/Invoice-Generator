import { createReducer } from "@reduxjs/toolkit";
import { addInvoice, deleteInvoice, EditInvoice } from "./Actions";

const initialState = {
  invoiceList: []
};
export const invoiceReducer = createReducer(initialState, (builder) => {
  builder.addCase(addInvoice, (state, action) => {
    state.invoiceList = [...state.invoiceList, action.payload];
  });
  builder.addCase(deleteInvoice, (state, action) => {
    state.invoiceList = state.invoiceList.filter(
      (w) => w.invoiceNumber !== action.payload
    );
  });
  builder.addCase(EditInvoice, (state, action) => {
    state.invoiceList = [...action.payload];
  });
  builder.addDefaultCase((state, action) => {
    return state;
  });
});
