import React, {useState} from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import BasiInfoInputModal from "../Modals/Profile/basiInfoInputModal";

const ProfileBasicInfo = (props) => {

  const [displayStatus, setDisplayStatus] = useState(false);

  const editProfileAction = ()=>{
    setDisplayStatus(true);
  }

  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <div className="pfl-header">
            <span className="strip-left bg-secondary"></span>
            <Row>
              <Col md={12}>
                <div className="heading-area">
                  <div className="title">Profile</div>
                  <p className="pfl-basi-tag">
                    Basic info, for faster booking experience
                  </p>
                </div>
                <div className="edt-btn-area">
                  <button className="edt-btn" onClick={editProfileAction}>Edit</button>
                </div>
              </Col>
            </Row>
          </div>
          <div className="pfl-table-paren mt-5">
            <table class="table table-hover">
              <tbody>
                <tr>
                  <th scope="row">Name</th>
                  <td colspan="3">MD Shafiul Islam</td>
                </tr>
                <tr>
                  <th scope="row">Birthday</th>
                  <td colspan="3">
                    <button className="prf-add-btn" onClick={editProfileAction}>+Add</button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Gender</th>
                  <td colspan="3">
                    <button className="prf-add-btn" onClick={editProfileAction}>+Add</button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Maritals status</th>
                  <td colspan="3">
                    <button className="prf-add-btn" onClick={editProfileAction}>+Add</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
      <BasiInfoInputModal show={displayStatus} hideAction={()=>{
        setDisplayStatus(false);
      }} />
    </React.Fragment>
  );
};

export default ProfileBasicInfo;
