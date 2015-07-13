import policy from '../api/policies/SqlCriteriaPolicy'

describe('SqlCriteriaPolicy', () => {

  it('should run', done => {
    let req = {
      query: {
        sql: 'where a = 1 and b = 2 and c = "hello"'
      }
    }
    let res = { }
    let next = done

    policy(req, res, done)

  })

})
