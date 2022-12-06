export interface User {
  id: number;
  username: string;
  email: string;
  id_lokasi: string;
  id_perusahaan: string;
  akses: string;
  password: string;
  bagian_kerja: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  perusahaan: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  lokasi: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  user: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  karyawan: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  jadwal_kerja: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  setup_jadwal_kerja: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  kalender_kerja: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  status_kehadiran: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  list_kehadiran: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  lembur: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  download: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  mesin_finger: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  setup_mesin_finger: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  ganti_nip: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  status: true;
}
