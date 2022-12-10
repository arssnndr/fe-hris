export interface JadwalKerja {
  id: string;
  id_lokasi: string;
  id_shift: string;
  jam_kerja: string;
  in: string;
  out: string;
  mulai_istirahat: string;
  selesai_istirahat: string;
  total_jam_kerja: number;
}
