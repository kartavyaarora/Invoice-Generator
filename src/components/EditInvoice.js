import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InvoiceItem from "./InvoiceItem";
import InputGroup from "react-bootstrap/InputGroup";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import UpdateModal from "./UpdateModal";

export default function EditInvoice() {
  const { id } = useParams();
  const { invoiceList } = useSelector((state) => state.invoiceReducer);
  useEffect(() => {
    
  }, [])
  
  let invoice = {};
  for(let i=0; i<invoiceList.length;i++){
    if(invoiceList[i].invoiceNumber==id){
      invoice = invoiceList[i];
    }  
  }
  const now = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState("$");
  const [currentDate, setCurrentDate] = useState(now);
  const [invoiceNumber, setInvoiceNumber] = useState(invoice.invoiceNumber);
  const [dateOfIssue, setDateOfIssue] = useState(invoice.dateOfIssue);
  const [billTo, setBillTo] = useState(invoice.billTo);
  const [billToEmail, setBillToEmail] = useState(invoice.billToEmail);
  const [billToAddress, setBillToAddress] = useState(invoice.billToAddress);
  const [billFrom, setBillFrom] = useState(invoice.billFrom);
  const [billFromEmail, setBillFromEmail] = useState(invoice.billFromEmail);
  const [billFromAddress, setBillFromAddress] = useState(invoice.billFromAddress);
  const [notes, setNotes] = useState("");
  const [total, setTotal] = useState(invoice.total);
  const [subTotal, setSubTotal] = useState(invoice.subTotal);
  const [taxRate, setTaxRate] = useState("");
  const [taxAmount, setTaxAmount] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [items, setItems] = useState(invoice.items);

  useEffect(() => {
    handleCalculateTotal();
  }, []);

  const handleRowDel = (itemToRemove) => {
    const updatedItems = items.filter((item) => item.id !== itemToRemove.id);
    setItems(updatedItems);
  };

  const handleAddEvent = () => {
    const id = (new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newItem = {
      id,
      name: "",
      price: "",
      description: "",
      quantity: "",
    };
    setItems([...items, newItem]);
  };

  const handleCalculateTotal = () => {
    let subTotal = 0;
    items.forEach((item) => {
      subTotal = (
        parseFloat(subTotal) +
        parseFloat(item.price) * parseFloat(item.quantity)
      ).toFixed(2);
    });

    setSubTotal(parseFloat(subTotal).toFixed(2));
    const taxAmountValue = parseFloat(subTotal) * (taxRate / 100);
    setTaxAmount(taxAmountValue.toFixed(2));
    const discountAmountValue = parseFloat(subTotal) * (discountRate / 100);
    setDiscountAmount(discountAmountValue.toFixed(2));
    const totalValue = subTotal - discountAmountValue + taxAmountValue;
    setTotal(totalValue.toFixed(2));
  };

  const onItemizedItemEdit = (evt) => {
    const { id, name, value } = evt.target;
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setItems(updatedItems);
    handleCalculateTotal();
  };

  const editField = (event) => {
    const { name, value } = event.target;
    if (name === "invoiceNumber") {
      setInvoiceNumber(value);
    }
    setNotes(value);
    handleCalculateTotal();
  };

  const onCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const openModal = (event) => {
    event.preventDefault();
    handleCalculateTotal();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="mt-3">
        <NavLink to="/">
          <i className="bi bi-arrow-left text-dark fs-2 mt-4"></i>
        </NavLink>
      </div>
      <Form onSubmit={openModal}>
        <Row>
          <Col md={8} lg={9}>
            <Card className="p-4 p-xl-5 my-3 my-xl-4">
              <div className="d-flex flex-row align-items-start justify-content-between mb-3">
                <div className="d-flex flex-column">
                  <div className="d-flex flex-column">
                    <div className="mb-2">
                      <span className="fw-bold">Current Date:&nbsp;</span>
                      <span className="current-date">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <span className="fw-bold d-block me-2">Due Date:</span>
                    <Form.Control
                      type="date"
                      value={invoice.dateOfIssue}
                      name={"dateOfIssue"}
                      onChange={(event) => setDateOfIssue(event.target.value)}
                      style={{
                        maxWidth: "150px",
                      }}
                      required="required"
                    />
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold me-2">Invoice Number:</span>
                  <Form.Control
                    type="number"
                    value={invoice.invoiceNumber}
                    name={"invoiceNumber"}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    min="1"
                    style={{
                      maxWidth: "70px",
                    }}
                    required="required"
                  />
                </div>
              </div>
              <hr className="my-4" />
              <Row className="mb-5">
                <Col>
                  <Form.Label className="fw-bold">Bill to:</Form.Label>
                  <Form.Control
                    placeholder={invoice.billTo}                    rows={3}
                    value={billTo}
                    type="text"
                    name="billTo"
                    className="my-2"
                    onChange={(event) => setBillTo(event.target.value)}
                    autoComplete="name"
                    required="required"
                  />
                  <Form.Control
                    placeholder={invoice.billToEmail}
                    value={billToEmail}
                    type="email"
                    name="billToEmail"
                    className="my-2"
                    onChange={(event) => setBillToEmail(event.target.value)}
                    autoComplete="email"
                    required="required"
                  />
                  <Form.Control
                    placeholder={invoice.billToAddress}
                    value={billToAddress}
                    type="text"
                    name="billToAddress"
                    className="my-2"
                    autoComplete="address"
                    onChange={(event) => setBillToAddress(event.target.value)}
                    required="required"
                  />
                </Col>
                <Col>
                  <Form.Label className="fw-bold">Bill from:</Form.Label>
                  <Form.Control
                    placeholder={invoice.billFrom}
                    rows={3}
                    value={billFrom}
                    type="text"
                    name="billFrom"
                    className="my-2"
                    onChange={(event) => setBillFrom(event.target.value)}
                    autoComplete="name"
                    required="required"
                  />
                  <Form.Control
                    placeholder={invoice.billFromEmail}
                    value={billFromEmail}
                    type="email"
                    name="billFromEmail"
                    className="my-2"
                    onChange={(event) => setBillFromEmail(event.target.value)}
                    autoComplete="email"
                    required="required"
                  />
                  <Form.Control
                    placeholder={invoice.billFromAddress}
                    value={billFromAddress}
                    type="text"
                    name="billFromAddress"
                    className="my-2"
                    autoComplete="address"
                    onChange={(event) => setBillFromAddress(event.target.value)}
                    required="required"
                  />
                </Col>
              </Row>
              <InvoiceItem
                onItemizedItemEdit={onItemizedItemEdit}
                onRowAdd={handleAddEvent}
                onRowDel={handleRowDel}
                currency={currency}
                items={items}
              />
              <Row className="mt-4 justify-content-end">
                <Col lg={6}>
                  <div className="d-flex flex-row align-items-start justify-content-between">
                    <span className="fw-bold">Subtotal:</span>
                    <span>
                      {currency}
                      {subTotal}
                    </span>
                  </div>
                  <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                    <span className="fw-bold">Discount:</span>
                    <span>
                      <span className="small ">({discountRate || 0}%)</span>
                      {currency}
                      {discountAmount || 0}
                    </span>
                  </div>
                  <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                    <span className="fw-bold">Tax:</span>
                    <span>
                      <span className="small ">({taxRate || 0}%)</span>
                      {currency}
                      {taxAmount || 0}
                    </span>
                  </div>
                  <hr />
                  <div
                    className="d-flex flex-row align-items-start justify-content-between"
                    style={{
                      fontSize: "1.125rem",
                    }}
                  >
                    <span className="fw-bold">Total:</span>
                    <span className="fw-bold">
                      {currency}
                      {total || 0}
                    </span>
                  </div>
                </Col>
              </Row>
              <hr className="my-4" />
              <Form.Label className="fw-bold">Notes:</Form.Label>
              <Form.Control
                placeholder={invoice.notes}
                name="notes"
                value={notes}
                onChange={(event) => editField(event)}
                as="textarea"
                className="my-2"
                rows={1}
              />
            </Card>
          </Col>
          <Col md={4} lg={3}>
            <div className="sticky-top pt-md-3 pt-xl-4">
              <Button variant="primary" type="submit" className="d-block w-100">
                Review Invoice
              </Button>
              <UpdateModal
                showModal={isOpen}
                closeModal={closeModal}
                id={id}
                info={{
                  currency,
                  currentDate,
                  invoiceNumber,
                  dateOfIssue,
                  billTo,
                  billToEmail,
                  billToAddress,
                  billFrom,
                  billFromEmail,
                  billFromAddress,
                  notes,
                  total,
                  subTotal,
                  taxRate,
                  taxAmount,
                  discountRate,
                  discountAmount,
                }}
                number={invoice.invoiceNumber || invoiceList.length + 1}
                items={items}
                currency={currency}
                subTotal={subTotal}
                taxAmmount={taxAmount}
                discountAmmount={discountAmount}
                total={total}
              />
              <hr className="mt-4 mb-3" />
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Currency:</Form.Label>
                <Form.Select
                  onChange={(event) => onCurrencyChange(event)}
                  className="btn btn-light my-1"
                  aria-label="Change Currency"
                >
                  <option value="$">USD (United States Dollar)</option>
                  <option value="£">GBP (British Pound Sterling)</option>
                  <option value="¥">JPY (Japanese Yen)</option>
                  <option value="$">CAD (Canadian Dollar)</option>
                  <option value="$">AUD (Australian Dollar)</option>
                  <option value="$">SGD (Singapore Dollar)</option>
                  <option value="¥">CNY (Chinese Renminbi)</option>
                  <option value="₿">BTC (Bitcoin)</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label className="fw-bold">Tax rate:</Form.Label>
                <InputGroup className="my-1 flex-nowrap">
                  <Form.Control
                    name="taxRate"
                    type="number"
                    value={taxRate}
                    onChange={(event) => setTaxRate(event.target.value)}
                    className="bg-white border"
                    placeholder={invoice.taxRate}         
                    min="0.00"
                    step="0.01"
                    max="100.00"
                  />
                  <InputGroup.Text className="bg-light fw-bold text-secondary small">
                    %
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label className="fw-bold">Discount rate:</Form.Label>
                <InputGroup className="my-1 flex-nowrap">
                  <Form.Control
                    name="discountRate"
                    type="number"
                    value={discountRate}
                    onChange={(event) => setDiscountRate(event.target.value)}
                    className="bg-white border"
                    placeholder={invoice.discountRate} 
                    min="0.00"
                    step="0.01"
                    max="100.00"
                  />
                  <InputGroup.Text className="bg-light fw-bold text-secondary small">
                    %
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
}
