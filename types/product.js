import faker from 'faker'

/**
 * API documentation
 * @docs https://rawgit.com/Marak/faker.js/master/examples/browser/index.html#lorem
 */

export const product = () => {
  return {
    product_id: faker.random.number(),
    name_DE: faker.commerce.productName(),
    opener_DE: faker.commerce.productDescription(),
    description_DE: faker.commerce.productDescription(),
    print_short_DE: faker.commerce.productDescription(144),
    print_long_DE: faker.commerce.productDescription(1024),
    subtitle: faker.random.words(4),
    teaser_DE: '',
    categories: faker.random.number(),
    enabled: faker.random.boolean(),
    family: faker.system.commonFileType(),
    groups: faker.random.number(),
    author: faker.name.findName(),
    distributor: faker.random.word(),
    editor: faker.name.findName(),
    illustrator: faker.name.findName(),
    photographer: faker.name.findName(),
    manufacturer: faker.company.companyName(),
    publisher: faker.random.number(12),
    argument: '',
    auditions: '',
    components_of_bundle: '',
    availability: faker.random.boolean(),
    basic_price_amount: faker.random.boolean(),
    basic_price_unit: faker.finance.currencyCode(),
    price_DE: faker.commerce.price(),
    special_price_DE: faker.commerce.price(),
    discount_price_DE: faker.commerce.price(),
    fixed_price_DE: faker.commerce.price(),
    data_sources: faker.random.word(),
    delivery_period: faker.random.number(12),
    discount_price_DE: faker.commerce.price(),
    fixed_price_DE: faker.commerce.price(),
    price_DE: faker.commerce.price(),
    discount_price_DE: faker.commerce.price(),
    fixed_price_DE: faker.commerce.price(),
    price_DE: faker.commerce.price(),
    discount_price_DE: faker.commerce.price(),
    fixed_price_DE: faker.commerce.price(),
    price_DE: faker.commerce.price(),
    discount_price_DE: faker.commerce.price(),
    fixed_price_DE: faker.commerce.price(),
    price_DE: faker.commerce.price(),
    discount_price_DE: faker.commerce.price(),
    fixed_price_DE: faker.commerce.price(),
    price_DE: faker.commerce.price(),
    discount_price_DE: faker.commerce.price(),
    fixed_price_DE: faker.commerce.price(),
    price_DE: faker.commerce.price(),
    tier_prices_DE: '{"1":24}',
    gtin: faker.random.number(12),
    height: faker.random.float(),
    height_unit: faker.lorem.word().toUpperCase(),
    id_vs4: faker.random.number(6),
    is_free_of_charge: faker.random.boolean(),
    is_set_product: faker.random.boolean(),
    keywords: faker.random.words(4),
    length: faker.random.number(144),
    length_unit: faker.lorem.word().toUpperCase(),
    mpn: faker.random.number(6),
    packing_amount: faker.random.number(12),
    procurement_type: faker.random.number(12),
    product_images: [{
      image: `${faker.system.directoryPath()}/${faker.system.commonFileName()}`,
      preview: `${faker.system.directoryPath()}/${faker.system.commonFileName()}`,
      gallery: `${faker.system.directoryPath()}/${faker.system.commonFileName()}`,
    }],
    product_information: faker.fake('{{commerce.color}}, {{commerce.department}}, {{commerce.productAdjective}}, {{commerce.productMaterial}}'),
    product_status_rule: 'published',
    relation_substitute_groups: '',
    relation_substitute_products: '',
    relation_substitute_product_models: '',
    size: '',
    sku: faker.finance.iban(),
    sku_model: '',
    stock: faker.random.number(144),
    tax_class_id_DE: faker.random.number(12),
    volume_DE: '',
    vs4_delivery_date: '',
    vs4_delivery_status: '',
    vs4_is_special_campaign: faker.random.number(12),
    weight: faker.random.number(1024),
    weight_unit: faker.lorem.word().toUpperCase(),
    width: faker.random.float(),
    width_unit: faker.lorem.word().toUpperCase(),
  }
}
