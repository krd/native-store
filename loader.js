import * as loadedProducts from './products.json'

const FB_URL = 'https://rn-store-472f6-default-rtdb.firebaseio.com/productz.json'

products.map(async (prod) => {
  response = await fetch(FB_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(prod)
  })
})

// useEffect(() => {
  //   seedProducts.products.map(async (prod) => {
  //     response = await fetch(FB_URL, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(prod)
  //     })
  //   })
  // }, [])