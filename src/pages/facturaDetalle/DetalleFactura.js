import "./detalleFactura.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
//Custom Hooks
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUpdate } from "../../hooks/useUpdate";

const DetalleFactura = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { id } = useParams();
  const { user } = useAuthContext();
  const { documents: facturas } = useCollection("facturas", [
    "uid",
    "==",
    user.uid,
  ]);

  useEffect(() => {
    const specificFactura = facturas.filter((item) => item.id === id);
    setData(specificFactura);
  }, [facturas, id]);

  const { updatedDocument, error } = useUpdate("facturas");

  const handleApproved = () => {
    updatedDocument(id, "Approved");
    navigate(-1);
    console.log(error);
  };

  const handleRejected = () => {
    updatedDocument(id, "Rejected");
    navigate(-1);
    console.log(error);
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Información:</h1>
            {data.map((item) => (
              <div key={item.id} className="item">
                <img src={item.img} alt="" className="itemImg" />
                <div className="details">
                  <>
                    <h1 className="itemTitle">{item.username}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Title:</span>
                      <span className="itemValue">{item.title}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Descripcion:</span>
                      <span className="itemValue">{item.descripcion}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Cantidad:</span>
                      <span className="itemValue">{item.cantidad}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Precio:</span>
                      <span className="itemValue">{item.precio}</span>
                    </div>
                  </>
                </div>
              </div>
            ))}
            <button onClick={() => handleApproved()}>Approve</button>
            <button onClick={() => handleRejected()}>Reject</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleFactura;
