import { gql } from 'apollo-boost';
 
export const GET_CATEGORIES = gql`
    query {
        categories {
            name
        }
    }
`

export const GET_PRODUCTS = (title) => gql`
    query {
        category(input: {title: "${title}"}) {
            products {
                id,
                name,
                brand,
                inStock,
                gallery,
                attributes {
                    id,
                    name,
                    type,
                    items {
                    value
                    }
                },
                prices {
                currency {
                    label
                }
                amount
                }
            }
        }
    }
`

export const GET_CURRENCIES = gql`
    query {
        currencies {
        label,
        symbol
        }
    }
`;

export const GET_PRODUCT = (id) => gql`
    query {
        product(id: "${id}") {
        name,
        brand,
        gallery,
        inStock
        prices {
            amount
            currency {
            symbol
            }
        }
        description,
        attributes {
            id,
            name,
            type,
            items {
            value
            }
        }
        }
    }
`

export const GET_ALL_PRODUCTS = gql`
query {
    category {
        products {
            id,
            name,
            brand,
            inStock,
            gallery,
            attributes {
                id,
                name,
                type,
                items {
                value
                }
            },
            prices {
            currency {
                label
            }
            amount
            }
        }
    }
  }
`