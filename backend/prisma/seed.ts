import { PrismaClient } from "@prisma/client";
import { cpf } from "cpf-cnpj-validator";

const db = new PrismaClient();

async function seed() {
  await db.service.deleteMany();
  await db.user.deleteMany();
  await db.schedule.deleteMany();

  // const services = [
  //   {
  //     name: "Corte Cabelo",
  //     description: "Degradê",
  //     price: 30,
  //   },
  //   {
  //     name: "Barba",
  //     price: 25,
  //   },
  //   {
  //     name: "Luzes",
  //     price: 50,
  //   },
  // ];

  const service = await db.service.create({
    data: {
      name: "Corte Cabelo",
      description: "Degradê",
      price: 30,
    },
  });

  const user = await db.user.create({
    data: {
      completyName: "Rodrygo Gomes",
      cpf: cpf.generate(),
      email: "rrrrr@gmail.com",
      password: "333",
      phoneNumber: "11988888888",
    },
  });

  await db.schedule.create({
    data: {
      datetime: new Date(2024, 7, 27),
      serviceId: service.id,
      userId: user.id,
    },
  });
}

seed().then(() => {
  console.log("Seed ran successfully 🍃🍃");
  db.$disconnect();
});

// 2024-07-23T19:10:55.581Z
