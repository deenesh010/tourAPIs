class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    //2.1) MONGODB METHOD FILTERING
    const queryObj = { ...this.queryStr };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // 2.2) ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    console.log(queryObj);
    console.log(queryStr);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    console.log(queryStr);

    // console.log(JSON.parse(queryStr));

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    //3) sort
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
      // console.log(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    //4) fields
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); //-__v will exclude __v
    }

    return this;
  }

  paginate() {
    // pagination (page and limit)
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 100;
    const skip = (page - 1) * limit;
    
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;
