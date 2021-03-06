import config from 'config'

export default {
  /**
   * Reset current configuration and selected variatnts
   */
  check (context, { product, qty = 1 }) {
    return new Promise((resolve, reject) => {
      context.dispatch('sync/queue', { url: config.stock.endpoint + '/check/' + product.sku,
        payload: {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors'
        },
        product_sku: product.sku,
        callback_event: 'stock-after-check'
      }, { root: true }).then(task => {
        resolve({ qty: product.stock.qty, status: product.stock.is_in_stock ? 'ok' : 'out_of_stock', onlineCheckTaskId: task.task_id }) // if not online, cannot check the source of true here
      })
    })
  }
}
