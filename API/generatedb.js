const { faker } = require("@faker-js/faker");
let moment = require("moment");
moment.locale("id");

const database = {
  login: [],
  ms_bagiankerja: [],
  ms_perusahaan: [],
  ms_lokasi: [],
  ms_userid: [],
  ms_karyawan: [],
  trx_jadwalkerja: [],
  trx_jadwalkerjadetail: [],
  trx_jadwalkerjacategory: [],
  trx_jadwalkerjaindividu: [],
  ms_kalenderkerja: [],
  ms_mesinfinger: [],
  ms_setupmesinfinger: [],
  ms_statuskehadiran: [],
  trx_listkehadiran: [],
  ms_lembur: [],
  log_history: [],
};

const perusahaan = [
  {
    inisial: "IJP",
    nama: "Indika Jasa Pahrama",
    alamat: "Jl. Raya Bekasi KM.21, Ruko PTC Block B8",
  },
  {
    inisial: "TMS",
    nama: "The Master Steel",
    alamat: "Jl. HOS Cokroaminoto No.49",
  },
  {
    inisial: "RIW",
    nama: "Royalindo Investa Wijaya",
    alamat: "Jl. HOS Cokroaminoto No.49",
  },
  {
    inisial: "DAP",
    nama: "Donata Agung Perkasa",
    alamat: "Jl. KK Mas Mansyur No.121",
  },
];
const lokasi = [
  {
    id: "TMS0",
    inisial: "TMS HO",
    nama: "The Master Steel HO",
    alamat: "Jl. HOS Cokroaminoto No.49",
  },
  {
    id: "TMS1",
    inisial: "TMS 1",
    nama: "The Master Steel 1",
    alamat: "Jl. Pegangsaan 2 No.1",
  },
  {
    id: "TMS2",
    inisial: "TMS 2",
    nama: "The Master Steel 2",
    alamat: "Jl. Alpha Maspion - KIM V, Manyar",
  },
  {
    id: "TMS3",
    inisial: "TMS 3",
    nama: "The Master Steel 3",
    alamat: "Jl. Raya Bekasi km.21 Pulogadung",
  },
  {
    id: "TMS4",
    inisial: "TMS 4",
    nama: "The Master Steel 4",
    alamat: "Jl. Pulo Lentut No.3 Pulogadung",
  },
];
const divisi = [
  "IT",
  "IT Support",
  "IT Support Plant",
  "Finance",
  "AR",
  "Faktur",
  "AP",
  "ACC",
  "Mechanic",
  "Electrik",
  "Produksi",
  "QC",
  "SAT Developer",
  "Support",
  "Project",
  "Marketing",
  "Sales",
  "Purchase",
  "HRD",
  "Implementasi",
];
const departemen = [
  "IT",
  "IT Support",
  "IT Support Plant",
  "Finance",
  "AR",
  "Faktur",
  "AP",
  "ACC",
  "Mechanic",
  "Electrik",
  "Produksi",
  "QC",
  "SAT Developer",
  "Support",
  "Project",
  "Marketing",
  "Sales",
  "Purchase",
  "HRD",
  "Implementasi",
];
const subDepartemen = [
  "IT",
  "IT Support",
  "IT Support Plant",
  "Finance",
  "AR",
  "Faktur",
  "AP",
  "ACC",
  "Mechanic",
  "Electrik",
  "Produksi",
  "QC",
  "SAT Developer",
  "Support",
  "Project",
  "Marketing",
  "Sales",
  "Purchase",
  "HRD",
  "Implementasi",
];
const jamKerja = [
  {
    id: "0917",
    masuk: "09:00",
    keluar: "17:00",
    start_break: "12:00",
    end_break: "13:00",
    total: 17 - 9 - (13 - 12),
    shift: "Non Shift",
    shiftId: "S0",
    type: "Normal",
    typeId: "N",
  },
  {
    id: "0912",
    masuk: "09:00",
    keluar: "12:00",
    start_break: "",
    end_break: "",
    total: 12 - 9,
    shift: "Non Shift",
    shiftId: "S0",
    type: "Pendek",
    typeId: "P",
  },
  {
    id: "0716",
    masuk: "07:00",
    keluar: "16:00",
    start_break: "10:00",
    end_break: "11:00",
    total: 16 - 7 - (11 - 10),
    shift: "Shift 1",
    shiftId: "S1",
    type: "Normal",
    typeId: "N",
  },
  {
    id: "1422",
    masuk: "14:00",
    keluar: "22:00",
    start_break: "17:00",
    end_break: "18:00",
    total: 22 - 14 - (18 - 17),
    shift: "Shift 2",
    shiftId: "S2",
    type: "Normal",
    typeId: "N",
  },
];
const agama = [
  "Islam",
  "Protestan",
  "Katolik",
  "Hindu",
  "Buddha",
  "Khonghucu",
  "Lain-lain",
];
const pendidikan = [
  "TK",
  "SD",
  "SMP",
  "SMA",
  "SMK",
  "Diploma 1",
  "Diploma 2",
  "Diploma 3",
  "S1",
  "S2",
  "S3",
];
const statusPajak = [
  "TK/0",
  "TK/1",
  "TK/2",
  "TK/3",
  "K/0",
  "K/1",
  "K/2",
  "K/3",
  "K/I/0",
  "K/I/1",
  "K/I/2",
  "K/I/3",
];
const jabatan = [
  "Foreman",
  "Supervisor",
  "Specialis",
  "Manager",
  "Senior Manager",
  "General Manager",
  "Director",
  "Staff",
];
const mesinFinger = [
  "Solution X100c",
  "Interactive X2000",
  "Solution X900",
  "Solution X609",
];
const keteranganCuti = [
  "Menikah",
  "Anak Menikah",
  "Anak Khitanan",
  "Baptis Anak",
  "Istri Melahirkan",
  "Keluarga Meninggal",
  "Keluarga Sakit",
  "Haji/Umroh",
  "Haid",
  "Melahirkan",
  "Sakit",
];
const cuti = [
  {
    status: "Cuti Tahunan",
    no_form: faker.phone.number("CT########"),
    hakcuti_tersedia: 12,
  },
  {
    status: "Cuti Khusus",
    no_form: faker.phone.number("CK########"),
    hakcuti_tersedia: 90,
  },
  {
    status: "Izin",
    no_form: faker.phone.number("IZ########"),
    hakcuti_tersedia: 31,
  },
  {
    status: "Perjalanan Dinas",
    no_form: faker.phone.number("PD########"),
    hakcuti_tersedia: 31,
  },
];
const statusKehadiran = [
  "HT",
  "PA",
  "DDK",
  "DLK",
  "Cuti",
  "CK",
  "CB",
  "Mangkir",
  "ISP",
  "ISH",
  "Hadir",
  "Off",
];
const menu = [
  "Dashboard",
  "Bagian Kerja",
  "Perusahaan",
  "Lokasi",
  "User",
  "Otoritas",
  "Karyawan",
  "Jadwal Kerja",
  "Setup Jadwal Kerja",
  "Kalender Kerja",
  "Mesin Finger",
  "Setup Mesin Finger",
  "Status Kehadiran",
  "List Kehadiran",
  "Lembur",
  "Ganti Nip",
  "Download Data Payroll",
  "Download Report",
  "Log History",
];
const table = [
  "ms_bagiankerja",
  "ms_perusahaan",
  "ms_lokasi",
  "ms_userid",
  "ms_karyawan",
  "trx_jadwalkerja",
  "trx_jadwalkerjadetail",
  "trx_jadwalkerjacategory",
  "trx_jadwalkerjaindividu",
  "ms_kalenderkerja",
  "ms_mesinfinger",
  "ms_setupmesinfinger",
  "ms_statuskehadiran",
  "trx_listkehadiran",
  "ms_lembur",
  "log_history",
];
const action = ["Edit", "View", "Download", "Void"];
const statusKontrak = ["PKWT", "PKWTT", "Magang", "Informal", "Harian"];
const statusPerkawinan = ["Kawin", "Belum Kawin", "Cerai"];
const akses = ["Lokasi", "Perusahaan", "All"];
const jenisBagian = ["Divisi", "Departemen", "Sub Departemen"];
const kewarganegaraan = ["WNA", "WNI"];
const jenisKelamin = ["Laki-laki", "Perempuan"];

