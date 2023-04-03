// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: 'http://localhost:4100/',
  tabelKaryawan: 'ms_karyawan/',
  tabelStatusKehadiran: 'ms_statuskehadiran/',
  tabelListKehadiran: 'trx_listkehadiran/',
  tabelLokasi: 'ms_lokasi/',
  tabelPerusahaan: 'ms_perusahaan/',
  tabelBagianKerja: 'ms_bagiankerja/',
  tabelLembur: 'ms_lembur/',
  tabelJadwalKerjaIndividu: 'trx_jadwalkerjaindividu/',
  tabelJadwalKerja: 'trx_jadwalkerja/',
  tabelLogHistory: 'log_history/',
  tabelUser: 'ms_userid/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
