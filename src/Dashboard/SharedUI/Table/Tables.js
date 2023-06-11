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

const Tables = ({ title, tableRows, route, content }) => {
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
                  <CardHeader className="border-0">
                    <Row>
                      <Col>
                        <h3 className="mb-0">{title}</h3>
                      </Col>
                      {route !== "/dashboard/customers" ? (
                        <Col className="text-right">
                          <Link to={route}>
                            <Btn className="btn-primary btn fa fa-plus" />
                          </Link>
                        </Col>
                      ) : null}
                      
                    </Row>
                  </CardHeader>
                </Col>
              </Row>
              <Table 
                className="align-items-center table-flush"
                responsive
              >
                <thead className="thead-light">
                  <tr>
                    {content}
                  </tr>
                </thead>
                <tbody>
                  {tableRows}
                </tbody>
              </Table>

              
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
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