function randomArray(data) {
  return faker.helpers.arrayElement(data);
}
function randomWord(length) {
  return faker.random.words(length);
}
function randomNumber(length) {
  return faker.random.numeric(length);
}
function customNumber(format) {
  return faker.phone.number(format);
}
function sliceDate(date) {
  return JSON.stringify(date).slice(1, 11);
}
function dateToDay(date) {
  return moment(date, "YYYY-MM-DD").format("dddd");
}
function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

let count = 0;

// bagian_kerja
for (let i = 1; i <= divisi.length; i++) {
  database.ms_bagiankerja.push({
    id: i,
    jenis_bagian: jenisBagian[count],
    lokasi: randomArray(lokasi).inisial,
    divisi: randomArray(divisi),
    departemen: randomArray(departemen),
    sub_departemen: randomArray(subDepartemen),
  });
  i % 3 === 0 ? (count = 0) : count++;
}

// ms_perusahaan
for (let i = 1; i <= perusahaan.length; i++) {
  database.ms_perusahaan.push({
    id: i + 9,
    inisial: perusahaan[i - 1].inisial,
    nama: perusahaan[i - 1].nama,
    alamat: perusahaan[i - 1].alamat,
  });
}

// ms_lokasi
for (let i = 1; i <= lokasi.length; i++) {
  database.ms_lokasi.push({
    id: i + 10,
    inisial: lokasi[i - 1].inisial,
    nama: lokasi[i - 1].nama,
    alamat: lokasi[i - 1].alamat,
  });
}

