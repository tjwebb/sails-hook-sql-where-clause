import _ from 'lodash'
import { lexer, parser } from 'sql-parser'

const SqlCriteriaPolicy = {

  main (req, res, next) {
    if (_.isString(req.query.sql)) {
      req.query.sql = this.buildWaterlineCriteria(req.query.sql)
    }

    next()
  },

  buildWaterlineCriteria (sql) {
    let tokens = lexer.tokenize(sql)

    let criteria = _.reduce(tokens, (result, token, i) => {
      let type = token[0]
      let value = token[1]
      let nextToken = tokens[i + 1]


      if (!_.contains([ 'LITERAL' ], type)) return result

      if (type == 'LITERAL' && nextToken[0] == 'OPERATOR') {
        result[value] = tokens[i + 2][1]
      }

      return result
    }, { })

    console.log(criteria)

    return criteria
  }

}

_.bindAll(SqlCriteriaPolicy)

export default SqlCriteriaPolicy.main
