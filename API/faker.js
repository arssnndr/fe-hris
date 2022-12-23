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
};

const loop = 31;

// function getRandomInt(max) {
//   return Math.floor(Math.random() * max + 1);
// }

// login
for (var i = 1; i <= loop; i++) {
  const email = faker.internet.email();
  const password = faker.internet.password();
  database.login.push({
    id: i,
    email: email,
    password: password,
    status: faker.datatype.boolean(),
  });
}

// bagian_kerja
for (var i = 1; i <= loop; i++) {
  const id_lokasi = faker.helpers.arrayElement([
    "TMS HO",
    "TMS 1",
    "TMS 2",
    "TMS 3",
    "TMS 4",
  ]);
  const jenis_bagian = faker.helpers.arrayElement([
    "Divisi",
    "Departemen",
    "Sub Departemen",
  ]);
  const divisi = faker.helpers.arrayElement([
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
  ]);
  const departemen = faker.helpers.arrayElement([
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
  ]);
  const sub_departemen = faker.helpers.arrayElement([
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
  ]);
  const status = faker.datatype.boolean();

  database.ms_bagiankerja.push({
    id: i,
    jenis_bagian: jenis_bagian,
    id_lokasi: id_lokasi,
    divisi: divisi,
    departemen: departemen,
    sub_departemen: sub_departemen,
    status: status,
  });
}

// ms_perusahaan
for (var i = 1; i <= loop; i++) {
  const inisial = faker.helpers.arrayElement(["IJP", "TMS", "RIW", "DAP"]);
  let nama_perusahaan = "";

  let alamat_perusahaan = "";

  if (inisial === "IJP") {
    nama_perusahaan = "Indika Jasa Parama";
    alamat_perusahaan = "Jl. Raya Bekasi KM.21, Ruko PTC Block B8";
  } else if (inisial === "TMS") {
    nama_perusahaan = "The Master Steel Manufactory";
    alamat_perusahaan = "Jl. HOS Cokroaminoto No.49";
  } else if (inisial === "RIW") {
    nama_perusahaan = "Royalindo Investa Wijaya";
    alamat_perusahaan = "Jl. HOS Cokroaminoto No.49";
  } else {
    nama_perusahaan = "Donata Agung Perkasa";
    alamat_perusahaan = "Jl. KK Mas Mansyur No.121";
  }

  const status = faker.datatype.boolean();

  database.ms_perusahaan.push({
    id: i,
    inisial: inisial,
    nama_perusahaan: nama_perusahaan,
    alamat_perusahaan: alamat_perusahaan,
    status: status,
  });
}

// ms_lokasi
for (var i = 1; i <= loop; i++) {
  const inisial_lokasi = faker.helpers.arrayElement([
    "TMS 1",
    "TMS 2",
    "TMS 3",
    "TMS 4",
    "TMS HO",
  ]);
  let keterangan = "";

  let alamat_lokasi = "";

  if (inisial_lokasi === "TMS 1") {
    keterangan = "The Master Steel 1";
    alamat_lokasi = "Jl. Pegangsaan 2 No.1";
  } else if (inisial_lokasi === "TMS 2") {
    keterangan = "The Master Steel 2";
    alamat_lokasi = "Jl. Alpha Maspion - KIM V, Manyar";
  } else if (inisial_lokasi === "TMS 3") {
    keterangan = "The Master Steel 3";
    alamat_lokasi = "Jl. Raya Bekasi km.21 Pulogadung";
  } else if (inisial_lokasi === "TMS 4") {
    keterangan = "The Master Steel 4";
    alamat_lokasi = "Jl. Pulo Lentut No.3 Pulogadung";
  } else if (inisial_lokasi === "TMS HO") {
    keterangan = "The Master Steel HO";
    alamat_lokasi = "Jl. HOS Cokroaminoto No.49";
  }

  const status = faker.datatype.boolean();

  database.ms_lokasi.push({
    id: i,
    keterangan: keterangan,
    inisial_lokasi: inisial_lokasi,
    alamat_lokasi: alamat_lokasi,
    status: status,
  });
}

