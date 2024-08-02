/**
 * @typedef {Object} BusinessLine
 * @property {number} id - id de la base de datos
 * @property {string} name - nombre del giro comercial
 * @property {boolean} status - estatus que indica si un giro comercial está activo o no
 * @property {string} createdAt - fecha en la que se creó
 * @property {string} updatedAt - fecha en la que se editó
 */

/**
 * @typedef {Object} Category
 * @property {number} id - id de la base de datos
 * @property {string} name - nombre de la categoría
 * @property {boolean} status - estatus que indica si una categoría está activa o no
 * @property {string} createdAt - fecha en la que se creó
 * @property {string} updatedAt - fecha en la que se editó
 */

/**
 * @typedef {Object} ContactPagination
 * @property {string} subject - asunto de la peticion de contacto
 * @property {string} fromDate - fecha de inicio en la que se hará la búsqueda
 * @property {string} toDate - fecha límite en la que se hará la búsqueda
 * @property {boolean} orderedByName - indicador de si se ordenará por nombre 
 * @property {number} page - página que se desea mostrar 
 * @property {number} registers - número de registros a mostrar 
 */

/**
 * @typedef {Object} Contact
 * @property {number} id - id de la base de datos
 * @property {string} name - nombre del contacto
 * @property {string} email - email del contacto
 * @property {string} phone - teléfono del contacto
 * @property {string} subject - asunto del contacto
 * @property {string} message - mensaje del contacto
 * @property {string} createdAt - fecha en la que se creó
 * @property {string} updatedAt - fecha en la que se actualizó
 */

/**
 * @typedef {Object} Pagination
 * @property {number} totalPages - número total de páginas
 * @property {boolean} hasNextPage - flag que indica si existe una siguiente página
 * @property {boolean} hasPreviousPage - flag que indica si existe una página anterior
 * @property {number} currentPage - página actual que se mostrará
 * @property {[any]} rows - datos obtenidos
 * @property {number} totalRegisters - número total de registros
 */

/**
 * @typedef {Object} Galery
 * @property {number} id - id de la base de datos
 * @property {string} name - nombre de la galería
 * @property {boolean} status - estatus que indica si una galería está activo o no
 * @property {string} createdAt - fecha en la que se creó
 * @property {string} updatedAt - fecha en la que se actualizó
 */

/**
 * @typedef {Object} GaleryPhotos
 * @property {number} id - id de la base de datos
 * @property {string} name - nombre de la foto
 * @property {string} image - ruta de la imagen
 * @property {boolean} principal - estatus que indica si una foto es la principal
 * @property {number} galeryId - id de la galería a la que pertenece la foto
 * @property {string} createdAt - fecha en la que se creó
 * @property {string} updatedAt - fecha en la que se actualizó
 */

/**
 * @typedef {Object} ShowGalery
 * @property {number} id - id de la base de datos
 * @property {string} name - nombre de la galería
 * @property {boolean} status - estatus que indica si una galería está activo o no
 * @property {string} photoName - nombre de la imagen
 * @property {string} photo - ruta de la imagen en la que se encuentra almacenada en el backend
 */

/**
 * @typedef {Object} Routes
 * @property {string} name - nombre de la foto
 * @property {boolean} route - ruta en la que se encuentra almacenada la imagen
 */


/**
 * @typedef {Object} PostList
 * @property {number} idPost - id de la base de datos
 * @property {string} title - título del post del blog
 * @property {string} URL - URL con keywords para mostrar en la URL
 * @property {boolean} featured - estatus que indica si el post está destacado
 * @property {string} status - estatus que indica si un post está publicado
 */

/**
 * @typedef {Object} PostShow
 * @property {number} idPost - id de la base de datos
 * @property {string} title - título del post del blog
 * @property {string} abstract - resumen del post
 * @property {string} body - cuerpo del post, que contiene imágenes y contenido
 * @property {string} createdAt - fecha en la que se creó
 * @property {string} category - categoría a la que pertenece el post
 * @property {string} image - ruta de la imagen 
 * @property {string} imageName - nombre de la imagen 
 */

