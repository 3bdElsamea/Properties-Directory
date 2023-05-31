import { Op } from 'sequelize';

class ApiFeatures {
  constructor(query, queryString, option = {}) {
    this.query = query;
    this.queryString = queryString;
    this.option = option;
    this.filter().sort().limitFields().paginate();
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let entries = Object.entries(queryObj);
    this.option['where'] = entries.map(([key, val] = entry) => {
      if (key === 'created_at') {
        return {
          [key]: {
            [Op.gt]: val,
          },
        };
      }
      return {
        [key]: {
          [Op.like]: `%${val}%`,
        },
      };
    });

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',');
      if (sortBy[1] === 'asc') {
        this.option['order'] = [[sortBy[0], 'ASC']];
      } else {
        this.option['order'] = [[sortBy[0], 'DESC']];
      }
    } else {
      this.option['order'] = [['created_at', 'ASC']];
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      this.option['attributes'] = this.queryString.fields.split(',');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;

    this.option['offset'] = (page - 1) * limit;
    this.option['limit'] = limit;

    return this;
  }

  async get() {
    const { limit } = this.option;
    const result = await this.query.findAll(this.option);
    delete this.option['offset'];
    delete this.option['limit'];
    const resultCount = await this.query.count(this.option);
    const totalPage = Math.ceil(resultCount / limit);

    return {
      totalPage,
      currentPage: this.queryString.page * 1 || 1,
      data: result,
    };
  }
}

export default ApiFeatures;