// ms_userid
for (var i = 1; i <= loop; i++) {
  let username = faker.name.fullName();
  let email = faker.internet.email(username);
  let id_perusahaan = faker.helpers.arrayElement([
    "Indika Jasa Parama",
    "Royalindo Investa Wijaya",
    "The Master Steel Manufactory",
    "Donata Agung Perkasa",
  ]);
  let id_lokasi = faker.helpers.arrayElement([
    "TMS HO",
    "TMS 1",
    "TMS 2",
    "TMS 3",
    "TMS 4",
  ]);
  let status = faker.datatype.boolean();
  let akses = faker.helpers.arrayElement(["Lokasi", "Perusahaan", "All"]);
  let pwd = faker.internet.password(8);

  database.ms_userid.push({
    id: i,
    username: username,
    email: email,
    id_lokasi: id_lokasi,
    id_perusahaan: id_perusahaan,
    akses: akses,
    password: pwd,
    bagian_kerja: {
      view: faker.datatype.boolean(),
      edit: faker.datatype.boolean(),
      download: faker.datatype.boolean(),
    },
    perusahaan: {
      view: faker.datatype.boolean(),
      edit: faker.datatype.boolean(),
      download: faker.datatype.boolean(),
    },
    lokasi: {
      view: faker.datatype.boolean(),
      edit: faker.datatype.boolean(),
      download: faker.datatype.boolean(),
    },
    user: {
      view: faker.datatype.boolean(),
      edit: faker.datatype.boolean(),
      download: faker.datatype.boolean(),
    },
    karyawan: {
      view: faker.datatype.boolean(),
      edit: faker.datatype.boolean(),
      download: faker.datatype.boolean(),
    },
    jadwal_kerja: {
      view: faker.datatype.boolean(),
      edit: faker.datatype.boolean(),
      download: faker.datatype.boolean(),
    },
    setup_jadwal_kerja: {
      view: faker.datatype.boolean(),
      edit: faker.datatype.boolean(),
      download: faker.datatype.boolean(),
    },
    kalender_kerja: {
      view: faker.datatype.boolean(),
      edit: faker.datatype.boolean(),
      download: faker.datatype.boolean(),
    },
    status_kehadiran: {
      view: faker.datatype.boolean(),
      edit: faker.datatype.boolean(),
      download: faker.datatype.boolean(),
    },
    list_kehadiran: {
      view: faker.datatype.boolean(),
      edit: faker.datatype.boolean(),
      download: faker.datatype.boolean(),
    },
    lembur: {
      view: faker.datatype.boolean(),
      edit: faker.datatype.boolean(),
      download: faker.datatype.boolean(),
    },
    download: {
      view: faker.datatype.boolean(),
      edit: faker.datatype.boolean(),
      download: faker.datatype.boolean(),
    },
    mesin_finger: {
      view: faker.datatype.boolean(),
      edit: faker.datatype.boolean(),
      download: faker.datatype.boolean(),
    },
    setup_mesin_finger: {
      view: faker.datatype.boolean(),
      edit: faker.datatype.boolean(),
      download: faker.datatype.boolean(),
    },
    ganti_nip: {
      view: faker.datatype.boolean(),
      edit: faker.datatype.boolean(),
      download: faker.datatype.boolean(),
    },
    status: status,
  });
}

