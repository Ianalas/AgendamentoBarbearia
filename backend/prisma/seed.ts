import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function seed() {
  const services = [
    {
      name: "Corte Cabelo",
      description: "Degradê",
      price: 30,
    },
    {
      name: "Barba",
      price: 25,
    },
    {
      name: "Luzes",
      price: 50,
    },
  ];

  const service = await db.service.createMany({
    data: services,
  });

  // const user = await db.user.create({
  //   data: {
  //     completyName: "Rodrygo Gomes",
  //     cpf: "542.091.123-41",
  //     email: "jorge@gmail.com",
  //     password: "123123",
  //     phoneNumber: "1199999999",
  //   },
  // });

  await db.schedule.create({
    data: {
      serviceId: "d280d524-d936-402f-98b7-0ab25dc84df0",
      userId: "ed57a61c-3cb5-486f-9df7-7081d07fe5a1",
    },
  });
}

seed().then(() => {
  console.log("SEEDED");
  db.$disconnect();
});

// 2024-07-23T19:10:55.581Z
