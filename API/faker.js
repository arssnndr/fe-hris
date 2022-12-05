const { faker } = require("@faker-js/faker");

const database = {
  login: [],
  ms_bagiankerja: [],
  ms_perusahaan: [],
  ms_lokasi: [],
  ms_userid: [],
  ms_karyawan: [],
};

const loop = 5;

function getRandomInt(max) {
  return Math.floor(Math.random() * max + 1);
}

// login
for (var i = 1; i <= 1; i++) {
  const email = faker.internet.email();
  const password = faker.internet.password();
  database.login.push({
    id: i,
    email: email,
    password: password,
  });
}

// bagian_kerja
for (var i = 1; i <= loop; i++) {
  const id_lokasi = getRandomInt(loop);
  const jenis_bagian = faker.helpers.arrayElement([
    "Divisi",
    "Departemen",
    "Sub Departemen",
  ]);
  const uplink = faker.helpers.arrayElement([
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
  const keterangan = faker.helpers.arrayElement([
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
    uplink: jenis_bagian === "Divisi" ? "" : uplink,
    keterangan: keterangan,
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
  let id_lokasi = getRandomInt(loop);
  let id_perusahaan = getRandomInt(loop);
  let status = faker.datatype.boolean();
  let akses = faker.helpers.arrayElement(["lokasi", "perusahaan", "all"]);
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

// ms_karyawan
for (var i = 1; i <= loop; i++) {
  let nama_lengkap = faker.name.fullName();
  let id_departemen = getRandomInt(loop);
  let jabatan = faker.name.jobTitle();
  let id_perusahaan = getRandomInt(loop);
  let id_lokasi = getRandomInt(loop);
  let email = faker.internet.email(nama_lengkap);

  database.ms_karyawan.push({
    id: i,
    nama_lengkap: nama_lengkap,
    id_departemen: id_departemen,
    jabatan: jabatan,
    id_perusahaan: id_perusahaan,
    id_lokasi: id_lokasi,
    email: email,
  });
}

console.log(JSON.stringify(database));
