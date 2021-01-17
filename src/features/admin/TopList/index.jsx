import React from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import OpenPDF from "components/portal/OpenPDF";

class Applications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [],
    };
  }

  componentDidMount() {
    fetch("/api/admin/get/applications")
      .then((res) => res.json())
      .then((res) => {
        if (res.type === "fail") {
          res.json = true;
          throw res;
        } else {
          this.setState({ applications: res.applications });
        }
      });
  }

  render() {
    const { applications } = this.state;

    const Rows = () =>
      applications.map((person, index) => (
        <tr key={`tr-${person.email}`}>
          <td>{index + 1}</td>
          <td>
            {person.name
              .split(" ")
              .map((n) => n[0].toUpperCase() + n.substring(1, n.length))
              .join(" ")}
          </td>
          <td>
            <a href={`mailto:${person.email}`} target="_blank" rel="noreferrer">
              {person.email}
            </a>
          </td>
          <td>
            <OpenPDF url={`/api/admin/get/application?userID=${person.id}`}>
              <FontAwesomeIcon icon={faFileDownload} />
            </OpenPDF>
          </td>
        </tr>
      ));

    return (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Namn</th>
            <th>Email</th>
            <th>Visa</th>
          </tr>
        </thead>
        <tbody>
          <Rows />
        </tbody>
      </Table>
    );
  }
}

export default Applications;
