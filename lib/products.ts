export const LOGO_URL =
  'https://cdn.shopify.com/s/files/1/0750/6355/8188/files/brr-logo.png?v=1793800641';

export type Product = {
  handle: string;
  title: string;
  descriptionHtml: string;
  price: number;
  image: string;
  variantId: string;
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
  caption: string;
  products: Product[];
};

export const collections: Collection[] = [
  {
    handle: 'escenciales-para-tu-gato',
    title: 'Escenciales para tu gato',
    caption: '6 kg',
    description: '',
    products: [
      {
        handle: 'arena-sanitaria-natural-brr-de-bentonita-6-kg-ligera-aglomerante-y-sin-fragancia',
        title: '6kg Arena Bentonita BRR',
        descriptionHtml:
          '<p dir="ltr"><strong>Ligera, natural y fácil de limpiar. Cuida a tu gato y al planeta.</strong></p>\n<p dir="ltr">La arena sanitaria Brr está hecha con bentonita natural, un mineral muy valorado por su capacidad de absorber y aglomerar. Su fórmula natural, con ingredientes seleccionados, es una opción práctica y sencilla para el día a día con tu gato.</p>\n<p dir="ltr"><strong>Por qué elegir Brr</strong></p>\n<ul dir="ltr">\n<li>🌿 <strong>Bentonita natural:</strong> fórmula natural, sin complicaciones.</li>\n<li>💧 <strong>Buena absorción:</strong> retiene la humedad de forma eficaz.</li>\n<li>🧺 <strong>Buena aglomeración:</strong> forma grumos que se retiran fácilmente.</li>\n<li>🔹 <strong>Gránulos de forma única:</strong> diseñados para un buen desempeño en la bandeja.</li>\n<li>🧹 <strong>Fácil de limpiar:</strong> mantiene la bandeja ordenada con menos esfuerzo.</li>\n<li>🌸 <strong>Sin fragancia:</strong> sin aromas artificiales, ideal para gatos sensibles a los olores fuertes.</li>\n<li>🪶 <strong>Ligera:</strong> más cómoda de transportar y de manejar.</li>\n</ul>\n<p dir="ltr"><strong>Natural, práctica y pensada para el cuidado de tu gato.</strong> Detalles que lo hacen ronronear.</p>\n<p dir="ltr"><strong>Detalles del producto</strong></p>\n<ul dir="ltr">\n<li>Formato: bolsa de 6 kg con asa</li>\n<li>Tipo: arena sanitaria natural aglomerante</li>\n<li>Base: bentonita</li>\n</ul>',
        price: 8290,
        image:
          'https://cdn.shopify.com/s/files/1/0750/6355/8188/files/brr-bent-6kg_5d774f0b-0422-4858-9297-3ea1f68cbc53.png?v=1793833573&width=1200',
        variantId: 'gid://shopify/ProductVariant/46577331109932',
      },
      {
        handle: 'arena-sanitaria-premium-brr-con-carbon-activado-6-kg-bentonita-control-de-olores-y-ultra-bajo-polvo',
        title: '6kg Arena Premium Carbon Activado BRR',
        descriptionHtml:
          '<p dir="ltr"><strong>Alta absorción, máximo rendimiento. Mantiene el arenero limpio por más tiempo.</strong></p>\n<p dir="ltr">La arena premium Brr combina bentonita con carbón activado para ofrecer un control de olores efectivo y una aglomeración resistente. Su fórmula natural, con ingredientes seleccionados, está pensada para quienes quieren una arena de alto desempeño, cómoda para el gato y práctica para el día a día.</p>\n<p dir="ltr"><strong>Por qué elegir Brr Premium</strong></p>\n<ul dir="ltr">\n<li>🖤 <strong>Con carbón activado:</strong> ayuda a neutralizar los olores en la bandeja.</li>\n<li>🧺 <strong>Aglomeración resistente:</strong> forma grumos firmes y fáciles de retirar.</li>\n<li>☁️ <strong>Ultra bajo polvo:</strong> más limpieza en el ambiente y más comodidad al usarla.</li>\n<li>🌬️ <strong>Control de olores efectivo:</strong> mantiene el espacio fresco por más tiempo.</li>\n<li>⚖️ <strong>Rendimiento equilibrado:</strong> buen desempeño en el uso diario.</li>\n<li>🌿 <strong>Sin perfume:</strong> sin aromas artificiales, ideal para gatos sensibles a los olores fuertes.</li>\n<li>⭐ <strong>Calidad premium:</strong> detalles que hacen ronronear.</li>\n</ul>\n<p dir="ltr"><strong>Natural y de alto rendimiento.</strong> Una arena pensada para cuidar a tu gato y mantener tu hogar más limpio.</p>\n<p dir="ltr"><strong>Detalles del producto</strong></p>\n<ul dir="ltr">\n<li>Formato: bolsa de 6 kg con asa</li>\n<li>Tipo: arena sanitaria premium aglomerante</li>\n<li>Base: bentonita con carbón activado</li>\n</ul>',
        price: 10490,
        image:
          'https://cdn.shopify.com/s/files/1/0750/6355/8188/files/brr-bent-premium-6kg_d5d64107-8983-4878-9b04-6d9d59377df6.png?v=1793833574&width=1200',
        variantId: 'gid://shopify/ProductVariant/46577337106476',
      },
      {
        handle: 'arena-sanitaria-natural-brr-de-tofu-y-cassava-6-kg-premium-sostenible-y-premezclada',
        title: '6kg Arena de Tofu y Cassava Premium BRR',
        descriptionHtml:
          '<p dir="ltr"><strong>Cuida a tu gato y al planeta con la misma arena.</strong></p>\n<p dir="ltr">La arena sanitaria Brr combina tofu y cassava (yuca) en una mezcla vegetal premezclada, pensada para quienes buscan un producto natural, eficiente y sostenible. Su fórmula natural, con ingredientes seleccionados, ofrece un hogar más limpio y un planeta más verde.</p>\n<p dir="ltr"><strong>Por qué elegir Brr</strong></p>\n<ul dir="ltr">\n<li>🌿 <strong>Mezcla vegetal de tofu + cassava:</strong> fórmula natural, sin complicaciones.</li>\n<li>🧺 <strong>Aglomeración superior:</strong> forma grumos firmes que facilitan la limpieza de la bandeja.</li>\n<li>🌬️ <strong>Control de olores:</strong> mantiene el ambiente más fresco.</li>\n<li>☁️ <strong>Bajo polvo:</strong> más cómoda para tu gato y para ti.</li>\n<li>🐾 <strong>Bajo arrastre:</strong> menos granos fuera de la bandeja.</li>\n<li>✨ <strong>No se adhiere a la bandeja:</strong> se limpia más fácil.</li>\n<li>⭐ <strong>Calidad premium:</strong> detalles que hacen ronronear.</li>\n</ul>\n<p dir="ltr"><strong>Natural, eficiente y sostenible.</strong> Una alternativa vegetal a las arenas tradicionales, para un hogar más limpio y un planeta más verde.</p>\n<p dir="ltr"><strong>Detalles del producto</strong></p>\n<ul dir="ltr">\n<li>Formato: bolsa de 6 kg con asa</li>\n<li>Tipo: arena sanitaria premium para gatos</li>\n<li>Presentación: premezclada</li>\n</ul>',
        price: 17990,
        image:
          'https://cdn.shopify.com/s/files/1/0750/6355/8188/files/brr-tofu-6kg_3dc837e1-55e8-47fa-941e-58acc9e1aeed.png?v=1793833572&width=1200',
        variantId: 'gid://shopify/ProductVariant/46577318002732',
      },
    ],
  },
  {
    handle: 'pack-2',
    title: 'Pack 2',
    caption: '12 kg',
    description: 'Ahorra con descuentos por pack',
    products: [
      {
        handle: 'arena-sanitaria-natural-brr-de-bentonita-12-kg-ligera-aglomerante-y-sin-fragancia',
        title: '12kg Arena Bentonita BRR',
        descriptionHtml:
          '<p dir="ltr"><strong>Ligera, natural y fácil de limpiar. Cuida a tu gato y al planeta.</strong></p>\n<p dir="ltr">La arena sanitaria Brr está hecha con bentonita natural, un mineral muy valorado por su capacidad de absorber y aglomerar. Su fórmula natural, con ingredientes seleccionados, es una opción práctica y sencilla para el día a día con tu gato.</p>\n<p dir="ltr"><strong>Por qué elegir Brr</strong></p>\n<ul dir="ltr">\n<li>🌿 <strong>Bentonita natural:</strong> fórmula natural, sin complicaciones.</li>\n<li>💧 <strong>Buena absorción:</strong> retiene la humedad de forma eficaz.</li>\n<li>🧺 <strong>Buena aglomeración:</strong> forma grumos que se retiran fácilmente.</li>\n<li>🔹 <strong>Gránulos de forma única:</strong> diseñados para un buen desempeño en la bandeja.</li>\n<li>🧹 <strong>Fácil de limpiar:</strong> mantiene la bandeja ordenada con menos esfuerzo.</li>\n<li>🌸 <strong>Sin fragancia:</strong> sin aromas artificiales, ideal para gatos sensibles a los olores fuertes.</li>\n<li>🪶 <strong>Ligera:</strong> más cómoda de transportar y de manejar.</li>\n</ul>\n<p dir="ltr"><strong>Natural, práctica y pensada para el cuidado de tu gato.</strong> Detalles que lo hacen ronronear.</p>\n<p dir="ltr"><strong>Detalles del producto</strong></p>\n<ul dir="ltr">\n<li>Formato: 2 x bolsa de 6 kg con asa</li>\n<li>Tipo: arena sanitaria natural aglomerante</li>\n<li>Base: bentonita</li>\n</ul>',
        price: 13980,
        image: 'https://cdn.shopify.com/s/files/1/0750/6355/8188/files/BENT2.png?v=1793784988&width=1200',
        variantId: 'gid://shopify/ProductVariant/46577600692268',
      },
      {
        handle: 'arena-sanitaria-premium-brr-con-carbon-activado-12-kg-bentonita-control-de-olores-y-ultra-bajo-polvo',
        title: '12kg Arena Premium Carbon Activado BRR',
        descriptionHtml:
          '<p dir="ltr"><strong>Alta absorción, máximo rendimiento. Mantiene el arenero limpio por más tiempo.</strong></p>\n<p dir="ltr">La arena premium Brr combina bentonita con carbón activado para ofrecer un control de olores efectivo y una aglomeración resistente. Su fórmula natural, con ingredientes seleccionados, está pensada para quienes quieren una arena de alto desempeño, cómoda para el gato y práctica para el día a día.</p>\n<p dir="ltr"><strong>Por qué elegir Brr Premium</strong></p>\n<ul dir="ltr">\n<li>🖤 <strong>Con carbón activado:</strong> ayuda a neutralizar los olores en la bandeja.</li>\n<li>🧺 <strong>Aglomeración resistente:</strong> forma grumos firmes y fáciles de retirar.</li>\n<li>☁️ <strong>Ultra bajo polvo:</strong> más limpieza en el ambiente y más comodidad al usarla.</li>\n<li>🌬️ <strong>Control de olores efectivo:</strong> mantiene el espacio fresco por más tiempo.</li>\n<li>⚖️ <strong>Rendimiento equilibrado:</strong> buen desempeño en el uso diario.</li>\n<li>🌿 <strong>Sin perfume:</strong> sin aromas artificiales, ideal para gatos sensibles a los olores fuertes.</li>\n<li>⭐ <strong>Calidad premium:</strong> detalles que hacen ronronear.</li>\n</ul>\n<p dir="ltr"><strong>Natural y de alto rendimiento.</strong> Una arena pensada para cuidar a tu gato y mantener tu hogar más limpio.</p>\n<p dir="ltr"><strong>Detalles del producto</strong></p>\n<ul dir="ltr">\n<li>Formato: 2 x bolsa de 6 kg con asa</li>\n<li>Tipo: arena sanitaria premium aglomerante</li>\n<li>Base: bentonita con carbón activado</li>\n</ul>',
        price: 17580,
        image: 'https://cdn.shopify.com/s/files/1/0750/6355/8188/files/BENTPREMIUM2.png?v=1793785200&width=1200',
        variantId: 'gid://shopify/ProductVariant/46577605705772',
      },
      {
        handle: 'arena-sanitaria-natural-brr-de-tofu-y-cassava-12-kg-premium-sostenible-y-premezclada',
        title: '12kg Arena de Tofu y Cassava Premium BRR',
        descriptionHtml:
          '<p dir="ltr"><strong>Cuida a tu gato y al planeta con la misma arena.</strong></p>\n<p dir="ltr">La arena sanitaria Brr combina tofu y cassava (yuca) en una mezcla vegetal premezclada, pensada para quienes buscan un producto natural, eficiente y sostenible. Su fórmula natural, con ingredientes seleccionados, ofrece un hogar más limpio y un planeta más verde.</p>\n<p dir="ltr"><strong>Por qué elegir Brr</strong></p>\n<ul dir="ltr">\n<li>🌿 <strong>Mezcla vegetal de tofu + cassava:</strong> fórmula natural, sin complicaciones.</li>\n<li>🧺 <strong>Aglomeración superior:</strong> forma grumos firmes que facilitan la limpieza de la bandeja.</li>\n<li>🌬️ <strong>Control de olores:</strong> mantiene el ambiente más fresco.</li>\n<li>☁️ <strong>Bajo polvo:</strong> más cómoda para tu gato y para ti.</li>\n<li>🐾 <strong>Bajo arrastre:</strong> menos granos fuera de la bandeja.</li>\n<li>✨ <strong>No se adhiere a la bandeja:</strong> se limpia más fácil.</li>\n<li>⭐ <strong>Calidad premium:</strong> detalles que hacen ronronear.</li>\n</ul>\n<p dir="ltr"><strong>Natural, eficiente y sostenible.</strong> Una alternativa vegetal a las arenas tradicionales, para un hogar más limpio y un planeta más verde.</p>\n<p dir="ltr"><strong>Detalles del producto</strong></p>\n<ul dir="ltr">\n<li>Formato: 2x bolsa de 6 kg con asa</li>\n<li>Tipo: arena sanitaria premium para gatos</li>\n<li>Presentación: premezclada</li>\n</ul>',
        price: 32980,
        image: 'https://cdn.shopify.com/s/files/1/0750/6355/8188/files/Disenosintitulo_8.png?v=1793783770&width=1200',
        variantId: 'gid://shopify/ProductVariant/46577511858220',
      },
    ],
  },
  {
    handle: 'despreocupate-3pack',
    title: 'Despreocupate 3pack',
    caption: '18 kg',
    description: 'Deja de pensar en comprar arena todos los meses, y ahorra con el tri pack BRR',
    products: [
      {
        handle: 'arena-sanitaria-natural-brr-de-bentonita-18-kg-ligera-aglomerante-y-sin-fragancia',
        title: '18kg Arena Bentonita BRR',
        descriptionHtml:
          '<p dir="ltr"><strong>Ligera, natural y fácil de limpiar. Cuida a tu gato y al planeta.</strong></p>\n<p dir="ltr">La arena sanitaria Brr está hecha con bentonita natural, un mineral muy valorado por su capacidad de absorber y aglomerar. Su fórmula natural, con ingredientes seleccionados, es una opción práctica y sencilla para el día a día con tu gato.</p>\n<p dir="ltr"><strong>Por qué elegir Brr</strong></p>\n<ul dir="ltr">\n<li>🌿 <strong>Bentonita natural:</strong> fórmula natural, sin complicaciones.</li>\n<li>💧 <strong>Buena absorción:</strong> retiene la humedad de forma eficaz.</li>\n<li>🧺 <strong>Buena aglomeración:</strong> forma grumos que se retiran fácilmente.</li>\n<li>🔹 <strong>Gránulos de forma única:</strong> diseñados para un buen desempeño en la bandeja.</li>\n<li>🧹 <strong>Fácil de limpiar:</strong> mantiene la bandeja ordenada con menos esfuerzo.</li>\n<li>🌸 <strong>Sin fragancia:</strong> sin aromas artificiales, ideal para gatos sensibles a los olores fuertes.</li>\n<li>🪶 <strong>Ligera:</strong> más cómoda de transportar y de manejar.</li>\n</ul>\n<p dir="ltr"><strong>Natural, práctica y pensada para el cuidado de tu gato.</strong> Detalles que lo hacen ronronear.</p>\n<p dir="ltr"><strong>Detalles del producto</strong></p>\n<ul dir="ltr">\n<li>Formato: 3 x bolsa de 6 kg con asa</li>\n<li>Tipo: arena sanitaria natural aglomerante</li>\n<li>Base: bentonita</li>\n</ul>',
        price: 16470,
        image: 'https://cdn.shopify.com/s/files/1/0750/6355/8188/files/BENT3.png?v=1793785456&width=1200',
        variantId: 'gid://shopify/ProductVariant/46577606754348',
      },
      {
        handle: 'arena-sanitaria-premium-brr-con-carbon-activado-18kg-bentonita-control-de-olores-y-ultra-bajo-polvo',
        title: '18kg Arena Premium Carbon Activado BRR',
        descriptionHtml:
          '<p dir="ltr"><strong>Alta absorción, máximo rendimiento. Mantiene el arenero limpio por más tiempo.</strong></p>\n<p dir="ltr">La arena premium Brr combina bentonita con carbón activado para ofrecer un control de olores efectivo y una aglomeración resistente. Su fórmula natural, con ingredientes seleccionados, está pensada para quienes quieren una arena de alto desempeño, cómoda para el gato y práctica para el día a día.</p>\n<p dir="ltr"><strong>Por qué elegir Brr Premium</strong></p>\n<ul dir="ltr">\n<li>🖤 <strong>Con carbón activado:</strong> ayuda a neutralizar los olores en la bandeja.</li>\n<li>🧺 <strong>Aglomeración resistente:</strong> forma grumos firmes y fáciles de retirar.</li>\n<li>☁️ <strong>Ultra bajo polvo:</strong> más limpieza en el ambiente y más comodidad al usarla.</li>\n<li>🌬️ <strong>Control de olores efectivo:</strong> mantiene el espacio fresco por más tiempo.</li>\n<li>⚖️ <strong>Rendimiento equilibrado:</strong> buen desempeño en el uso diario.</li>\n<li>🌿 <strong>Sin perfume:</strong> sin aromas artificiales, ideal para gatos sensibles a los olores fuertes.</li>\n<li>⭐ <strong>Calidad premium:</strong> detalles que hacen ronronear.</li>\n</ul>\n<p dir="ltr"><strong>Natural y de alto rendimiento.</strong> Una arena pensada para cuidar a tu gato y mantener tu hogar más limpio.</p>\n<p dir="ltr"><strong>Detalles del producto</strong></p>\n<ul dir="ltr">\n<li>Formato: 3 x bolsa de 6 kg con asa</li>\n<li>Tipo: arena sanitaria premium aglomerante</li>\n<li>Base: bentonita con carbón activado</li>\n</ul>',
        price: 20970,
        image: 'https://cdn.shopify.com/s/files/1/0750/6355/8188/files/BENTPREMIUM3.png?v=1793785561&width=1200',
        variantId: 'gid://shopify/ProductVariant/46577612554284',
      },
      {
        handle: 'arena-sanitaria-natural-brr-de-tofu-y-cassava-18-kg-premium-sostenible-y-premezclada',
        title: '18kg Arena de Tofu y Cassava Premium BRR',
        descriptionHtml:
          '<p dir="ltr"><strong>Cuida a tu gato y al planeta con la misma arena.</strong></p>\n<p dir="ltr">La arena sanitaria Brr combina tofu y cassava (yuca) en una mezcla vegetal premezclada, pensada para quienes buscan un producto natural, eficiente y sostenible. Su fórmula natural, con ingredientes seleccionados, ofrece un hogar más limpio y un planeta más verde.</p>\n<p dir="ltr"><strong>Por qué elegir Brr</strong></p>\n<ul dir="ltr">\n<li>🌿 <strong>Mezcla vegetal de tofu + cassava:</strong> fórmula natural, sin complicaciones.</li>\n<li>🧺 <strong>Aglomeración superior:</strong> forma grumos firmes que facilitan la limpieza de la bandeja.</li>\n<li>🌬️ <strong>Control de olores:</strong> mantiene el ambiente más fresco.</li>\n<li>☁️ <strong>Sin polvo:</strong> más cómoda para tu gato y para ti. Respira sin químicos.</li>\n<li>🐾 <strong>Bajo arrastre:</strong> menos granos fuera de la bandeja.</li>\n<li>✨ <strong>No se adhiere a la bandeja:</strong> se limpia más fácil.</li>\n<li>⭐ <strong>Calidad premium:</strong> detalles que hacen ronronear.</li>\n</ul>\n<p dir="ltr"><strong>Natural, eficiente y sostenible.</strong> Una alternativa vegetal a las arenas tradicionales, para un hogar más limpio y un planeta más verde.</p>\n<p dir="ltr"><strong>Detalles del producto</strong></p>\n<ul dir="ltr">\n<li>Formato: 3 x bolsa de 6 kg con asa</li>\n<li>Tipo: arena sanitaria premium para gatos</li>\n<li>Presentación: premezclada</li>\n</ul>',
        price: 44970,
        image: 'https://cdn.shopify.com/s/files/1/0750/6355/8188/files/TOFU3.png?v=1793785361&width=1200',
        variantId: 'gid://shopify/ProductVariant/46577606590508',
      },
    ],
  },
];

export const allProducts: Product[] = collections.flatMap((c) => c.products);

export function getProductByHandle(handle: string): Product | undefined {
  return allProducts.find((p) => p.handle === handle);
}

export function getCollectionByHandle(handle: string): Collection | undefined {
  return collections.find((c) => c.handle === handle);
}

export function getRelatedProducts(handle: string): Product[] {
  const collection = collections.find((c) => c.products.some((p) => p.handle === handle));
  if (!collection) return [];
  return collection.products.filter((p) => p.handle !== handle);
}

export function getProductWeightKg(product: Product): number {
  const match = product.title.match(/^(\d+)\s*kg/i);
  return match ? Number(match[1]) : 6;
}

const PACK_SIZE_BY_COLLECTION: Record<string, number> = {
  'pack-2': 2,
  'despreocupate-3pack': 3,
};

export function getPackSize(product: Product): number {
  const collection = collections.find((c) => c.products.some((p) => p.handle === product.handle));
  if (!collection) return 1;
  return PACK_SIZE_BY_COLLECTION[collection.handle] ?? 1;
}

export function getUnitPrice(product: Product): number | null {
  const packSize = getPackSize(product);
  if (packSize <= 1) return null;
  return Math.round(product.price / packSize);
}
