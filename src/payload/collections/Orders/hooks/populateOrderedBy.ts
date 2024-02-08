import type { FieldHook } from 'payload/types'

import type { Order } from '../../../payload-types'

export const populateOrderedBy: FieldHook<Order> = async ({ req, operation, value }) => {
  if ((operation === 'create' || operation === 'update') && !value && req.user) {
    return req.user.id
  } else {
    return '65c4e5ec0eac254cef4a865a'
  }

  return value
}
