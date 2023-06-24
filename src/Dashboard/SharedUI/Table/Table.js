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
  import { Link } from "react-router-dom";
  import Btn from "../Btn/Btn";
  // core components
  
  const Tablee = ({ title, tableRows, route, content, totalPages, currentPage, onPageChange }) => {
    return (
      <>
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row>
                    <Col>
                      <h3 className="mb-0">{title}</h3>
                    </Col>
                    <Col>
                      <Link to="/dashboard/roles/create">
                        <Btn
                          className="btn btn-primary"
                          style={{ marginLeft: "70%", minWidth: "50px", fontSize: "20px" }}
                          title="+"
                          name="add-new"
                        />
                      </Link>
                    </Col>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>{content}</tr>
                  </thead>
                  <tbody>{tableRows}</tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className={currentPage === 1 ? "disabled" : ""}>
                        <PaginationLink
                          previous
                          onClick={() => onPageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, index) => (
                        <PaginationItem key={index + 1} active={currentPage === index + 1}>
                          <PaginationLink onClick={() => onPageChange(index + 1)}>
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem className={currentPage === totalPages ? "disabled" : ""}>
                        <PaginationLink
                          next
                          onClick={() => onPageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        />
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
  
  export default Tablee;