// ms_karyawan
count = 0;
for (let i = 1; i <= divisi.length; i++) {
  const dbPerusahaan = randomArray(database.ms_perusahaan);
  database.ms_karyawan.push({
    id: i,
    nip: dbPerusahaan.id + randomNumber(4),
    kewarganegaraan: randomArray(kewarganegaraan),
    nik: randomNumber(16),
    pin_finger: randomNumber(6),
    nama_lengkap: faker.name.fullName(),
    tempat_lahir: faker.address.cityName(),
    tgl_lahir: sliceDate(faker.date.birthdate()),
    jenis_kelamin: randomArray(jenisKelamin),
    alamat_domisili: faker.address.city(),
    rt_rw: randomNumber(2) + "/" + randomNumber(2),
    kel_des: faker.address.city(),
    agama: randomArray(agama),
    status_perkawinan: randomArray(statusPerkawinan),
    nomor_npwp: randomNumber(16),
    nomor_telepon: customNumber("+62 8## #### ####"),
    email: faker.internet.email(),
    pendidikan_terakhir: randomArray(pendidikan),
    nomor_bpjs_tk: customNumber("#### #### ###"),
    nomor_bpjs_kesehatan: customNumber("#### #### #### #"),
    nama_faskes: faker.name.firstName(),
    alamat_faskes: faker.address.cityName(),
    nomor_kk: customNumber("#### #### #### ####"),
    nama_kepala_keluarga: faker.name.fullName(),
    nama_ibu_kandung: faker.name.fullName(),
    status_pajak: randomArray(statusPajak),
    nama_pasangan: faker.name.fullName(),
    nama_anak_ke1: faker.name.fullName(),
    nama_anak_ke2: faker.name.fullName(),
    nama_anak_ke3: faker.name.fullName(),
    nama_kontak_darurat: faker.name.fullName(),
    nomor_kontak_darurat: customNumber("+62 8## #### ####"),
    hubungan_dengan_karyawan: randomWord(2),
    nomor_passport: randomNumber(7),
    tgl_pembuatan_passport: sliceDate(faker.date.past()),
    tgl_berakhir_passport: sliceDate(faker.date.future()),
    kebangsaan: faker.address.country(),
    nomor_kitas: randomNumber(20),
    tgl_berakhir_kitas: sliceDate(faker.date.future()),
    nomor_rptka: randomNumber(20),
    tgl_berakhir_rptka: sliceDate(faker.date.future()),
    perusahaan: dbPerusahaan.nama,
    lokasi: randomArray(lokasi).inisial,
    divisi: randomArray(divisi),
    departemen: randomArray(departemen),
    sub_departemen: randomArray(subDepartemen),
    jabatan: randomArray(jabatan),
    status_karyawan: randomArray(statusKontrak),
    nama_pemberi_referensi: faker.name.fullName(),
    nama_atasan_langsung: faker.name.fullName(),
    tgl_perubahan_detasir: sliceDate(faker.date.past()),
    lokasi_detasir: randomArray(lokasi).inisial,
    tgl_mulai_detasir: sliceDate(faker.date.past()),
    tgl_akhir_detasir: sliceDate(faker.date.future()),
    alasan_detasir: randomWord(5),
    tgl_join: sliceDate(faker.date.past()),
    nomor_pkwtt: randomNumber(20),
    nomor_pkwt: randomNumber(20),
    kontrak_ke: randomArray([1, 2, 3, 4, 5]),
    mulai_kontrak: sliceDate(faker.date.past()),
    akhir_kontrak: sliceDate(faker.date.future()),
    nomor_surat_kerja: randomNumber(20),
    tgl_mulai_kerja: sliceDate(faker.date.past()),
    tgl_akhir_kerja: sliceDate(faker.date.future()),
    tgl_muncul_hak_cuti: sliceDate(faker.date.past()),
    tgl_berakhir_hak_cuti: sliceDate(faker.date.future()),
    tgl_efektif_terminasi: moment().format("YYYY-MM-DD"),
    alasan_terminasi: "",
    masa_kerja: randomNumber(3),
    banyak_hak_cuti: randomNumber({ max: 12 }),
    data_kontrak: [
      {
        nomor_pkwt: randomNumber(20),
        mulai_kontrak: sliceDate(faker.date.past()),
        akhir_kontrak: sliceDate(faker.date.future()),
        tgl_muncul_hak_cuti: sliceDate(faker.date.past()),
        tgl_berakhir_hak_cuti: sliceDate(faker.date.future()),
      },
      {
        nomor_pkwt: randomNumber(20),
        mulai_kontrak: sliceDate(faker.date.past()),
        akhir_kontrak: sliceDate(faker.date.future()),
        tgl_muncul_hak_cuti: sliceDate(faker.date.past()),
        tgl_berakhir_hak_cuti: sliceDate(faker.date.future()),
      },
    ],
    gaji_pokok: randomNumber({ min: 3000000, max: 99000000 }),
    tgl_perubahan_gaji: sliceDate(faker.date.recent()),
    uang_makan: randomNumber({ min: 10000, max: 100000 }),
    uang_transport: randomNumber({ min: 25000, max: 250000 }),
    note: randomWord(10),
  });
  i % 4 === 0 ? (count = 0) : count++;
}

