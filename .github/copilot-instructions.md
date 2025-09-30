# Copilot Instructions for HR-System

## Architecture snapshot
- Angular 14 SPA with Angular Material; `AppModule` bootstraps layout, while the HR master area is lazy-loaded from `components/master/master.module`.
- `AppComponent` owns the sidenav/toolbar and drives top-level navigation and modals; it toggles feature visibility based on the logged-in user stored in `localStorage`.
- Feature areas live inside `src/app/components/**`; list/detail pages sit alongside related `modal-*` folders for dialogs opened via `MatDialog`.
- Shared utilities live under `src/app/shared` (notably `ApiService`), and reusable typings under `src/app/interfaces`.

## Data & API workflow
- The app talks to a JSON Server backend (`http://localhost:4100/`); endpoint fragments are centralised in `src/environments/environment*.ts` (e.g. `tabelListKehadiran`, `tabelLembur`).
- `ApiService` adds the base URL, exposes `getData`, `postData`, `updateData`, `deleteData`, and logs HTTP errors before rethrowing—prefer reusing it rather than calling `HttpClient` directly.
- Role and user metadata are cached on the service at construction from `localStorage['user']`; re-read it if you mutate auth state.
- If you add tables/endpoints, extend the environment constants and wire matching helpers in `ApiService` or the relevant component.

## Auth & access control
- `LoginComponent` hits `ms_userid` directly with `HttpClient` to verify credentials, then persists the user object in `localStorage` and posts an audit entry to `/login/`.
- `AppComponent.ngOnInit` revalidates the cached user against `ms_userid`; it clears storage and forces `/login` when the record disappears.
- Role flags (`role_*` objects on the user) drive menu visibility and route access; update `interfaces/user.ts` when introducing new role scopes.
- `ApiService` only reads `localStorage` once in its constructor—after mutating auth data, refresh the page or reinject the service so `akses` stays in sync.

## UI conventions
- Navigation and access toggles mirror role flags in `AppComponent.setActive`; when adding menu items ensure the matching `akses.role_*` flag exists.
- Pages commonly guard access in constructors (`if (!this.akses.view) router.navigate(...)`); follow this before doing API work.
- Components filter and paginate by hitting JSON Server query params (`?_page`, `&_limit`, `field_like=...`), as seen in `ListKehadiranComponent` and `LemburComponent`.
- Excel exports use `xlsx` and `moment` (see `download-data-payroll` or `list-kehadiran`); copy those helpers to keep headers, gaps, and localisation consistent.
- Charts are rendered with `chart.js/auto` inside `DashboardComponent.ngAfterViewInit`; always update `dataCharts` arrays before instantiating `Chart`.

## Dialogs & modals
- Each feature keeps modal components under `modal-*` folders and opens them through `MatDialog` (e.g. `ModalListKehadiranComponent`, `ModalLemburComponent`).
- Dialogs pass context via `MAT_DIALOG_DATA` and emit results through `.afterClosed()`; callers refresh lists (`getData...`) after a truthy result.
- Confirmation flows reuse shared dialogs such as `VoidComponent` and `LogoutConfirmComponent`; prefer these before adding new confirmation UIs.

## Data seeding & fixtures
- `API/generatedb.js` fabricates realistic HR data with Faker + Moment; run `npm run generatedb` to regenerate `API/db.json` before serving.
- Launch the mock API with `npm run json` (binds to `0.0.0.0:4100`) and the Angular app with `npm start` (`ng serve --host 0.0.0.0`).
- For a static deployment preview, build with `npm run build` and serve via `docker compose up`, which mounts `dist/hr-system` into Nginx.

## Testing & quality gates
- Unit tests use Karma/Jasmine (`npm test`); current coverage is minimal (see `api.service.spec.ts`), so author targeted tests when changing shared services.
- TypeScript config targets `~4.7`; stay compatible with Angular 14 syntax and Material APIs already in use.

## Feature implementation tips
- Prefer storing per-feature forms with `FormBuilder` (see `LoginComponent`); modals pass data via `MAT_DIALOG_DATA` and emit updates through `.afterClosed()` callbacks.
- When editing list records, ensure in-memory state mirrors JSON Server updates (e.g. `ListKehadiranComponent` re-fetches data after `updateData`).
- Any new download/report dialog should follow the pattern in `DownloadDataPayrollComponent`: fetch lists, filter by date/lokasi/perusahaan, and centralise formatting via `moment`.
- Remember to keep localisation (Indonesian labels, date formats) consistent with existing components and seeded data.