/**
 * @typedef {Object} PostPagination
 * @property {string} search - búsqueda de palabras coincidentes en la base de datos
 * @property {number} page - página que se desea mostrar 
 * @property {number} registers - número de registros a mostrar 
 */

/**
 * @typedef {Object} Post
 * @property {number} id - id de la base de datos
 * @property {string} title - título del post
 * @property {string} image - resumen del post
 * @property {string} image - cuerpo del post, que contiene imágenes y contenido
 * @property {string} URL - URL que aparecerá  en el título de la ventana
 * @property {number} statusId - estatus que indica si el post está publicado
 * @property {boolean} featured - estatus que indica si el post está destacado  
 * @property {number} categoryId - id de la categoría a la que pertenece el post
 * @property {number} userId - id del usuarió que creó el post
 * @property {number} imageId - id de la imagen principal del post
 * @property {string} createdAt - fecha en la que se creó
 * @property {string} updatedAt - fecha en la que se actualizó
 */

/**
 * @typedef {Object} PostImage
 * @property {number} id - id de la base de datos
 * @property {string} name - nombre de la foto
 * @property {string} image - ruta de la imagen
 * @property {string} createdAt - fecha en la que se creó
 * @property {string} updatedAt - fecha en la que se actualizó
 */

/**
 * @typedef {Object} FeaturedPost
 * @property {number} id - id de la base de datos
 * @property {string} URL - URL que aparecerá  en el título de la ventana
 * @property {string} title - título del post
 * @property {string} abstract - resumen del post
 * @property {string} categoryName - nombre de la categoría
 * @property {string} image - ruta de la imagen
 * @property {string} imageName - nombre de la imagen
 */

/**
 * @typedef {Object} PromoList
 * @property {number} id - id de la base de datos
 * @property {string} name - nombre de la imagen
 * @property {string} begining - fecha de inicio de la promoción
 * @property {string} end - fecha de fin de la promoción
 * @property {boolean} valid - estatus que indica si una promoción sigue válida 
 * @property {string} shopName - nombre de la tienda a la que pertenece la promo
 */

/**
 * @typedef {Object} ActivePromos
 * @property {string} name - nombre de la imagen
 * @property {string} image - ruta de la imagen
 * @property {number} shopId - id de la tienda a la que pertenece la promo
 * @property {string} shopName - nombre de la tienda a la que pertence la promo
 */

/**
 * @typedef {Object} Promos
 * @property {number} id - id de la base de datos
 * @property {string} name - nombre de la imagen
 * @property {string} image - ruta de la imagen
 * @property {string} begining - fecha de inicio de la promoción
 * @property {string} end - fecha de fin de la promoción
 * @property {boolean} valid - estatus que indica si una promoción sigue válida 
 * @property {number} shopId - id de la tienda a la que pertenece la promo
 * @property {string} createdAt - fecha en la que se creó
 * @property {string} updatedAt - fecha en la que se actualizó
 */

/**
 * @typedef {Object} Shop
 * @property {number} id - id de la base de datos
 * @property {string} name - nombre de la tienda
 * @property {string} status - estatus que indica si la tienda está activa
 * @property {string} description - descripción de la tienda
 * @property {string} phone - teléfono de la tienda
 * @property {string} email - email de la tienda
 * @property {string} webPage - página web de la tienda
 * @property {string} workingDays - días laborales y horarios de la tienda
 * @property {string} logo - ruta de la imagen del logo de la tienda
 * @property {string} address - local en el que se encuentra ubicada la tienda
 * @property {string} businessLineId - id del giro comercial de la tienda
 * @property {string} createdAt - fecha en la que se creó
 * @property {string} updatedAt - fecha en la que se actualizó
 */

/**
 * @typedef {Object} ShopPhotos
 * @property {number} id - id de la base de datos
 * @property {string} name - nombre de la foto
 * @property {string} image - ruta de la imagen
 * @property {number} shopId - id de la tienda 
 * @property {string} createdAt - fecha en la que se creó
 * @property {string} updatedAt - fecha en la que se actualizó
 */