// ms_userid
for (let i = 1; i <= lokasi.length; i++) {
  const karyawan = database.ms_karyawan[i];

  function role() {
    return {
      view: faker.datatype.boolean(),
      edit: faker.datatype.boolean(),
      download: faker.datatype.boolean(),
    };
  }

  database.ms_userid.push({
    id: i,
    nip: karyawan.nip,
    username: karyawan.nama_lengkap,
    email: karyawan.email,
    lokasi: karyawan.lokasi,
    perusahaan: karyawan.perusahaan,
    akses: randomArray(akses),
    password: faker.internet.password(8),
    role_bagian_kerja: role(),
    role_perusahaan: role(),
    role_lokasi: role(),
    role_user: role(),
    role_karyawan: role(),
    role_jadwal_kerja: role(),
    role_setup_jadwal_kerja: role(),
    role_kalender_kerja: role(),
    role_mesin_finger: role(),
    role_setup_mesin_finger: role(),
    role_status_kehadiran: role(),
    role_list_kehadiran: role(),
    role_lembur: role(),
    role_ganti_nip: role(),
    role_download_data_payroll: role(),
    role_download_report: role(),
    role_log_history: role(),
    status: faker.datatype.boolean(),
  });
}

// login
for (let i = 1; i <= lokasi.length; i++) {
  database.login.push({
    id: i,
    email: database.ms_userid[i - 1].email,
    password: database.ms_userid[i - 1].password,
  });
}

