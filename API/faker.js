const { faker } = require("@faker-js/faker");
var moment = require("moment");
moment.locale("id");

const database = {
  login: [],
  ms_bagiankerja: [],
  ms_perusahaan: [],
  ms_lokasi: [],
  ms_userid: [],
  ms_karyawan: [],
  trx_jadwalkerja: [],
  trx_jadwalkerjacategory: [],
  trx_jadwalkerjaindividu: [],
  ms_kalenderkerja: [],
};

const perusahaan = [
  {
    inisial: "IJP",
    nama: "Indika Jasa Parama",
    alamat: "Jl. Raya Bekasi KM.21, Ruko PTC Block B8",
  },
  {
    inisial: "TMS",
    nama: "The Master Steel Manufactory",
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
    id: "TMS1",
    inisial: "TMS 1",
    keterangan: "The Master Steel 1",
    alamat: "Jl. Pegangsaan 2 No.1",
  },
  {
    id: "TMS2",
    inisial: "TMS 2",
    keterangan: "The Master Steel 2",
    alamat: "Jl. Alpha Maspion - KIM V, Manyar",
  },
  {
    id: "TMS3",
    inisial: "TMS 3",
    keterangan: "The Master Steel 3",
    alamat: "Jl. Raya Bekasi km.21 Pulogadung",
  },
  {
    id: "TMS4",
    inisial: "TMS 4",
    keterangan: "The Master Steel 4",
    alamat: "Jl. Pulo Lentut No.3 Pulogadung",
  },
  {
    id: "TMS0",
    inisial: "TMS HO",
    keterangan: "The Master Steel HO",
    alamat: "Jl. HOS Cokroaminoto No.49",
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
];
const jamKerja = [
  {
    id: "0917",
    masuk: "09:00",
    keluar: "17:00",
    mulaiIstirahat: "12:00",
    selesaiIstirahat: "13:00",
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
    mulaiIstirahat: "",
    selesaiIstirahat: "",
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
    mulaiIstirahat: "10:00",
    selesaiIstirahat: "11:00",
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
    mulaiIstirahat: "17:00",
    selesaiIstirahat: "18:00",
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
  "Staff/Crew",
  "Foreman",
  "Supervisor",
  "Specialis",
  "Manager",
  "Senior Manager",
  "General Manager",
  "Director",
];
const statusKaryawan = ["PKWT", "PKWTT", "Magang", "Informal", "Harian"];
const statusPerkawinan = ["Kawin", "Belum kawin", "Cerai"];
const akses = ["Lokasi", "Perusahaan", "All"];
const jenisBagian = ["Divisi", "Departemen", "Sub Departemen"];
const loop = 10;
const departemen = divisi;
const subDepartemen = divisi;

// login
for (var i = 1; i <= loop; i++) {
  database.login.push({
    id: i,
    email: faker.internet.email(),
    password: faker.internet.password(),
    status: faker.datatype.boolean(),
  });
}

// bagian_kerja
for (var i = 1; i <= loop; i++) {
  const lokasiRes = faker.helpers.arrayElement(lokasi)
  
  database.ms_bagiankerja.push({
    id: i,
    jenis_bagian: faker.helpers.arrayElement(jenisBagian),
    lokasi: lokasiRes.inisial,
    divisi: faker.helpers.arrayElement(divisi),
    departemen: faker.helpers.arrayElement(departemen),
    sub_departemen: faker.helpers.arrayElement(subDepartemen),
    status: faker.datatype.boolean(),
  });
}

// ms_perusahaan
for (var i = 1; i <= loop; i++) {
  const res = faker.helpers.arrayElement(perusahaan);
  database.ms_perusahaan.push({
    id: i,
    inisial: res.inisial,
    nama_perusahaan: res.nama,
    alamat_perusahaan: res.alamat,
    status: faker.datatype.boolean(),
  });
}

// ms_lokasi
for (var i = 1; i <= loop; i++) {
  const res = faker.helpers.arrayElement(lokasi);
  database.ms_lokasi.push({
    id: i,
    keterangan: res.keterangan,
    inisial_lokasi: res.inisial,
    alamat_lokasi: res.alamat,
    status: faker.datatype.boolean(),
  });
}

// ms_karyawan
function sliceDate(data) {
  JSON.stringify(data).slice(1, 11);
}
for (var i = 1; i <= loop; i++) {
  const perusahaanRes = faker.helpers.arrayElement(perusahaan);
  const lokasiRes = faker.helpers.arrayElement(lokasi);

  database.ms_karyawan.push({
    id: i,
    nip: faker.random.numeric(6),
    kewarganegaraan: faker.helpers.arrayElement(["WNI", "WNA"]),
    nik: faker.random.numeric(16),
    nama_lengkap: faker.name.fullName(),
    tempat_lahir: faker.address.cityName(),
    tgl_lahir: sliceDate(faker.date.birthdate()),
    jenis_kelamin: faker.helpers.arrayElement(["Laki-Laki", "Perempuan"]),
    alamat_domisili: faker.address.city(),
    rt_rw: faker.random.numeric(2) + "/" + faker.random.numeric(2),
    kel_desa: faker.address.city(),
    agama: faker.helpers.arrayElement(agama),
    status_perkawinan: faker.helpers.arrayElement(statusPerkawinan),
    nomor_npwp: faker.random.numeric(16),
    nomor_telepon: faker.phone.number("+62 8## #### ####"),
    email: faker.internet.email(),
    pendidikan_terakhir: faker.helpers.arrayElement(pendidikan),
    nomor_bpjs_tk: faker.phone.number("#### #### ###"),
    nomor_bpjs_kesehatan: faker.phone.number("#### #### #### #"),
    nama_faskes: faker.name.fullName(),
    alamat_faskes: faker.address.cityName(),
    nomor_kk: faker.phone.number("#### #### #### ####"),
    nama_kepala_keluarga: faker.name.fullName(),
    nama_ibu_kandung: faker.name.fullName(),
    status_pajak: faker.helpers.arrayElement(statusPajak),
    nama_pasangan: faker.name.fullName(),
    nama_anak_ke1: faker.name.fullName(),
    nama_anak_ke2: faker.name.fullName(),
    nama_anak_ke3: faker.name.fullName(),
    nama_kontak_darurat: faker.name.fullName(),
    nomor_telepon_darurat: faker.phone.number("+62 8## #### ####"),
    hubungan_dengan_karyawan: faker.random.words(2),
    nomor_passport: faker.random.numeric(7),
    tgl_pembuatan_passport: sliceDate(faker.date.past()),
    tgl_berakhir_passport: sliceDate(faker.date.future()),
    kebangsaan: faker.address.country(),
    nomor_kitas: faker.random.numeric(20),
    tgl_berakhir_kitas: sliceDate(faker.date.future()),
    nomor_rptka: faker.random.numeric(20),
    tgl_berakhir_rptka: sliceDate(faker.date.future()),
    perusahaan: perusahaanRes.nama,
    lokasi: lokasiRes.keterangan,
    divisi: faker.helpers.arrayElement(divisi),
    departemen: faker.helpers.arrayElement(departemen),
    subdepartemen: faker.helpers.arrayElement(subDepartemen),
    jabatan: faker.helpers.arrayElement(jabatan),
    status_karyawan: faker.helpers.arrayElement(statusKaryawan),
    nama_pemberi_referensi: faker.name.fullName(),
    nama_atasan_langsung: faker.name.fullName(),
    tgl_join: sliceDate(faker.date.past()),
    nomor_pkwtt: faker.random.alphaNumeric(20),
    gaji_pokok: faker.datatype.number({ min: 3000000, max: 99000000 }),
    tgl_perubahan: sliceDate(faker.date.recent()),
    uang_makan: faker.datatype.number({ min: 10000, max: 100000 }),
    uang_transport: faker.datatype.number({ min: 25000, max: 250000 }),
    note: faker.random.words(10),
  });
}

// ms_userid
for (var i = 1; i <= loop; i++) {
  const username = faker.name.fullName();
  const lokasiRes = faker.helpers.arrayElement(lokasi);
  const role = {
    view: faker.datatype.boolean(),
    edit: faker.datatype.boolean(),
    download: faker.datatype.boolean(),
  };

  database.ms_userid.push({
    id: i,
    username: username,
    email: faker.internet.email(username),
    lokasi: lokasiRes.inisial,
    perusahaan: lokasiRes.keterangan,
    akses: faker.helpers.arrayElement(akses),
    password: faker.internet.password(8),
    bagian_kerja: role,
    perusahaan: role,
    lokasi: role,
    user: role,
    karyawan: role,
    jadwal_kerja: role,
    setup_jadwal_kerja: role,
    kalender_kerja: role,
    status_kehadiran: role,
    list_kehadiran: role,
    lembur: role,
    download: role,
    mesin_finger: role,
    setup_mesin_finger: role,
    ganti_nip: role,
    status: faker.datatype.boolean(),
  });
}

// trx_jadwalkerja
for (var i = 1; i <= loop; i++) {
  // jadwalkerjakeun.push({
  //   tgl: daykeun + moment().format("-MM-YYYY"),
  //   hari: moment(daykeun + "-12-2022", "DD-MM-YYYY").format("dddd"),
  // });

  const lokasiRes = faker.helpers.arrayElement(lokasi);
  const jamKerjaRes = faker.helpers.arrayElement(jamKerja);

  database.trx_jadwalkerja.push({
    id:
      lokasiRes.id + jamKerjaRes.shiftId + jamKerjaRes.typeId + jamKerjaRes.id,
    inisial_lokasi: lokasiRes.inisial,
    shift: jamKerjaRes.shift,
    masuk: jamKerjaRes.masuk,
    keluar: jamKerjaRes.keluar,
    mulai_istirahat: jamKerjaRes.mulaiIstirahat,
    selesai_istirahat: jamKerjaRes.selesaiIstirahat,
    total: jamKerjaRes.total,
  });
}

// trx_jadwalkerjacategory
for (var i = 1; i <= loop; i++) {
  database.trx_jadwalkerjacategory.push({
    id: i,
    lokasi: faker.helpers.arrayElement(lokasi).keterangan,
    divisi: faker.helpers.arrayElement(divisi),
    departemen: faker.helpers.arrayElement(departemen),
    sub_departemen: faker.helpers.arrayElement(subDepartemen),
    senin: database.trx_jadwalkerja[faker.datatype.number(7)],
    selasa: database.trx_jadwalkerja[faker.datatype.number(7)],
    rabu: database.trx_jadwalkerja[faker.datatype.number(7)],
    kamis: database.trx_jadwalkerja[faker.datatype.number(7)],
    jumat: database.trx_jadwalkerja[faker.datatype.number(7)],
    sabtu: database.trx_jadwalkerja[faker.datatype.number(7)],
    minggu: database.trx_jadwalkerja[faker.datatype.number(7)],
    status: faker.datatype.boolean(),
  });
}

// trx_jadwalkerjaindividu
function dateToDay(date) {
  moment(date, "dd-mm-yyyy").format("dddd");
}
for (var i = 1; i <= loop; i++) {
  const tgl = sliceDate(faker.date.future());
  const lokasiRes = faker.helpers.arrayElement(lokasi);
  const jamKerjaRes = faker.helpers.arrayElement(jamKerja);

  database.trx_jadwalkerjaindividu.push({
    id: i,
    tanggal: tgl,
    hari: dateToDay(tgl),
    lokasi: lokasiRes.inisial,
    shift: jamKerjaRes.shift,
    jam_kerja: jamKerjaRes.type,
    in: jamKerjaRes.masuk,
    out: jamKerjaRes.keluar,
    mulai_istirahat: jamKerjaRes.mulaiIstirahat,
    selesai_istirahat: jamKerjaRes.selesaiIstirahat,
    total_jam_kerja: jamKerjaRes.total,
  });
}

// ms_kalenderkerja
for (var i = 1; i <= loop; i++) {
  const tgl = sliceDate(faker.date.future());
  const lokasiRes = faker.helpers.arrayElement(lokasi);

  database.ms_kalenderkerja.push({
    id: i,
    tgl: tgl,
    hari: dateToDay(tgl),
    keterangan: faker.lorem.words(5),
    lokasi: lokasiRes.keterangan,
    divisi: faker.helpers.arrayElement(divisi),
    departemen: faker.helpers.arrayElement(departemen),
    sub_departemen: faker.helpers.arrayElement(subDepartemen),
    potong_cuti: faker.datatype.boolean(),
    status: faker.datatype.boolean(),
  });
}

console.log(JSON.stringify(database));
