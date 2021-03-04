import { Button, Table } from "react-bootstrap";
import { faEdit, faFileDownload } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OpenPDF from "components/portal/OpenPDF";
import RandomiseOrder from "./RandomiseOrder";
import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  gradingOrder: state.app.gradingOrder,
});

const mapDispatchToProps = (dispatch) => ({
  update: (order) => null,
});

class Applications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    const { update } = this.props;
    this.setState({ loading: true });
    fetch("/api/admin/get/application_order")
      .then((res) => res.json())
      .then((res) => {
        this.setState({ loading: false });
        if (res.type === "fail") {
          res.json = true;
          throw res;
        } else {
          update(res.applicationOrder);
        }
      });
  }

  render() {
    const { loading } = this.state;
    const { gradingOrder } = this.props;

    const Rows = () =>
      gradingOrder.map((person, index) => (
        <tr key={`tr-${person.email}`}>
          <td>{index + 1}</td>
          <td>
            {person.name
              .split(" ")
              .map((n) => n[0].toUpperCase() + n.substring(1, n.length))
              .join(" ")}
          </td>
          <td>
            <a
              href={`mailto:${person.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {person.email}
            </a>
          </td>
          <td>
            <OpenPDF url={`/api/admin/get/application?userID=${person.id}`}>
              <FontAwesomeIcon icon={faFileDownload} />
            </OpenPDF>
          </td>
          <td>
            <Button>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </td>
        </tr>
      ));

    return (
      <>
        <p>För att börja bedöma behöver du slumpa ordningen.</p>
        <RandomiseOrder />
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Namn</th>
              <th>Email</th>
              <th>Visa</th>
              <th>Bedöm</th>
            </tr>
          </thead>
          <tbody>
            {loading && "Laddar..."}
            <Rows />
          </tbody>
        </Table>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Applications);
