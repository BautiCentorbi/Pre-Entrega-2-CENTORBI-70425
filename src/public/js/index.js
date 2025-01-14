const socket = io()

socket.on('products', products => {
    console.log(products)
    const template = Handlebars.compile($('#realTimeProductsTemplate').html())
    const html = template({ products })
    $('#realTimeProductsContainer').html(html)
  })