// trx_jadwalkerja
var jadwalkerjakeun = [];
var jadwalkerjakategori = [];
var daykeun;
for (var i = 1; i <= loop; i++) {
  daykeun = i;
  if (daykeun >= 31) {
    daykeun = 31;
  }
  if (daykeun.toString().length === 1) {
    daykeun = "0" + i;
  }
  let masuk = faker.helpers.arrayElement(["07:00", "09:00", "14:00"]);
  let keluar;
  let mulaiIstirahat;
  let selesaiIstirahat;
  if (masuk === "07:00") {
    keluar = "16:00";
    mulaiIstirahat = "10:00";
    selesaiIstirahat = "11:00";
  } else if (masuk === "09:00") {
    keluar = "17:00";
    mulaiIstirahat = "12:00";
    selesaiIstirahat = "13:00";
  } else if (masuk === "14:00") {
    keluar = "22:00";
    mulaiIstirahat = "17:00";
    selesaiIstirahat = "18:00";
  }

  let lokasi = faker.helpers.arrayElement([
    { value: "TMS HO", val: "TMS0" },
    { value: "TMS 1", val: "TMS1" },
    { value: "TMS 2", val: "TMS2" },
    { value: "TMS 3", val: "TMS3" },
    { value: "TMS 4", val: "TMS4" },
  ]);
  let shift = faker.helpers.arrayElement([
    { value: "Non Shift", val: "S0" },
    { value: "Shift 1", val: "S1" },
    { value: "Shift 2", val: "S2" },
  ]);
  let jamKerja = faker.helpers.arrayElement([
    { value: "Normal", val: "N" },
    { value: "Pendek", val: "P" },
  ]);

  jadwalkerjakeun.push({
    id_jadwalkerja:
      lokasi.val +
      shift.val +
      jamKerja.val +
      masuk.slice(0, 2) +
      keluar.slice(0, 2),
    tgl: daykeun + moment().format("-MM-YYYY"),
    hari: moment(daykeun + "-12-2022", "DD-MM-YYYY").format("dddd"),
    in: masuk,
    out: keluar,
    mulai_istirahat: mulaiIstirahat,
    selesai_istirahat: selesaiIstirahat,
    total_jam_kerja:
      Number(mulaiIstirahat.slice(0, 2)) -
      Number(masuk.slice(0, 2)) +
      Number(keluar.slice(0, 2)) -
      Number(selesaiIstirahat.slice(0, 2)),
  });

  jadwalkerjakategori.push({
    id_jadwalkerja:
      lokasi.val +
      shift.val +
      jamKerja.val +
      masuk.slice(0, 2) +
      keluar.slice(0, 2),
    in: masuk,
    out: keluar,
    mulai_istirahat: mulaiIstirahat,
    selesai_istirahat: selesaiIstirahat,
    total_jam_kerja:
      Number(mulaiIstirahat.slice(0, 2)) -
      Number(masuk.slice(0, 2)) +
      Number(keluar.slice(0, 2)) -
      Number(selesaiIstirahat.slice(0, 2)),
  })

  database.trx_jadwalkerja.push({
    id:
      lokasi.val +
      shift.val +
      jamKerja.val +
      masuk.slice(0, 2) +
      keluar.slice(0, 2),
    id_lokasi: lokasi.value,
    id_shift: shift.value,
    jam_kerja: jamKerja.value,
    in: masuk,
    out: keluar,
    mulai_istirahat: mulaiIstirahat,
    selesai_istirahat: selesaiIstirahat,
    total_jam_kerja:
      Number(mulaiIstirahat.slice(0, 2)) -
      Number(masuk.slice(0, 2)) +
      Number(keluar.slice(0, 2)) -
      Number(selesaiIstirahat.slice(0, 2)),
  });
}

