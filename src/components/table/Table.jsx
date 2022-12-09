import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useState, useEffect } from "react";
//Custom Hooks
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const List = ({ statusProp }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { documents: facturas } = useCollection("facturas", [
    "uid",
    "==",
    user.uid,
  ]);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "facturas", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(facturas);

  useEffect(() => {
    setStatus(facturas.filter((item) => item.status === statusProp));
  }, [facturas, statusProp]);

  // console.log(status);

  const handleView = async (id) => {
    navigate(`/facturas/${id}`);
  };

  return (
    <TableContainer component={Paper} className="table">
      {status && (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Tracking ID</TableCell>
              <TableCell className="tableCell">Title</TableCell>
              <TableCell className="tableCell">Cantidad</TableCell>
              <TableCell className="tableCell">Descripcion</TableCell>
              <TableCell className="tableCell">Cantidad</TableCell>
              <TableCell className="tableCell">Status</TableCell>
              <TableCell className="tableCell">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {status.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="tableCell">{item.id}</TableCell>
                <TableCell className="tableCell">{item.title}</TableCell>
                <TableCell className="tableCell">{item.cantidad}</TableCell>
                <TableCell className="tableCell">{item.descripcion}</TableCell>
                <TableCell className="tableCell">{item.precio}</TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${item.status}`}>{item.status}</span>
                </TableCell>
                <TableCell className="tableCell">
                  <DeleteIcon
                    onClick={() => handleDelete(item.id)}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  />
                  <VisibilityIcon
                    onClick={() => handleView(item.id)}
                    style={{ cursor: "pointer" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default List;
