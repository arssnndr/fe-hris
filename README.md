# HRSystem

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.8.

## Run with Docker Compose

- Run `docker compose up`
- Navigate to `http://localhost:4200/` for access the web, and navigate to `http://localhost:4100/` for access the api.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Json-server

Run `npm run server` for run fake API. Navigate to `http://localhost:4100/`

## API Routes

- ### Plural routes

  - GET http://localhost:4100/ms_bagiankerja
  - GET http://localhost:4100/ms_bagiankerja/1
  - POST http://localhost:4100/ms_bagiankerja
  - PUT http://localhost:4100/ms_bagiankerja/1
  - PATCH http://localhost:4100/ms_bagiankerja/1
  - DELETE http://localhost:4100/ms_bagiankerja/1

- ### Singular routes

  - GET http://localhost:4100/ms_bagiankerja
  - POST http://localhost:4100/ms_bagiankerja
  - PUT http://localhost:4100/ms_bagiankerja
  - PATCH http://localhost:4100/ms_bagiankerja

- ### Paginate

  - GET http://localhost:4100/ms_bagiankerja?_page=7
  - GET http://localhost:4100/ms_bagiankerja?_page=7&_limit=20

- ### Filter

  - GET http://localhost:4100/ms_bagiankerja?keterangan_like=server
