import "./grading.css";

import { ConnectedProps, connect } from "react-redux";
import {
  OrderItem,
  selectApplicationsByGradingOrder,
  setApplications,
  updateGradingOrder,
} from "../adminSlice";

import ApplicantInformation from "./ApplicantInformation";
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
        this.props.setApplications(res.data);
      });
      axios.get<OrderItem[]>("/admin/grading").then((res) => {
        this.props.updateGradingOrder(res.data);
        this.setState({ loading: [this.state.loading[0], false] });
      });
    }
  }

  render() {
    const dataWithIndex = this.props.applications.map((application, index) => ({
      ...application,
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
        text: "PDF",
        formatter: (id: string, row: any) => (
          <OpenPDF
            variant={row.done ? "success" : undefined}
            url={`/application/${id}/pdf`}
          >
            <FontAwesomeIcon icon={faFileDownload} />
          </OpenPDF>
        ),
      },
      {
        dataField: "dummy_field",
        text: "Bedöm",
        isDummyField: true,
        formatter: (id: string, row: any) => (
          <Grade
            key={id + "grade"}
            id={row.id}
            variant={row.done ? "success" : undefined}
          />
        ),
      },
    ];

    const expandRow = {
      renderer: (row: any) => <ApplicantInformation email={row.email} />,
      showExpandColumn: true,
      expandByColumnOnly: true,
      className: "white",
    };

    return (
      <div>
        <div style={{ marginBottom: "2rem" }}>
          <p>
            För att börja bedöma eller se nya ansökningar behöver du slumpa
            ordningen.
          </p>
          <RandomiseOrder />
        </div>
        <BootstrapTable
          expandRow={expandRow}
          striped
          wrapperClasses="table-responsive"
          bordered
          keyField="id"
          data={dataWithIndex}
          columns={columns}
          noDataIndication={() =>
            this.state.loading[1] ? (
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
