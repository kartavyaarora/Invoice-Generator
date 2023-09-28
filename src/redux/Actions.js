import { createAction } from "@reduxjs/toolkit";

const addInvoice = createAction('addInvoice');
const deleteInvoice = createAction('deleteInvoice');
const EditInvoice = createAction('EditInvoice');

export {addInvoice, deleteInvoice, EditInvoice};