// trx_jadwalkerja
count = 0;
for (let i = 1; i <= lokasi.length; i++) {
  const jamKerjaRes = jamKerja[count];
  const lokasiRes = lokasi[i - 1];
  database.trx_jadwalkerja.push({
    id: i,
    id_jadwal_kerja:
      lokasiRes.id + jamKerjaRes.shiftId + jamKerjaRes.typeId + jamKerjaRes.id,
    lokasi: lokasiRes.inisial,
    shift: jamKerjaRes.shift,
    type: jamKerjaRes.type,
    masuk: jamKerjaRes.masuk,
    keluar: jamKerjaRes.keluar,
    start_break: jamKerjaRes.start_break,
    end_break: jamKerjaRes.end_break,
    total: jamKerjaRes.total,
  });
  i % 4 === 0 ? (count = 0) : count++;
}

// trx_jadwalkerjadetail
for (let i = 1; i <= database.ms_karyawan.length; i++) {
  let { nip, nama_lengkap, perusahaan, divisi, departemen, sub_departemen } =
    database.ms_karyawan[i - 1];
  let jadwalKerja = [];
  for (let j = 1; j <= 12; j++) {
    count = 0;
    for (let k = 1; k <= getDaysInMonth(j, 2023); k++) {
      let jadwalKerjaRes = database.trx_jadwalkerja[count];
      let date = moment(`2023-${j}-${k}`, "YYYY-MM-DD").format("YYYY-MM-DD");
      jadwalKerja.push({
        id_jadwal_kerja: jadwalKerjaRes.id_jadwal_kerja,
        tgl: date,
        hari: dateToDay(date),
        masuk: jadwalKerjaRes.masuk,
        keluar: jadwalKerjaRes.keluar,
        start_break: jadwalKerjaRes.start_break,
        end_break: jadwalKerjaRes.end_break,
        total: jadwalKerjaRes.total,
      });
      k % 5 === 0 ? (count = 0) : count++;
    }
  }
  database.trx_jadwalkerjadetail.push({
    id: i,
    nip: nip,
    nama_lengkap: nama_lengkap,
    perusahaan: perusahaan,
    divisi: divisi,
    departemen: departemen,
    sub_departemen: sub_departemen,
    jadwal_kerja: jadwalKerja,
  });
}

// trx_jadwalkerjacategory
for (let i = 1; i <= database.ms_bagiankerja.length; i++) {
  const { lokasi, divisi, departemen, sub_departemen } =
    database.ms_karyawan[i - 1];
  let hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  let jadwalKerja = [];

  count = 0;
  for (let j = 1; j <= hari.length; j++) {
    let jadwalKerjaRes = database.trx_jadwalkerja[count];
    let data = {
      hari: hari[j - 1],
      id_jadwal_kerja: jadwalKerjaRes.id_jadwal_kerja,
      masuk: jadwalKerjaRes.masuk,
      keluar: jadwalKerjaRes.keluar,
      start_break: jadwalKerjaRes.start_break,
      end_break: jadwalKerjaRes.end_break,
      total: jadwalKerjaRes.total,
    };
    jadwalKerja.push(data);
    j % database.trx_jadwalkerja.length === 0 ? (count = 0) : count++;
  }
  database.trx_jadwalkerjacategory.push({
    id: i,
    lokasi: lokasi,
    divisi: divisi,
    departemen: departemen,
    sub_departemen: sub_departemen,
    jadwal_kerja: jadwalKerja,
  });
}

