const { faker } = require("@faker-js/faker");

const database = {
  login: [],
  ms_bagiankerja: [],
  ms_perusahaan: [],
  ms_lokasi: [],
  ms_userid: [],
};

const loop = 250;

// const id = faker.datatype.uuid();
const username = faker.internet.userName();
const password = faker.internet.password();

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
  let keterangan = "";

  let alamat_lokasi = "";

  if (inisial === "IJP") {
    keterangan = "Indika Jasa Parama";
    alamat_lokasi = "Jl. Raya Bekasi KM.21, Ruko PTC Block B8";
  } else if (inisial === "TMS") {
    keterangan = "The Master Steel Manufactory";
    alamat_lokasi = "Jl. HOS Cokroaminoto No.49";
  } else if (inisial === "RIW") {
    keterangan = "Royalindo Investa Wijaya";
    alamat_lokasi = "Jl. HOS Cokroaminoto No.49";
  } else {
    keterangan = "Donata Agung Perkasa";
    alamat_lokasi = "Jl. KK Mas Mansyur No.121";
  }

  const status = faker.datatype.boolean();

  database.ms_perusahaan.push({
    id: i,
    inisial: inisial,
    keterangan: keterangan,
    alamat_lokasi: alamat_lokasi,
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
  let username = faker.internet.userName();
  let email = faker.internet.email();
  let id_lokasi = getRandomInt(loop);
  let id_perusahaan = getRandomInt(loop);
  let status = faker.datatype.boolean();

  database.ms_userid.push({
    id: i,
    username: username,
    email: email,
    id_lokasi: id_lokasi,
    id_perusahaan: id_perusahaan,
    status: status,
  });
}

console.log(JSON.stringify(database));
