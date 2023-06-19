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
// core components

import Btn from "../Btn/Btn";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { AxiosDashboard } from "../../../Axios";
const Tables = ({
  title,
  route,
  content,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [filteredTableRows, setFilteredTableRows] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [query, setQuery] = useState("");
  const [queryValue, setQueryValue] = useState("");

  const fetchData = async () => {
    try {
      // Make an API request to fetch data from the backend endpoint
      const response = await AxiosDashboard.get(
        `/${endpoint}?${query}=${queryValue}`
      );
      const { tableRows: data } = response.data;

      setTableRows(data);
      setFilteredTableRows(filterRows(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setQueryValue(query);
    fetchData();
  };
  
  
  const filterRows = (rows, query) => {
    return rows.filter((row) =>
      row.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, queryValue]);
  
  




    
  

  return (
    <>
      <Navbar />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <Row className="justify-content-between">
                <Col>
                  <CardHeader className="border-0 d-flex justify-content-between">
                    <h3 className="mb-0">{title}</h3>
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
                  <tr>{content}</tr>
                </thead>
                <tbody>{filteredTableRows}</tbody>
              </Table>

              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
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
                    {Array.from({ length: totalPages }, (_, index) => (
                      <PaginationItem
                        key={index}
                        className={currentPage === index + 1 ? "active" : ""}
                      >
                        <PaginationLink
                          href="#"
                          onClick={() => onPageChange(index + 1)}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
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
