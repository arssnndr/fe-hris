export interface User {
  nip: string;
  username: string;
  email: string;
  lokasi: string;
  perusahaan: string;
  akses: string;
  password: string;
  role_bagian_kerja: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  role_perusahaan: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  role_lokasi: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  role_user: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  role_karyawan: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  role_jadwal_kerja: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  role_setup_jadwal_kerja: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  role_kalender_kerja: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  role_status_kehadiran: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  role_list_kehadiran: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  role_lembur: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  role_download: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  role_mesin_finger: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  role_setup_mesin_finger: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  role_ganti_nip: {
    view: boolean;
    edit: boolean;
    download: boolean;
  };
  status: true;
}