// ms_karyawan
function stringkeun(obj) {
  return JSON.stringify(obj).split("T")[0].slice(1);
}
for (var i = 1; i <= loop; i++) {
  database.ms_karyawan.push({
    id: faker.random.numeric(6),
    kewarganegaraan: faker.helpers.arrayElement([
      "WNI",
      "WNI",
      "WNI",
      "WNI",
      "WNI",
      "WNA",
    ]),
    nik: faker.random.numeric(16),
    nama_lengkap: faker.name.fullName(),
    tempat_lahir: faker.address.cityName(),
    tgl_lahir: stringkeun(faker.date.birthdate()),
    jenis_kelamin: faker.helpers.arrayElement(["Laki-Laki", "Perempuan"]),
    alamat_domisili: faker.address.city(),
    rt_rw: faker.random.numeric(2) + "/" + faker.random.numeric(2),
    kel_desa: faker.address.city(),
    agama: faker.helpers.arrayElement([
      "Islam",
      "Protestan",
      "Katolik",
      "Hindu",
      "Buddha",
      "Khonghucu",
      "Lain-lain",
    ]),
    status_perkawinan: faker.helpers.arrayElement([
      "Kawin",
      "Belum kawin",
      "Cerai",
    ]),
    nomor_npwp: faker.random.numeric(16),
    nomor_telepon: faker.phone.number("+62 8## #### ####"),
    email: faker.internet.email(),
    pendidikan_terakhir: faker.helpers.arrayElement([
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
    ]),
    nomor_bpjs_tk: faker.phone.number("#### #### ###"),
    nomor_bpjs_kesehatan: faker.phone.number("#### #### #### #"),
    nama_faskes: faker.name.fullName(),
    alamat_faskes: faker.address.cityName(),
    nomor_kk: faker.phone.number("#### #### #### ####"),
    nama_kepala_keluarga: faker.name.fullName(),
    nama_ibu_kandung: faker.name.fullName(),
    status_pajak: faker.helpers.arrayElement([
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
    ]),
    nama_pasangan: faker.name.fullName(),
    nama_anak_ke1: faker.name.fullName(),
    nama_anak_ke2: faker.name.fullName(),
    nama_anak_ke3: faker.name.fullName(),
    nama_kontak_darurat: faker.name.fullName(),
    nomor_telepon_darurat: faker.phone.number("+62 8## #### ####"),
    hubungan_dengan_karyawan: faker.random.words(2),

    nomor_passport: faker.random.numeric(7),
    tgl_pembuatan_passport: stringkeun(faker.date.past()),
    tgl_berakhir_passport: stringkeun(faker.date.future()),
    kebangsaan: faker.address.country(),
    nomor_kitas: faker.random.numeric(20),
    tgl_berakhir_kitas: stringkeun(faker.date.future()),
    nomor_rptka: faker.random.numeric(20),
    tgl_berakhir_rptka: stringkeun(faker.date.future()),

    id_perusahaan: faker.helpers.arrayElement([
      "Indika Jasa Parama",
      "Royalindo Investa Wijaya",
      "The Master Steel Manufactory",
      "Donata Agung Perkasa",
    ]),
    id_lokasi: faker.helpers.arrayElement([
      "TMS HO",
      "TMS 1",
      "TMS 2",
      "TMS 3",
      "TMS 4",
    ]),
    id_divisi: faker.helpers.arrayElement([
      "IT",
      "GA",
      "Finance",
      "Marketing",
      "Sales",
      "Purchase",
      "HRD",
    ]),
    id_departemen: faker.helpers.arrayElement([
      "SAT Developer",
      "Support",
      "Project",
      "Marketing",
      "Sales",
      "Purchase",
      "HRD",
    ]),
    id_subdepartemen: faker.helpers.arrayElement([
      "SAT Developer",
      "Support",
      "Project",
      "Marketing",
      "Sales",
      "Purchase",
      "HRD",
    ]),
    jabatan: faker.helpers.arrayElement([
      "Staff/Crew",
      "Foreman",
      "Supervisor",
      "Specialis",
      "Manager",
      "Senior Manager",
      "General Manager",
      "Director",
    ]),
    status_karyawan: faker.helpers.arrayElement([
      "PKWT",
      "PKWTT",
      "Magang",
      "Informal",
      "Harian",
    ]),
    nama_pemberi_referensi: faker.name.fullName(),
    nama_atasan_langsung: faker.name.fullName(),

    tgl_join: stringkeun(faker.date.past()),
    nomor_pkwtt: faker.random.alphaNumeric(20),

    gaji_pokok: faker.datatype.number({ min: 3000000, max: 99000000 }),
    tgl_perubahan: stringkeun(faker.date.recent()),
    uang_makan: faker.datatype.number({ min: 10000, max: 100000 }),
    uang_transport: faker.datatype.number({ min: 25000, max: 250000 }),
    note: faker.random.words(10),

    jadwal_kerja: jadwalkerjakeun,
  });
}