// trx_jadwalkerjaindividu
for (let i = 1; i <= database.ms_karyawan.length; i++) {
  const { nip, nama_lengkap, departemen, perusahaan } =
    database.ms_karyawan[i - 1];
  let hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  let jadwalKerja = [];

  count = 0;
  for (let j = 1; j <= hari.length; j++) {
    let jadwalKerjaRes = database.trx_jadwalkerja[count];
    let data = {
      hari: hari[j - 1],
      id_jadwal_kerja: jadwalKerjaRes.id_jadwal_kerja,
      masuk: jadwalKerjaRes.masuk,
      keluar: jadwalKerjaRes.keluar,
      start_break: jadwalKerjaRes.start_break,
      end_break: jadwalKerjaRes.end_break,
      total: jadwalKerjaRes.total,
    };
    jadwalKerja.push(data);
    j % database.trx_jadwalkerja.length === 0 ? (count = 0) : count++;
  }
  database.trx_jadwalkerjaindividu.push({
    id: i,
    nip: nip,
    nama_lengkap: nama_lengkap,
    departemen: departemen,
    perusahaan: perusahaan,
    dari: sliceDate(faker.date.recent()),
    sampai: sliceDate(faker.date.future()),
    jadwal_kerja: jadwalKerja,
  });
}

// ms_kalenderkerja
for (let i = 1; i <= database.ms_bagiankerja.length; i++) {
  const date = sliceDate(faker.date.future());
  const { lokasi, divisi, departemen, sub_departemen } =
    database.ms_bagiankerja[i - 1];

  database.ms_kalenderkerja.push({
    id: i,
    tgl: date,
    hari: dateToDay(date),
    keterangan: randomWord(5),
    lokasi: lokasi,
    divisi: divisi,
    departemen: departemen,
    sub_departemen: sub_departemen,
    potong_cuti: faker.datatype.boolean(),
  });
}

// ms_mesinfinger
count = 0;
for (let i = 1; i <= lokasi.length; i++) {
  database.ms_mesinfinger.push({
    id: i,
    nama: mesinFinger[count],
    serial: customNumber("OID61100961104002##"),
    lokasi: lokasi[i - 1].inisial,
    ip: faker.internet.ipv4(),
    port: faker.internet.port().toString(),
    finger: faker.datatype.boolean(),
    kartu: faker.datatype.boolean(),
    wajah: faker.datatype.boolean(),
  });
  i % mesinFinger.length === 0 ? (count = 0) : count++;
}

// ms_setupmesinfinger
for (let i = 1; i <= database.ms_karyawan.length; i++) {
  const { nip, nama_lengkap, departemen, lokasi } = database.ms_karyawan[i - 1];
  database.ms_setupmesinfinger.push({
    id: i,
    nip: nip,
    nama_lengkap: nama_lengkap,
    departemen: departemen,
    lokasi: lokasi,
    mesin: randomArray(mesinFinger),
    status: randomArray(["Delete", "Daftar"]),
  });
}

