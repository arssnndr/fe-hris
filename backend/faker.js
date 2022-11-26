const { faker } = require("@faker-js/faker");

const database = { login: [], ms_bagiankerja: [], ms_perusahaan: [] };

const loop = 300;

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

console.log(JSON.stringify(database));
