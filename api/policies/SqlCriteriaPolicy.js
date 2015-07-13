import _ from 'lodash'
import { lexer, parser } from 'sql-parser'

export default function SqlCriteriaPolicy (req, res, next) {
  if (req.query && _.isString(req.query.sql)) {
    req.query = buildWaterlineCriteria(req.query.sql)
    console.log(req.query)
  }

  next()
}

function buildWaterlineCriteria (sql) {
  console.log(sql);
  let tokens = lexer.tokenize(sql)

  console.log(tokens);

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
