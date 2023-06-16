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

    this.option['where'] = Object.entries(queryObj).map(([key, val]) => {
      const integerValue = [
        'bedrooms',
        'area',
        'price',
        'bathrooms',
        'garage',
        'floors',
        'year_built',
        'category_id',
        'city_id',
        'created_at',
      ];

      if (integerValue.includes(key)) {
        const [operator1, value1, operator2, value2] = val.split('_');
        const condition = {};
        if (operator1 === 'gte') {
          condition[Op.gte] = value1;
        } else if (operator1 === 'lte') {
          condition[Op.lte] = value1;
        } else {
          condition[Op.eq] = operator1;
        }

        if (operator2 === 'gte') {
          condition[Op.gte] = value2;
        } else if (operator2 === 'lte') {
          condition[Op.lte] = value2;
        }
        return {
          [key]: { ...condition },
        };
      } else if (key === 'status') {
        return {
          [key]: {
            [Op.eq]: val,
          },
        };
      } else {
        return {
          [key]: {
            [Op.like]: `%${val}%`,
          },
        };
      }
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
    delete this.option['include'];
    delete this.option['attributes'];
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
