# HRSystem

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Json-server

Run `npm run server` for run fake API.

- ## API Routes

<!-- Get data per table `http://localhost:3000/data_table` -->

- ### Plural routes

  - GET http://localhost:3000/ms_bagiankerja
  - GET http://localhost:3000/ms_bagiankerja/1
  - POST http://localhost:3000/ms_bagiankerja
  - PUT http://localhost:3000/ms_bagiankerja/1
  - PATCH http://localhost:3000/ms_bagiankerja/1
  - DELETE http://localhost:3000/ms_bagiankerja/1

- ### Singular routes

  - GET http://localhost:3000/ms_bagiankerja
  - POST http://localhost:3000/ms_bagiankerja
  - PUT http://localhost:3000/ms_bagiankerja
  - PATCH http://localhost:3000/ms_bagiankerja

- ### Paginate

  - GET http://localhost:3000/ms_bagiankerja?_page=7
  - GET http://localhost:3000/ms_bagiankerja?_page=7&_limit=20

- ### Filter

  - GET http://localhost:3000/ms_bagiankerja?keterangan_like=server
