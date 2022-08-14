# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index  route: 'products/' [GET]
- Show   route: 'products/:id' [GET]
- Create [token required]   route: 'products/' [POST]
- [OPTIONAL] Top 5 most popular products  route: '/products/popular' [GET] 
- [OPTIONAL] Products by category (args: product category)  route: 'products/?category=' [GET]

#### Users
- Index [token required]    route: 'users/' [GET]
- Show [token required]     route: 'users/:id' [GET]
- Create N[token required]  route: 'users/' [POST]

#### Orders
- Current Order by user (args: user id)[token required] route: 'users/:id/orders?status=active' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] route: 'users/:id/orders?status=completed' [GET]

- Create order route: 'orders/' [POST]
- Add product  router: 'orders/products' [POST]

Products(id integer, name varchar, price integer, category varchar)
users(id integer, first_name varchar, last_name varchar)
orders(id integer, user_id integer [foreign key], status varchar)
orders_products(product_id integer [foreign key], order_id integer [foreign key], quantity integer)

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

