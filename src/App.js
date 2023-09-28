import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import InvoiceForm from './components/InvoiceForm';
import Navbar from './components/Navbar';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
 } from 'react-router-dom';
import EditInvoice from './components/EditInvoice';
class App extends Component {
  render() {
  return (
    <div className="App d-flex flex-column align-items-center w-100">
        {/* <InvoiceForm/> */}
        <Router>
        <Navbar/>
        <Container>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/newInvoice' element={<InvoiceForm/>}/>
            <Route path='/Invoice/:id' element={<EditInvoice/>}/>
          </Routes>
          </Container>
        </Router>
    </div>
  );
}}

export default App;

// vZXFcCf2FqCKjxkA
// vZXFcCf2FqCKjxkA