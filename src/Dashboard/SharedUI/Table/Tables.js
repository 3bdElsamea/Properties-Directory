import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
  Navbar,
} from "reactstrap";
import Btn from "../Btn/Btn";
import { Link } from "react-router-dom";
import { AxiosDashboard } from "../../../Axios";

const Tables = ({
  title,
  route,
  currentPage,
  totalPages,
  onPageChange,
  endpoint,
  query,
  content,
  tableData,
}) => {
  const [tableRows, setTableRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [queryValue, setQueryValue] = useState("");

  const fetchData = async () => {
    try {
      // Make an API request to fetch data from the backend endpoint
      const response = await AxiosDashboard.get(`/${endpoint}`, {
        params: { [query]: queryValue }, // Pass the query parameter
        params: { page: currentPage }, // Move the page parameter inside the params object
      });
      const { data } = response.data;
      setTableRows(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setQueryValue(query); // Set the query value for API request
  };

  const filterRows = (rows, query) => {
    if (!query || query.trim() === "") {
      return rows; // Return all rows when there is no query or it's empty after trimming
    }

    console.log(rows);
    return rows.filter(
      (row) =>
        //make it for name or title
        row.name.toLowerCase().includes(query.toLowerCase()) ||
        (row.title && row.title.toLowerCase().includes(query.toLowerCase()))
    );
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, queryValue, searchQuery, currentPage]);

  const filteredTableRows = searchQuery
    ? filterRows(tableRows, searchQuery)
    : tableRows;

  return (
    <>
      <Navbar />
 <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <Row className="justify-content-between">
                <Col>
                  <CardHeader className="border-0 d-flex justify-content-between">
                    <h3 className="mb-0 text-primary">{title}</h3>
                    <div className="d-flex align-items-center">
                      <div className="mr-2">
                        <input
                          type="text"
                          placeholder="Search by name"
                          value={searchQuery}
                          onChange={handleSearch}
                          className="form-control"
                          style={{ maxWidth: "200px" }}
                        />
                      </div>
                      <div>
                        <Link to={route}>
                          <Btn className="btn-primary btn fa fa-plus" />
                        </Link>
                      </div>
                    </div>
                  </CardHeader>
                </Col>
              </Row>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    {content}

                </tr>
                </thead>
                <tbody>
                  {filteredTableRows.map((item, index) => (
                    <tr key={item.id}>{tableData(item, index)}</tr>
                  ))}
                </tbody>
              </Table>

              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination className="pagination justify-content-end mb-0">
                    <PaginationItem
                      className={currentPage === 1 ? "disabled" : ""}
                    >
                      <PaginationLink
                        href="#"
                        onClick={() => onPageChange(currentPage - 1)}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem
                      className={currentPage === totalPages ? "disabled" : ""}
                    >
                      <PaginationLink
                        href="#"
                        onClick={() => onPageChange(currentPage + 1)}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
