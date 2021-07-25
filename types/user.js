import faker from 'faker'

/**
 * APUI documentation
 * @docs https://rawgit.com/Marak/faker.js/master/examples/browser/index.html#lorem
 */


export const user = () => {
    const {name, username, email, phone, website, address} = faker.helpers.createCard()
    return {name, username, email, phone, website, address}
}