// ms_statuskehadiran
function formatDate(date) {
  return moment(date).format("YYYY-MM-DD");
}
function formatDateTime(date) {
  return moment(date).format("YYYY-MM-DDTHH:MM");
}
count = 0;
for (let i = 1; i <= database.ms_karyawan.length; i++) {
  const {
    nip,
    nama_lengkap,
    jabatan,
    divisi,
    departemen,
    sub_departemen,
    lokasi,
    perusahaan,
  } = database.ms_karyawan[i - 1];
  const { status, no_form, hakcuti_tersedia } = randomArray(cuti);
  const pengganti = randomArray(database.ms_karyawan);
  let keterangan;
  switch (status) {
    case "Perjalanan Dinas":
      keterangan = "Implementasi";
      break;
    default:
      keterangan = randomArray(keteranganCuti);
      break;
  }

  database.ms_statuskehadiran.push({
    id: i,
    nip: nip,
    nama_lengkap: nama_lengkap,
    lokasi: lokasi,
    perusahaan: perusahaan,
    jabatan: jabatan,
    divisi: divisi,
    departemen: departemen,
    sub_departemen: sub_departemen,
    status_cuti: status,
    no_form: no_form,
    tgl_muncul_hak_cuti: formatDate(faker.date.past()),
    tgl_berakhir_hak_cuti: formatDate(faker.date.future()),
    tgl_mulai_cuti: formatDate(faker.date.soon(1)),
    tgl_selesai_cuti: formatDate(faker.date.soon(5)),
    tgl_mulai_izin: formatDate(faker.date.soon(1)),
    tgl_selesai_izin: formatDate(faker.date.soon(4)),
    waktu_izin_mulai: "09:00",
    waktu_izin_selesai: "12:00",
    total_waktu_izin: 12 - 9,
    nama_pengganti: pengganti.nama_lengkap,
    nip_pengganti: pengganti.nip,
    hak_cuti_telah_diambil: randomNumber(1),
    hak_cuti_diambil: randomNumber(1),
    hak_cuti_tersedia: hakcuti_tersedia,
    hak_cuti_tersisa: randomNumber(1),
    izin_sehari_penuh: faker.datatype.boolean(),
    dinas_luar_kota: faker.datatype.boolean(),
    kota_tujuan_dinas: faker.address.cityName(),
    alamat_tujuan_dinas: faker.address.streetAddress(),
    tgl_berangkat: formatDateTime(faker.date.soon()),
    tgl_pulang: formatDateTime(faker.date.future()),
    jumlah_hari_izin: randomNumber(1),
    keterangan: keterangan,
  });
  i % cuti.length === 0 ? (count = 0) : count++;
}

// trx_listkehadiran
for (let i = 1; i <= database.ms_karyawan.length; i++) {
  const {
    nip,
    nama_lengkap,
    jabatan,
    lokasi,
    divisi,
    departemen,
    sub_departemen,
    perusahaan,
    gaji_pokok,
    uang_makan,
    uang_transport,
  } = database.ms_karyawan[i - 1];
  let jadwalKerja = [];
  for (let j = 1; j <= 12; j++) {
    count = 0;
    const random = faker.datatype.number({ max: 31 });
    for (let k = 1; k <= getDaysInMonth(j, 2023); k++) {
      const { id_jadwal_kerja, masuk, keluar, start_break, end_break, total } =
        database.trx_jadwalkerja[count];
      const { status, no_form, hakcuti_tersedia } = randomArray(cuti);
      let keterangan;
      switch (status) {
        case "Perjalanan Dinas":
          keterangan = "Implementasi";
          break;
        default:
          keterangan = randomArray(keteranganCuti);
          break;
      }
      const date = moment(`2023-${j}-${k}`, "YYYY-MM-DD").format("YYYY-MM-DD");
      const pengganti = randomArray(database.ms_karyawan);
      k === random
        ? jadwalKerja.push({
            tgl: date,
            hari: dateToDay(date),
            id_jadwal_kerja: id_jadwal_kerja,
            masuk: masuk,
            keluar: keluar,
            start_break: start_break,
            end_break: end_break,
            total: total,
            status_cuti: status,
            no_form: no_form,
            tgl_muncul_hak_cuti: formatDate(faker.date.past()),
            tgl_berakhir_hak_cuti: formatDate(faker.date.future()),
            tgl_mulai_cuti: formatDate(faker.date.soon(1)),
            tgl_selesai_cuti: formatDate(faker.date.soon(5)),
            tgl_mulai_izin: formatDate(faker.date.soon(1)),
            tgl_selesai_izin: formatDate(faker.date.soon(4)),
            waktu_izin_mulai: "09:00",
            waktu_izin_selesai: "12:00",
            nama_pengganti: pengganti.nama_lengkap,
            nip_pengganti: pengganti.nip,
            hak_cuti_telah_diambil: randomNumber(1),
            hak_cuti_diambil: randomNumber(1),
            hak_cuti_tersedia: hakcuti_tersedia,
            hak_cuti_tersisa: randomNumber(1),
            izin_sehari_penuh: faker.datatype.boolean(),
            dinas_luar_kota: faker.datatype.boolean(),
            kota_tujuan_dinas: faker.address.cityName(),
            alamat_tujuan_dinas: faker.address.streetAddress(),
            tgl_berangkat: formatDateTime(faker.date.soon()),
            tgl_pulang: formatDateTime(faker.date.future()),
            jumlah_hari_izin: randomNumber(1),
            keterangan: keterangan,
          })
        : jadwalKerja.push({
            tgl: date,
            hari: dateToDay(date),
            id_jadwal_kerja: id_jadwal_kerja,
            masuk: masuk,
            keluar: keluar,
            start_break: start_break,
            end_break: end_break,
            total: total,
            status_cuti: "Hadir",
          });
      k % database.trx_jadwalkerja.length === 0 ? (count = 0) : count++;
    }
  }
  database.trx_listkehadiran.push({
    id: i,
    nip: nip,
    nama_lengkap: nama_lengkap,
    jabatan: jabatan,
    lokasi: lokasi,
    divisi: divisi,
    departemen: departemen,
    sub_departemen: sub_departemen,
    perusahaan: perusahaan,
    gaji_pokok: gaji_pokok,
    uang_makan: uang_makan,
    uang_transport: uang_transport,
    jadwal_kerja: jadwalKerja,
  });
}

