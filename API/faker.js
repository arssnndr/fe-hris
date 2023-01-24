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
  trx_jadwalkerjadetail: [],
  trx_jadwalkerjacategory: [],
  trx_jadwalkerjaindividu: [],
  ms_kalenderkerja: [],
  ms_mesinfinger: [],
  ms_setupmesinfinger: [],
  ms_statuskehadiran: [],
  trx_listkehadiran: [],
};

const loop = 100;

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
    id: "TMS0",
    inisial: "TMS HO",
    keterangan: "The Master Steel HO",
    alamat: "Jl. HOS Cokroaminoto No.49",
  },
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
    tgl_muncul_hakcuti_dari: moment("24-01-2023", "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    ),
    tgl_muncul_hakcuti_sampai: moment("24-01-2023", "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    ),
    tgl_mulai: moment(faker.date.soon(1)).format("YYYY-MM-DD"),
    tgl_selesai: moment(faker.date.soon(5)).format("YYYY-MM-DD"),
    petugas_pengganti: {
      nip: faker.random.numeric(6),
      nama_lengkap: faker.name.fullName(),
    },
    hakcuti_terambil: 0,
    hakcuti_tersedia: 12,
    ambil_cuti: 2,
    sisa_cuti: 10,
  },
  {
    status: "Cuti Khusus",
    no_form: faker.phone.number("CK########"),
    tgl_mulai: moment(faker.date.soon(1)).format("YYYY-MM-DD"),
    tgl_selesai: moment(faker.date.soon(90)).format("YYYY-MM-DD"),
    petugas_pengganti: {
      nip: faker.random.numeric(6),
      nama_lengkap: faker.name.fullName(),
    },
    hakcuti_tersedia: 90,
    ambil_cuti: 90,
  },
  {
    status: "Izin",
    no_form: faker.phone.number("IZ########"),
    izin_seharian: faker.datatype.boolean(),
    tgl_mulai: moment(faker.date.soon(1)).format("YYYY-MM-DD"),
    tgl_selesai: moment(faker.date.soon(5)).format("YYYY-MM-DD"),
  },
  {
    status: "Perjalanan Dinas",
    no_form: faker.phone.number("PD########"),
    dinas_dalkot: faker.datatype.boolean(),
    alamat_tujuan: faker.helpers.arrayElement(lokasi).alamat,
    tgl_mulai: moment(faker.date.soon(1)).format("YYYY-MM-DD[T]HH:mm"),
    tgl_selesai: moment(faker.date.soon(5)).format("YYYY-MM-DD[T]HH:mm"),
  },
  {
    status: "Mangkir",
  },
  { status: "Hadir" },
  { status: "Hadir" },
  { status: "Hadir" },
  { status: "Hadir" },
  { status: "Hadir" },
  { status: "Hadir" },
  { status: "Hadir" },
  { status: "Hadir" },
  { status: "Hadir" },
  { status: "Hadir" },
  { status: "Hadir" },
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
const statusKaryawan = ["PKWT", "PKWTT", "Magang", "Informal", "Harian"];
const statusPerkawinan = ["Kawin", "Belum kawin", "Cerai"];
const akses = ["Lokasi", "Perusahaan", "All"];
const jenisBagian = ["Divisi", "Departemen", "Sub Departemen"];
const departemen = divisi;
const subDepartemen = divisi;

// bagian_kerja
for (var i = 0; i < 75; i++) {
  database.ms_bagiankerja.push({
    id: i,
    jenis_bagian: faker.helpers.arrayElement(jenisBagian),
    lokasi: faker.helpers.arrayElement(lokasi).inisial,
    divisi: faker.helpers.arrayElement(divisi),
    departemen: faker.helpers.arrayElement(departemen),
    sub_departemen: faker.helpers.arrayElement(subDepartemen),
    status: faker.datatype.boolean(),
  });
}

// ms_perusahaan
for (var i = 0; i < 4; i++) {
  database.ms_perusahaan.push({
    id: i + 10,
    inisial: perusahaan[i].inisial,
    nama: perusahaan[i].nama,
    alamat: perusahaan[i].alamat,
    status: faker.datatype.boolean(),
  });
}

// ms_lokasi
for (var i = 0; i < 5; i++) {
  database.ms_lokasi.push({
    id: i + 10,
    inisial: lokasi[i].inisial,
    keterangan: lokasi[i].keterangan,
    alamat: lokasi[i].alamat,
    status: faker.datatype.boolean(),
  });
}

// ms_karyawan
function sliceDate(data) {
  return JSON.stringify(data).slice(1, 11);
}
for (var i = 0; i < loop; i++) {
  const resPerusahaan = faker.helpers.arrayElement(database.ms_perusahaan);
  const resBagianKerja = faker.helpers.arrayElement(database.ms_bagiankerja);
  const nama = faker.name.fullName();
  database.ms_karyawan.push({
    id: i,
    nip: resPerusahaan.id.toString() + faker.random.numeric(4),
    kewarganegaraan: faker.helpers.arrayElement(["WNI", "WNA"]),
    nik: faker.random.numeric(16),
    nama_lengkap: nama,
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
    email: faker.internet.email(nama),
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
    perusahaan: resPerusahaan.inisial,
    lokasi: resBagianKerja.lokasi,
    divisi: resBagianKerja.divisi,
    departemen: resBagianKerja.departemen,
    sub_departemen: resBagianKerja.sub_departemen,
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
    status: faker.datatype.boolean(),
  });
}

// ms_userid
for (var i = 0; i < 30; i++) {
  const karyawan = database.ms_karyawan[i];

  function role(view, edit, download) {
    return { view: view, edit: edit, download: download };
  }

  database.ms_userid.push({
    id: i,
    nip: karyawan.nip,
    username: karyawan.nama_lengkap,
    email: karyawan.email,
    lokasi: karyawan.lokasi,
    perusahaan: karyawan.perusahaan,
    akses: faker.helpers.arrayElement(akses),
    password: faker.internet.password(8),
    role_bagian_kerja: role(
      faker.datatype.boolean(),
      faker.datatype.boolean(),
      faker.datatype.boolean()
    ),
    role_perusahaan: role(
      faker.datatype.boolean(),
      faker.datatype.boolean(),
      faker.datatype.boolean()
    ),
    role_lokasi: role(
      faker.datatype.boolean(),
      faker.datatype.boolean(),
      faker.datatype.boolean()
    ),
    role_user: role(
      faker.datatype.boolean(),
      faker.datatype.boolean(),
      faker.datatype.boolean()
    ),
    role_karyawan: role(
      faker.datatype.boolean(),
      faker.datatype.boolean(),
      faker.datatype.boolean()
    ),
    role_jadwal_kerja: role(
      faker.datatype.boolean(),
      faker.datatype.boolean(),
      faker.datatype.boolean()
    ),
    role_setup_jadwal_kerja: role(
      faker.datatype.boolean(),
      faker.datatype.boolean(),
      faker.datatype.boolean()
    ),
    role_kalender_kerja: role(
      faker.datatype.boolean(),
      faker.datatype.boolean(),
      faker.datatype.boolean()
    ),
    role_status_kehadiran: role(
      faker.datatype.boolean(),
      faker.datatype.boolean(),
      faker.datatype.boolean()
    ),
    role_list_kehadiran: role(
      faker.datatype.boolean(),
      faker.datatype.boolean(),
      faker.datatype.boolean()
    ),
    role_lembur: role(
      faker.datatype.boolean(),
      faker.datatype.boolean(),
      faker.datatype.boolean()
    ),
    role_download: role(
      faker.datatype.boolean(),
      faker.datatype.boolean(),
      faker.datatype.boolean()
    ),
    role_mesin_finger: role(
      faker.datatype.boolean(),
      faker.datatype.boolean(),
      faker.datatype.boolean()
    ),
    role_setup_mesin_finger: role(
      faker.datatype.boolean(),
      faker.datatype.boolean(),
      faker.datatype.boolean()
    ),
    role_ganti_nip: role(
      faker.datatype.boolean(),
      faker.datatype.boolean(),
      faker.datatype.boolean()
    ),
    role_status: faker.datatype.boolean(),
  });
}

// login
for (var i = 0; i < 30; i++) {
  database.login.push({
    id: i,
    email: database.ms_userid[i].email,
    password: database.ms_userid[i].password,
    status: faker.datatype.boolean(),
  });
}

// trx_jadwalkerja
for (var i = 0; i < 5; i++) {
  for (var j = 0; j < 4; j++) {
    const res = jamKerja[j];
    database.trx_jadwalkerja.push({
      id: i,
      id_jadwal_kerja: lokasi[i].id + res.shiftId + res.typeId + res.id,
      lokasi: lokasi[i].inisial,
      shift: res.shift,
      type: res.type,
      masuk: res.masuk,
      keluar: res.keluar,
      mulai_istirahat: res.mulaiIstirahat,
      selesai_istirahat: res.selesaiIstirahat,
      total: res.total,
    });
  }
}

// trx_jadwalkerjadetail
function dateToDay(date) {
  return moment(date, "DD-MM-YYYY").format("dddd");
}
for (var i = 0; i < loop; i++) {
  let jan = [];
  let feb = [];
  let mar = [];
  let apr = [];
  let mei = [];
  let jun = [];
  let jul = [];
  let agu = [];
  let sep = [];
  let okt = [];
  let nov = [];
  let des = [];

  for (var z = 1; z <= 12; z++) {
    let x;
    z.toString().length === 1 ? (x = `0${z}`) : (x = z.toString());
    for (var j = 1; j <= moment(`${x}-2023`, "MM-YYYY").daysInMonth(); j++) {
      const trxJadwalKerja = faker.helpers.arrayElement(
        database.trx_jadwalkerja
      );
      const data = {
        id_jadwal_kerja: trxJadwalKerja.id_jadwal_kerja,
        tgl: `${j}-${x}-2023`,
        hari: dateToDay(`${j}-${x}-2023`),
        masuk: trxJadwalKerja.masuk,
        keluar: trxJadwalKerja.keluar,
        mulai_istirahat: trxJadwalKerja.mulai_istirahat,
        selesai_istirahat: trxJadwalKerja.selesai_istirahat,
        total: trxJadwalKerja.total,
      };
      switch (z) {
        case 1:
          jan.push(data);
          break;
        case 2:
          feb.push(data);
          break;
        case 3:
          mar.push(data);
          break;
        case 4:
          apr.push(data);
          break;
        case 5:
          mei.push(data);
          break;
        case 6:
          jun.push(data);
          break;
        case 7:
          jul.push(data);
          break;
        case 8:
          agu.push(data);
          break;
        case 9:
          sep.push(data);
          break;
        case 10:
          okt.push(data);
          break;
        case 11:
          nov.push(data);
          break;
        case 12:
          des.push(data);
          break;
      }
    }
  }

  database.trx_jadwalkerjadetail.push({
    id: i,
    nip: database.ms_karyawan[i].nip,
    nama_lengkap: database.ms_karyawan[i].nama_lengkap,
    perusahaan: database.ms_karyawan[i].perusahaan,
    divisi: database.ms_karyawan[i].divisi,
    departemen: database.ms_karyawan[i].departemen,
    sub_departemen: database.ms_karyawan[i].sub_departemen,
    jadwal_kerja: [jan, feb, mar, apr, mei, jun, jul, agu, sep, okt, nov, des],
  });
}

// trx_jadwalkerjacategory
let jadwalKerja = [];
for (var i = 0; i < 75; i++) {
  jadwalKerja = [];
  let hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  for (let j = 0; j < 7; j++) {
    let data = {
      hari: hari[j],
      id_jadwal_kerja: database.trx_jadwalkerja[j].id_jadwal_kerja,
      masuk: database.trx_jadwalkerja[j].masuk,
      keluar: database.trx_jadwalkerja[j].keluar,
      mulai_istirahat: database.trx_jadwalkerja[j].mulai_istirahat,
      selesai_istirahat: database.trx_jadwalkerja[j].selesai_istirahat,
      total: database.trx_jadwalkerja[j].total,
    };
    jadwalKerja.push(data);
  }

  database.trx_jadwalkerjacategory.push({
    id: i,
    lokasi: database.ms_karyawan[i].lokasi,
    divisi: database.ms_karyawan[i].divisi,
    departemen: database.ms_karyawan[i].departemen,
    sub_departemen: database.ms_karyawan[i].sub_departemen,
    jadwal_kerja: jadwalKerja,
    status: faker.datatype.boolean(),
  });
}

// trx_jadwalkerjaindividu
for (var i = 0; i < loop; i++) {
  database.trx_jadwalkerjaindividu.push({
    id: i,
    nip: database.ms_karyawan[i].nip,
    nama_lengkap: database.ms_karyawan[i].nama_lengkap,
    departemen: database.ms_karyawan[i].departemen,
    perusahaan: database.ms_karyawan[i].perusahaan,
    dari: moment(sliceDate(faker.date.recent())).format("YYYY-MM-DD"),
    sampai: moment(sliceDate(faker.date.future())).format("YYYY-MM-DD"),
    jadwal_kerja: jadwalKerja,
    status: faker.datatype.boolean(),
  });
}

// ms_kalenderkerja
for (var i = 0; i < 35; i++) {
  const tgl = sliceDate(faker.date.future());

  database.ms_kalenderkerja.push({
    id: i,
    tgl: tgl,
    hari: dateToDay(tgl),
    keterangan: faker.lorem.words(5),
    lokasi: database.ms_bagiankerja[i].lokasi,
    divisi: database.ms_bagiankerja[i].divisi,
    departemen: database.ms_bagiankerja[i].departemen,
    sub_departemen: database.ms_bagiankerja[i].sub_departemen,
    potong_cuti: faker.datatype.boolean(),
    status: faker.datatype.boolean(),
  });
}

// ms_mesinfinger
for (var i = 0; i < 4; i++) {
  database.ms_mesinfinger.push({
    id: i,
    nama: mesinFinger[i],
    serial: faker.phone.number("OID61100961104002##"),
    lokasi: lokasi[i].inisial,
    ip: faker.internet.ipv4(),
    port: faker.internet.port().toString(),
    finger: faker.datatype.boolean(),
    kartu: faker.datatype.boolean(),
    wajah: faker.datatype.boolean(),
    status: faker.datatype.boolean(),
  });
}

// ms_setupmesinfinger
for (var i = 0; i < loop; i++) {
  database.ms_setupmesinfinger.push({
    id: i,
    nip: database.ms_karyawan[i].nip,
    nama_lengkap: database.ms_karyawan[i].nama_lengkap,
    departemen: database.ms_karyawan[i].departemen,
    lokasi: database.ms_karyawan[i].lokasi,
    mesin: faker.helpers.arrayElement(mesinFinger),
    status: faker.helpers.arrayElement(["Delete", "Daftar"]),
  });
}

// ms_statuskehadiran
for (var i = 0; i < loop; i++) {
  const karyawan = database.ms_karyawan[i];
  const cutiValue = faker.helpers.arrayElement(cuti);
  const keterangan =
    cutiValue.status === "Cuti Tahunan"
      ? "Liburan"
      : cutiValue.status === "Izin"
      ? "Ngambil rapor anak"
      : cutiValue.status === "Perjalanan Dinas"
      ? "Implementasi"
      : cutiValue.status === "Mangkir"
      ? ""
      : cutiValue.status === "Hadir"
      ? ""
      : faker.helpers.arrayElement(keteranganCuti);

  database.ms_statuskehadiran.push({
    id: i,
    nip: karyawan.nip,
    nama_lengkap: karyawan.nama_lengkap,
    cuti: cutiValue,
    keterangan: keterangan,
  });
}

// trx_listkehadiran
for (var i = 0; i < loop; i++) {
  let jan = [];
  let feb = [];
  let mar = [];
  let apr = [];
  let mei = [];
  let jun = [];
  let jul = [];
  let agu = [];
  let sep = [];
  let okt = [];
  let nov = [];
  let des = [];

  for (var z = 1; z <= 12; z++) {
    let x;
    z.toString().length === 1 ? (x = `0${z}`) : (x = z.toString());
    for (var j = 1; j <= moment(`${x}-2023`, "MM-YYYY").daysInMonth(); j++) {
      const trxJadwalKerja = faker.helpers.arrayElement(
        database.trx_jadwalkerja
      );
      const cutiValue = faker.helpers.arrayElement(cuti);
      const keterangan =
        cutiValue.status === "Cuti Tahunan"
          ? "Liburan"
          : cutiValue.status === "Izin"
          ? "Ngambil rapor anak"
          : cutiValue.status === "Perjalanan Dinas"
          ? "Implementasi"
          : cutiValue.status === "Mangkir"
          ? ""
          : cutiValue.status === "Hadir"
          ? ""
          : faker.helpers.arrayElement(keteranganCuti);
      const data = {
        tgl: `${j}-${x}-2023`,
        hari: dateToDay(`${j}-${x}-2023`),
        masuk: trxJadwalKerja.masuk,
        keluar: trxJadwalKerja.keluar,
        mulai_istirahat: trxJadwalKerja.mulai_istirahat,
        selesai_istirahat: trxJadwalKerja.selesai_istirahat,
        total: trxJadwalKerja.total,
        status_kehadiran: {
          cuti: cutiValue,
          keterangan: keterangan,
        },
      };
      switch (z) {
        case 1:
          jan.push(data);
          break;
        case 2:
          feb.push(data);
          break;
        case 3:
          mar.push(data);
          break;
        case 4:
          apr.push(data);
          break;
        case 5:
          mei.push(data);
          break;
        case 6:
          jun.push(data);
          break;
        case 7:
          jul.push(data);
          break;
        case 8:
          agu.push(data);
          break;
        case 9:
          sep.push(data);
          break;
        case 10:
          okt.push(data);
          break;
        case 11:
          nov.push(data);
          break;
        case 12:
          des.push(data);
          break;
      }
    }
  }

  database.trx_listkehadiran.push({
    id: i,
    nip: database.ms_karyawan[i].nip,
    nama_lengkap: database.ms_karyawan[i].nama_lengkap,
    perusahaan: database.ms_karyawan[i].perusahaan,
    jadwal_kerja: [jan, feb, mar, apr, mei, jun, jul, agu, sep, okt, nov, des],
  });
}

console.log(JSON.stringify(database));
