
import React, { useState, useEffect } from "react";
import { AxiosDashboard } from "../../../Axios";
import { Card, CardTitle, CardBody, Container, Row, Col } from "reactstrap";
import { Doughnut } from "react-chartjs-2";

const Header = () => {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosDashboard.get("/statistic");
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  };

  const chartColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#FFD700",
    "#7CFC00",
    "#DC143C",
    "#00BFFF",
    "#00CED1",
    "#8A2BE2",
  ];

  const chartData = {
    datasets: [
      {
        data: statistics.map((statistic) => statistic.count),
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors,
      },
    ],
  };

  return (
    <>
      <div className="header bg-gradient-info pb-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              {statistics.map((statistic, index) => (
                <Col key={index} lg="6" xl="3" className="pb-3">
                  <Card className="card-stats mb-4 mb-xl-0 ">
                    <CardBody>
                      <div >
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0 pb-3"
                        >
                          {statistic.name}
                        </CardTitle>
                        <div className="d-flex justify-content-center">
                          <Doughnut
                            data={{
                              datasets: [
                                {
                                  data: [statistic.count, 100 - statistic.count],
                                  backgroundColor: [
                                    chartColors[index],
                                    "#e2e8f0",
                                  ],
                                  hoverBackgroundColor: [
                                    chartColors[index],
                                    "#e2e8f0",
                                  ],
                                  borderWidth: 0,
                                },
                              ],
                            }}
                            options={{
                              ...chartOptions,
                              cutoutPercentage: 80,
                            }}
                            height={150}
                            width={150}
                          />
                        </div>
                        <span className="h4 font-weight-bold mb-1 mt-2">
                         Count : {statistic.count}
                        </span><br />
                        <span className="h2 font-weight-bold mb-0">
                          {((statistic.count / 100) * 100).toFixed(2)}%
                        </span> 
                       
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;




// import React, { useState, useEffect } from "react";
// import { AxiosDashboard } from '../../../Axios';

// import {
//   Button,
//   Card,
//   CardTitle,
//   CardHeader,
//   CardBody,
//   FormGroup,
//   Form,
//   Input,
//   Container,
//   Row,
//   Col,
// } from "reactstrap";
// const Header = () => {
//   const [statistics, setStatistics] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await AxiosDashboard.get("/statistic");
//         setStatistics(response.data);
//       } catch (error) {
//         console.error("Error fetching statistics:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       <div className="header bg-gradient-info pb-8">
//         <Container fluid>
//           <div className="header-body">
//             {/* Card stats */}
//             <Row>
//               {statistics.map((statistic, index) => (
//                 <Col key={index} lg="6" xl="3">
//                   <Card className="card-stats mb-4 mb-xl-0">
//                     <CardBody>
//                       <Row>
//                         <div className="col">
                        
//                           <CardTitle
//                             tag="h5"
//                             className="text-uppercase text-muted mb-0 p-2"
//                           >
//                             {statistic.name}
//                           </CardTitle>
//                           <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
//                             <i className="fas fa-chart-bar" />
//                           </div>
//                           <span className="h2 font-weight-bold mb-0">
//                             {statistic.count}
//                           </span>
                         
//                         </div>
//                         {/* <Col className="col-auto">
//                           <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
//                             <i className="fas fa-chart-bar" />
//                           </div>
//                         </Col> */}
//                       </Row>
//                     </CardBody>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           </div>
//         </Container>
//       </div>
//     </>
//   );
// };

// export default Header;




















// import React, { useState, useEffect } from "react";
// import { AxiosDashboard } from '../../../Axios';

// import {
//   Button,
//   Card,
//   CardTitle,
//   CardHeader,
//   CardBody,
//   FormGroup,
//   Form,
//   Input,
//   Container,
//   Row,
//   Col,
// } from "reactstrap";
// const Header = () => {
//   const [statistics, setStatistics] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await AxiosDashboard.get("/statistic");
//         setStatistics(response.data);
//       } catch (error) {
//         console.error("Error fetching statistics:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       <div className="header bg-gradient-info pb-8">
//         <Container fluid>
//           <div className="header-body">
//             {/* Card stats */}
//             <Row>
//               {statistics.map((statistic, index) => (
//                 <Col key={index} lg="6" xl="3">
//                   <Card className="card-stats mb-4 mb-xl-0">
//                     <CardBody>
//                       <Row>
//                         <div className="col">
                        
//                           <CardTitle
//                             tag="h5"
//                             className="text-uppercase text-muted mb-0 p-2"
//                           >
//                             {statistic.name}
//                           </CardTitle>
//                           <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
//                             <i className="fas fa-chart-bar" />
//                           </div>
//                           <span className="h2 font-weight-bold mb-0">
//                             {statistic.count}
//                           </span>
                         
//                         </div>
//                         {/* <Col className="col-auto">
//                           <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
//                             <i className="fas fa-chart-bar" />
//                           </div>
//                         </Col> */}
//                       </Row>
//                     </CardBody>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           </div>
//         </Container>
//       </div>
//     </>
//   );
// };

// export default Header;