// ms_lembur
function sliceTime(data) {
  return parseInt(data.slice(0, 3));
}
count = 0;
for (let i = 1; i <= database.ms_karyawan.length; i++) {
  const {
    nip,
    nama_lengkap,
    jabatan,
    divisi,
    departemen,
    sub_departemen,
    lokasi,
    perusahaan,
  } = database.ms_karyawan[i - 1];
  const { masuk, keluar, start_break, end_break } =
    database.trx_jadwalkerja[count];
  const TI = randomArray(["Lembur Biasa", "Tanpa Istirahat"]);
  database.ms_lembur.push({
    id: i,
    nip: nip,
    nama_lengkap: nama_lengkap,
    lokasi: lokasi,
    perusahaan: perusahaan,
    jabatan: jabatan,
    divisi: divisi,
    departemen: departemen,
    sub_departemen: sub_departemen,
    no_spkl: customNumber("TMS/##/##"),
    tgl: sliceDate(faker.date.soon()),
    jenis_lembur: TI,
    masuk: masuk,
    keluar: keluar,
    jam_lembur_mulai: sliceTime(keluar) + ":00",
    jam_lembur_selesai:
      (sliceTime(keluar) + (3 % 24) !== 0 ? "01" : "00") + ":00",
    mulai_istirahat: start_break,
    selesai_istirahat: end_break,
    tanpa_istirahat: TI === "Tanpa Istirahat" ? true : false,
    jam_lembur_hariini: TI === "Tanpa Istirahat" ? 3 : 2,
    total_lembur_bulanini: randomArray([10, 12, 15, 17, 19, 20, 21, 23, 25]),
    alasan_lembur: randomArray(["Kurang Karyawan", "Banyak Kerjaan"]),
  });
  i % database.trx_jadwalkerja.length === 0 ? (count = 0) : count++;
}

// log_history
for (let i = 1; i <= 10; i++) {
  const { username, lokasi, perusahaan } = randomArray(database.ms_userid);
  database.log_history.push({
    id: i,
    log_id: randomArray([
      "23/MS-" + lokasi + "/" + perusahaan,
      "23/MS-" + lokasi + "/" + perusahaan,
      "23/MS-" + lokasi + "/" + perusahaan,
      "23/MS-" + lokasi + "/" + perusahaan,
      "23/MS-" + lokasi + "/" + perusahaan,
    ]),
    user_id: username,
    tgl: faker.date.past(),
    menu: randomArray(menu),
    table: randomArray(table),
    action: randomArray(action),
  });
}

console.log(JSON.stringify(database));
