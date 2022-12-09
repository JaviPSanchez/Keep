import "./single.scss";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
//Custom Hook
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";

const Single = () => {
  const { user } = useAuthContext();
  const { documents: users } = useCollection("users", ["uid", "==", user.uid]);
  const { id } = useParams();
  console.log(id);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            {users.map((item) => (
              <div className="item">
                <img src={item.img} alt="" className="itemImg" />
                <div className="details">
                  <>
                    <h1 className="itemTitle">{item.username}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Uid:</span>
                      <span className="itemValue">{item.uid}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue">{item.email}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Phone:</span>
                      <span className="itemValue">{item.phone}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Address:</span>
                      <span className="itemValue">{item.address}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Country:</span>
                      <span className="itemValue">{item.country}</span>
                    </div>
                  </>
                </div>
              </div>
            ))}
          </div>
          <div className="right">
            <Chart aspect={4 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <Table statusProp={"Pending"} />
          <Table statusProp={"Approved"} />
          <Table statusProp={"Rejected"} />
        </div>
      </div>
    </div>
  );
};

export default Single;
