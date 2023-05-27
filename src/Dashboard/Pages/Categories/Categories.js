import Tables from '../../SharedUI/Table/Tables';

const Categories = () => {
    return (
        <>
            <Tables title="Categories Table" 
            trContent='
                <th scope="col">Project</th>
                <th scope="col">Budget</th>
                <th scope="col">Status</th>
                <th scope="col">Users</th>
                <th scope="col">Completion</th>
                <th scope="col" />'

            tableContent='
            <tr>
            <th scope="row">
              first
            </th>
            <td>$2,500 USD</td>
            <td>
              <Badge color="" className="badge-dot mr-4">
                <i className="bg-warning" />
                pending
              </Badge>
            </td>
            <td>
                userOne
            </td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">60%</span>
                <div>
                  <Progress
                    max="100"
                    value="60"
                    barClassName="bg-danger"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              first
            </th>
            <td>$2,500 USD</td>
            <td>
              <Badge color="" className="badge-dot mr-4">
                <i className="bg-warning" />
                pending
              </Badge>
            </td>
            <td>
                userOne
            </td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">60%</span>
                <div>
                  <Progress
                    max="100"
                    value="60"
                    barClassName="bg-danger"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              first
            </th>
            <td>$2,500 USD</td>
            <td>
              <Badge color="" className="badge-dot mr-4">
                <i className="bg-warning" />
                pending
              </Badge>
            </td>
            <td>
                userOne
            </td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">60%</span>
                <div>
                  <Progress
                    max="100"
                    value="60"
                    barClassName="bg-danger"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              first
            </th>
            <td>$2,500 USD</td>
            <td>
              <Badge color="" className="badge-dot mr-4">
                <i className="bg-warning" />
                pending
              </Badge>
            </td>
            <td>
                userOne
            </td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">60%</span>
                <div>
                  <Progress
                    max="100"
                    value="60"
                    barClassName="bg-danger"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              first
            </th>
            <td>$2,500 USD</td>
            <td>
              <Badge color="" className="badge-dot mr-4">
                <i className="bg-warning" />
                pending
              </Badge>
            </td>
            <td>
                userOne
            </td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">60%</span>
                <div>
                  <Progress
                    max="100"
                    value="60"
                    barClassName="bg-danger"
                  />
                </div>
              </div>
            </td>
          </tr>'    
            />
        </>
    )
}

export default Categories;