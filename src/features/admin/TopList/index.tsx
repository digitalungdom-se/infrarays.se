import {
  ApplicationInfo,
  selectApplicationsByTop,
  setApplications,
} from "../adminSlice";
import { ConnectedProps, connect } from "react-redux";

import BootstrapTable from "react-bootstrap-table-next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OpenPDF from "components/portal/OpenPDF";
import React from "react";
import { RootState } from "store";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

interface TopListState {
  loading: boolean;
}

class TopList extends React.Component<TopListProps, TopListState> {
  state = {
    loading: true,
  };

  componentDidMount() {
    if (Boolean(this.props.applications.length) === false)
      axios.get<ApplicationInfo[]>("/application").then((res) => {
        this.props.setApplications(res.data);
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading } = this.state;

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
        dataField: "cv",
        text: "CV",
      },
      {
        dataField: "coverLetter",
        text: "PB",
      },
      {
        dataField: "essays",
        text: "ES",
      },
      {
        dataField: "grades",
        text: "BT",
      },
      {
        dataField: "overall",
        text: "Ö",
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

    const dataWithIndex = this.props.applications.map((application, index) => ({
      ...application,
      index,
    }));

    console.log(dataWithIndex);

    return (
      <BootstrapTable
        striped
        bordered
        keyField="index"
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
    );
  }
}

const mapDispatch = {
  setApplications,
};

const mapState = (state: RootState) => ({
  applications: selectApplicationsByTop(state),
});

const connector = connect(mapState, mapDispatch);
type TopListProps = ConnectedProps<typeof connector>;

export default connector(TopList);