// trx_jadwalkerjacategory
for (var i = 1; i <= loop; i++) {
  const id_lokasi = faker.helpers.arrayElement([
    "TMS HO",
    "TMS 1",
    "TMS 2",
    "TMS 3",
    "TMS 4",
  ]);
  const divisi = faker.helpers.arrayElement([
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
  ]);
  const departemen = faker.helpers.arrayElement([
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
  ]);
  const sub_departemen = faker.helpers.arrayElement([
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
  ]);
  const status = faker.datatype.boolean();

  database.trx_jadwalkerjacategory.push({
    id: i,
    lokasi: id_lokasi,
    divisi: divisi,
    departemen: departemen,
    sub_departemen: sub_departemen,
    senin: jadwalkerjakategori[0],
    selasa: jadwalkerjakategori[1],
    rabu: jadwalkerjakategori[2],
    kami: jadwalkerjakategori[3],
    jumat: jadwalkerjakategori[4],
    sabtu: jadwalkerjakategori[5],
    minggu: jadwalkerjakategori[6],
    status: status
  });
}

// trx_jadwalkerjaindividu
for (var i = 1; i <= loop; i++) {
  const tgl =
    faker.datatype.number({ min: 1997, max: 2003 }) +
    "-" +
    faker.helpers.arrayElement([
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ]) +
    "-" +
    faker.datatype.number({ min: 10, max: 31 });
  let masuk = faker.helpers.arrayElement(["07:00", "09:00", "14:00"]);
  let keluar;
  let mulaiIstirahat;
  let selesaiIstirahat;
  if (masuk === "07:00") {
    keluar = "16:00";
    mulaiIstirahat = "10:00";
    selesaiIstirahat = "11:00";
  } else if (masuk === "09:00") {
    keluar = "17:00";
    mulaiIstirahat = "12:00";
    selesaiIstirahat = "13:00";
  } else if (masuk === "14:00") {
    keluar = "22:00";
    mulaiIstirahat = "17:00";
    selesaiIstirahat = "18:00";
  }

  let lokasi = faker.helpers.arrayElement([
    { value: "TMS HO", val: "TMS0" },
    { value: "TMS 1", val: "TMS1" },
    { value: "TMS 2", val: "TMS2" },
    { value: "TMS 3", val: "TMS3" },
    { value: "TMS 4", val: "TMS4" },
  ]);
  let shift = faker.helpers.arrayElement([
    { value: "Non Shift", val: "S0" },
    { value: "Shift 1", val: "S1" },
    { value: "Shift 2", val: "S2" },
  ]);
  let jamKerja = faker.helpers.arrayElement([
    { value: "Normal", val: "N0" },
    { value: "Pendek", val: "N1" },
  ]);

  database.trx_jadwalkerjaindividu.push({
    id: lokasi.val + shift.val + jamKerja.val + faker.random.numeric(3),
    tanggal: tgl,
    hari: faker.date.weekday(),
    id_lokasi: lokasi.value,
    id_shift: shift.value,
    jam_kerja: jamKerja.value,
    in: masuk,
    out: keluar,
    mulai_istirahat: mulaiIstirahat,
    selesai_istirahat: selesaiIstirahat,
    total_jam_kerja: "7",
  });
}

console.log(JSON.stringify(database));
