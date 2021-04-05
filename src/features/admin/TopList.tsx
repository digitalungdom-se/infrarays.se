import { ConnectedProps, connect } from "react-redux";
import { selectApplicationsByTop, setApplications } from "./adminSlice";

import BootstrapTable from "react-bootstrap-table-next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GradedApplication } from "types/grade";
import GradingData from "components/GradingData";
import OpenPDF from "components/portal/OpenPDF";
import React from "react";
import { RootState } from "store";
import Spinner from "react-bootstrap/Spinner";
import { downloadAndOpen } from "api/downloadPDF";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { getApplications } from "api/admin";
import { useGrades } from "./adminHooks";

const GradingDataRow = ({ id }: Pick<GradedApplication, "id">) => {
  const { data, loading } = useGrades(id);
  if (loading) return <div>Loading</div>;
  return <GradingData applicationGrades={data} />;
};

interface TopListState {
  loading: boolean;
}

class TopList extends React.Component<TopListProps, TopListState> {
  state = {
    loading: true,
  };

  componentDidMount() {
    if (Boolean(this.props.applications.length) === false)
      getApplications().then((applications) => {
        this.props.setApplications(applications);
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
        dataField: "name",
        text: "Namn",
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
        dataField: "recommendations",
        text: "RB",
      },
      {
        dataField: "overall",
        text: "Ö",
      },
      {
        dataField: "id",
        text: "Visa",
        formatter: (id: string) => (
          <OpenPDF onDownload={() => downloadAndOpen(id)}>
            <FontAwesomeIcon icon={faFileDownload} />
          </OpenPDF>
        ),
      },
    ];

    const dataWithIndex = this.props.applications.map((application, index) => ({
      ...application,
      name: application.firstName + " " + application.lastName,
      index,
    }));

    const nonExpandable = this.props.applications
      .map(({ overall }, i) => ({ overall, i }))
      .filter((application) => !application.overall)
      .map(({ i }) => i);

    const expandRow = {
      renderer: (row: GradedApplication) => <GradingDataRow id={row.id} />,
      showExpandColumn: true,
      expandByColumnOnly: true,
      nonExpandable,
      className: "white",
    };

    return (
      <BootstrapTable
        striped
        wrapperClasses="table-responsive"
        bordered
        keyField="index"
        data={dataWithIndex}
        columns={columns}
        expandRow={expandRow}
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
