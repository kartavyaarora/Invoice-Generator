import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InvoiceModal from "./InvoiceModal";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState([]);
  const { invoiceList } = useSelector((state) => state.invoiceReducer);
  React.useEffect(() => {
    setOpen([...Array(invoiceList?.length)].map(() => false));
  }, [invoiceList.length]);
  const handleOpen = (index) => {
    const newOpen = [...open];
    newOpen[index] = true;
    setOpen(newOpen);
  };
  const handleClose = (index) => {
    const newOpen = [...open];
    newOpen[index] = false;
    setOpen(newOpen);
  };
  return (
    <div className="mt-4">
      <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 g-4 my-2">
        {invoiceList.map((item, i) => (
          <>
            <div key={item.invoiceNumber} classname="col">
              <div
                className="border border-dark card-client overflow-hidden position-relative"
                onClick={() => handleOpen(i)}
              >
                <img src={invoiceList[0].invoiceImage} width={"100%"} alt="" />
                <div className="invoiceInfo d-flex justify-content-between">
                  <div>
                    <div>Invoice No.:{item.invoiceNumber}</div>
                    <div>Invoice to:{item.billTo}</div>
                    <div>{item.dateOfIssue}</div>
                  </div>
                  <div>
                    <div
                      type="button"
                      className="border border-primary rounded-3 py-1 px-2 my-1 text-white bg-primary"
                      onClick={() => navigate(`/Invoice/${item.invoiceNumber}`)}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </div>
                    <div
                      type="button"
                      className="border border-danger rounded-3 py-1 px-2 my-1 text-white bg-danger"
                      onClick={() => {
                        dispatch({
                          type: "deleteInvoice",
                          payload: item.invoiceNumber,
                        });
                      }}
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </div>
                  </div>
                </div>
              </div>
              <InvoiceModal
                showModal={open[i]}
                closeModal={() => {
                  handleClose(i);
                }}
                number={i}
                info={item}
                items={item.items}
                currency={item.currency}
                subTotal={item.subTotal}
                taxAmmount={item.taxAmmount}
                discountAmmount={item.discountAmmount}
                total={item.total}
              />
            </div>
          </>
        ))}
        <div className="col">
          <div
            type="button"
            className="border border-dark p-5 rounded-3 d-flex justify-content-center add my-auto h-100 "
            onClick={() => {
              navigate("/newInvoice");
            }}
          >
            <i className="bi bi-plus-lg fs-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
