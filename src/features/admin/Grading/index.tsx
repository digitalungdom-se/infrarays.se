import { ConnectedProps, connect } from "react-redux";
import {
  OrderItem,
  selectApplicationsByGradingOrder,
  setApplications,
  updateGradingOrder,
} from "../adminSlice";

import BootstrapTable from "react-bootstrap-table-next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Grade from "./Grade";
import OpenPDF from "components/portal/OpenPDF";
import RandomiseOrder from "./RandomiseOrder";
import React from "react";
import { RootState } from "store";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

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
    if (Boolean(this.props.applications.length) === false) {
      axios.get<ApplicationInfo[]>("/application").then((res) => {
        // const applications: Record<string, ApplicationInfo> = {};
        this.props.setApplications(res.data);
        // res.data.forEach(
        //   (applicant) => (applications[applicant.id] = applicant)
        // );
        // this.setState({
        //   applications,
        //   loading: [false, this.state.loading[1]],
        // });
      });
      axios.get<OrderItem[]>("/admin/grading").then((res) => {
        this.props.updateGradingOrder(res.data);
        this.setState({ loading: [this.state.loading[0], false] });
      });
    }
  }

  render() {
    const loading = this.state.loading[0] || this.state.loading[1];
    const dataWithIndex = this.props.applications.map((application, index) => ({
      ...application,
      index,
    }));
    console.log(this.props.applications);

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
      // {
      //   dataField: "id",
      //   text: "Bedöm",
      //   formatter: (id: string) => <Grade id={id} />,
      // },
    ];

    return (
      <div>
        <p>För att börja bedöma behöver du slumpa ordningen.</p>
        <RandomiseOrder />
        <BootstrapTable
          striped
          bordered
          keyField="id"
          data={dataWithIndex}
          columns={columns}
          noDataIndication={() =>
            loading ? (
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
            ) : (
              "No data"
            )
          }
          rowClasses={(row) => (row.done ? "done" : "")}
        />
      </div>
    );
  }
}

const mapDispatch = {
  updateGradingOrder,
  setApplications,
};

const mapState = (state: RootState) => ({
  applications: selectApplicationsByGradingOrder(state),
});

const connector = connect(mapState, mapDispatch);
type GradingProps = ConnectedProps<typeof connector>;

export default connector(Grading);
