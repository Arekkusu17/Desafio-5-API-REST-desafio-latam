# Desafio 5 Jewels Store Backend 

Develop an API REST for a client he needs the following:
  - Limit Resources
  - Filter resources by given field
  - Pagination
  - Order
  - HATEOAS data structure


## Deployment

To use the project, first run:

```bash
  npm install
```
To install the dependencies of the package-lock.

**Don't forget to configure your own .env file following the example.**

Then run the server.

You also need to run the querys in [query.sql](./database/query.sql)

## Methods

You can request to the next resources:
-  GET REQUEST => localhost:<PORT>/joyas?limits=<value>&page=<value>&order_by=<field_direction>
-  GET REQUEST =>localhost:<PORT>/joyas/filtros?precio_min=<value>&precio_max=<value>&categoria
=<value>&metal=<value>

To have in mind, page starts in 1 . Ex: Page 1 => Page 2 => ...
Not in Page 0


