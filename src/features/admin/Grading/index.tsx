import { Button, Table } from "react-bootstrap";
import { ConnectedProps, connect } from "react-redux";
import {
  OrderItem,
  selectGradingOrder,
  updateGradingOrder,
} from "../adminSlice";
import { faEdit, faFileDownload } from "@fortawesome/free-solid-svg-icons";

import BootstrapTable from "react-bootstrap-table-next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "components/Loading";
import OpenPDF from "components/portal/OpenPDF";
import RandomiseOrder from "./RandomiseOrder";
import React from "react";
import { RootState } from "store";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

interface ApplicationInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  finnish: boolean;
  birthdate: string;
  city: string;
  school: string;
}

interface GradingState {
  loading: boolean[];
  applications: Record<string, ApplicationInfo> | undefined;
}

class Grading extends React.Component<GradingProps, GradingState> {
  state = {
    loading: [true, true],
    applications: {},
  };

  componentDidMount() {
    axios.get<ApplicationInfo[]>("/application").then((res) => {
      const applications: Record<string, ApplicationInfo> = {};
      res.data.forEach((applicant) => (applications[applicant.id] = applicant));
      this.setState({ applications, loading: [false, this.state.loading[1]] });
    });
    axios.get<OrderItem[]>("/admin/grading").then((res) => {
      this.props.updateGradingOrder(res.data);
      this.setState({ loading: [this.state.loading[0], false] });
    });
  }

  render() {
    const loading = this.state.loading[0] || this.state.loading[1];
    const applications: Record<string, ApplicationInfo> = this.state
      .applications;
    const orderedApplications = this.props.order.map((orderItem, index) => ({
      ...applications[orderItem.applicantId],
      index,
    }));

    const columns = [
      {
        dataField: "index",
        text: "#",
      },
      {
        dataField: "firstName",
        text: "Förnamn",
      },
      {
        dataField: "lastName",
        text: "Efternamn",
      },
      {
        dataField: "id",
        text: "Visa",
        formatter: (id: string) => (
          <OpenPDF url={`/application/${id}/pdf`}>
            <FontAwesomeIcon icon={faFileDownload} />
          </OpenPDF>
        ),
      },
    ];

    return (
      <div>
        <>
          <p>För att börja bedöma behöver du slumpa ordningen.</p>
          <RandomiseOrder />
          <BootstrapTable
            striped
            bordered
            keyField="index"
            data={orderedApplications}
            columns={columns}
            noDataIndication={() => (
              <Spinner
                animation="border"
                style={{
                  margin: "0 auto",
                  display: "block",
                  fontSize: "3rem",
                  width: "5rem",
                  height: "5rem",
                }}
              />
            )}
          />
          {/* <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Förnamn</th>
                <th>Efternamn</th>
                <th>Visa</th>
                <th>Betygsätt</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                orderedApplications?.map((applicant, index) => (
                  <tr key={index + "applicant"}>
                    <td>{index + 1}</td>
                    <td>{applicant.firstName}</td>
                    <td>{applicant.lastName}</td>
                    <td>
                      <OpenPDF url={`/application/${applicant.id}/pdf`}>
                        <FontAwesomeIcon icon={faFileDownload} />
                      </OpenPDF>
                    </td>
                    <td>
                      <Button>
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table> */}
        </>
      </div>
    );
  }
}

const mapDispatch = {
  updateGradingOrder,
};

const mapState = (state: RootState) => ({
  order: selectGradingOrder(state),
});

const connector = connect(mapState, mapDispatch);
type GradingProps = ConnectedProps<typeof connector>;

export default connector(Grading);
