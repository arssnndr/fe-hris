const { faker } = require("@faker-js/faker");

const database = { login: [], ms_bagiankerja: [] };

const loop = 200;

// const id = faker.datatype.uuid();
const id = getRandomInt(loop);
const username = faker.internet.userName();
const password = faker.internet.password();
const id_perusahaan = getRandomInt(loop);

function getRandomInt(max) {
  return Math.floor(Math.random() * max + 1);
}

// login
for(var i = 1; i <= 1; i++){
  const email = faker.internet.email();
  const password = faker.internet.password();
  database.login.push({
    id: i,
    email: email,
    password: password
  })
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
    jenis_bagian: jenis_bagian,
    id_lokasi: id_lokasi,
    uplink: jenis_bagian === "Divisi" ? "" : uplink,
    keterangan: keterangan,
    status: status,
  });
}

console.log(JSON.stringify(database));
