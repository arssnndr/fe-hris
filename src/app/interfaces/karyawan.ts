export interface Karyawan {
  id: number;
  kewarganegaraan: string;
  nik: number;
  nama_lengkap: string;
  tempat_lahir: string;
  tgl_lahir: string;
  jenis_kelamin: string;
  alamat_domisili: string;
  rt_rw: string;
  kel_desa: string;
  agama: string;
  status_perkawinan: string;
  nomor_npwp: number;
  nomor_telepon: string;
  email: string;
  pendidikan_terakhir: string;
  nomor_bpjs_tk: number;
  nomor_bpjs_kesehatan: number;
  nama_faskes: string;
  alamat_faskes: string;
  nomor_kk: number;
  nama_kepala_keluarga: string;
  nama_ibu_kandung: string;
  status_pajak: string;
  nama_pasangan: string;
  nama_anak_ke1: string;
  nama_anak_ke2: string;
  nama_anak_ke3: string;
  nama_kontak_darurat: string;
  nomor_telepon_darurat: string;
  hubungan_dengan_karyawan: string;

  nomor_passport: number;
  tgl_pembuatan_passport: string;
  tgl_berakhir_passport: string;
  kebangsaan: string;
  nomor_kitas: number;
  tgl_berakhir_kitas: string;
  nomor_rptka: number;
  tgl_berakhir_rptka: string;

  id_perusahaan: string;
  id_lokasi: string;
  id_divisi: string;
  id_departemen: string;
  id_subdepartemen: string;
  jabatan: string;
  status_karyawan: string;
  nama_pemberi_referensi: string;
  nama_atasan_langsung: string;

  tgl_join: string;
  nomor_pkwtt: number;

  gaji_pokok: number;
  tgl_perubahan: string;
  uang_makan: number;
  uang_transport: number;
  note: string;
}
