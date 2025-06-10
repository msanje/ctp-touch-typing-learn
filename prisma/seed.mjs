import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function seedProgress(userId, lessonId) {
  const exercises = await prisma.exercise.findMany({
    where: { lessonId },
  });

  for (const exercise of exercises) {
    await prisma.progress.create({
      data: {
        userId,
        lessonId,
        exerciseId: exercise.id,
        completed: false,
      },
    });
  }
}


// Lessons seed function
async function seedLessons() {
  const lessons = [
    {
      title: "Lesson 1 - F, J",
      exercises: [
        { exerciseIndex: 0, content: "jjjjjjjjjj" },
        { exerciseIndex: 1, content: "j jj jjj jjjj jjj jj j" },
        { exerciseIndex: 2, content: "ffffffffff" },
        { exerciseIndex: 3, content: "f ff fff ffff fff ff f" },
        { exerciseIndex: 4, content: "jjj fff jjjj ffff jjjjj fffff" },
        { exerciseIndex: 5, content: "jjj jfj fjf jjf ffj fff jjff ffjj jjjf fffj" },
        { exerciseIndex: 6, content: "jjfff ffjjf jjfjf jfjfj fjjff fjjff ffffj jjjfj jjfff" },
      ],
    },
    {
      title: "Lesson 2 - R, T",
      exercises: [
        { exerciseIndex: 0, content: "rrrrrrrrrr" },
        { exerciseIndex: 1, content: "r rr rrr rrrr rrr rr r" },
        { exerciseIndex: 2, content: "tttttttttt" },
        { exerciseIndex: 3, content: "t tt ttt tttt ttt tt t" },
        { exerciseIndex: 4, content: "rt rt rt rt rt rt rt rt rt rt" },
        { exerciseIndex: 5, content: "rrr rtr trt rrt ttr ttt rrtt ttrr rrrt tttt" },
        { exerciseIndex: 6, content: "rrttt ttrrt rrttr trtrt trrtt trrtt ttttr rrrtr rrttt" },
      ],
    },
    {
      title: "Lesson 3 - U, Y",
      exercises: [
        { exerciseIndex: 0, content: "uuuuuuuuuu" },
        { exerciseIndex: 1, content: "u uu uuu uuuu uuu uu u" },
        { exerciseIndex: 2, content: "yyyyyyyyyy" },
        { exerciseIndex: 3, content: "y yy yyy yyyy yyy yy y" },
        { exerciseIndex: 4, content: "uuu yyy uuuu yyyy uuuuu yyyyy" },
        { exerciseIndex: 5, content: "uuu uyu yuy uuy yyu yyy uuyy yyuu uuuy yyyu" },
        { exerciseIndex: 6, content: "uuyyy yyuuy uuyuy uyuyu yuuyy yuuyy yyyyu uuuyu uuyyy" },
      ],
    },
    {
      title: "Lesson 4 - D, C, E",
      exercises: [
        { exerciseIndex: 0, content: "dddddddddd" },
        { exerciseIndex: 1, content: "d dd ddd dddd ddd dd d" },
        { exerciseIndex: 2, content: "cccccccccc" },
        { exerciseIndex: 3, content: "c cc ccc cccc ccc cc c" },
        { exerciseIndex: 4, content: "ddd ccc dddd cccc ddddd ccccc" },
        { exerciseIndex: 5, content: "ddd dcd cdc ddc ccd ccc ddcc ccdd dddc cccd" },
        { exerciseIndex: 6, content: "ddccc ccddc ddcdc dcdcd cddcc cddcc ccccd dddcd ddccc" },
      ],
    },
    {
      title: "Lesson 5 - K, I",
      exercises: [
        { exerciseIndex: 0, content: "kkkkkkkkkk" },
        { exerciseIndex: 1, content: "k kk kkk kkkk kkk kk k" },
        { exerciseIndex: 2, content: "iiiiiiiiii" },
        { exerciseIndex: 3, content: "i ii iii iiii iii ii i" },
        { exerciseIndex: 4, content: "kkk iii kkkk iiii kkkkk iiiii" },
        { exerciseIndex: 5, content: "kkk kik iki kki iik iii kkii iikk kkki iiik" },
        { exerciseIndex: 6, content: "kkiii iikki kkiki kikik ikkii ikkii iiiki kkkik kkiii" },
      ],
    },
    {
      title: "Lesson 6 - H, N, M",
      exercises: [
        { exerciseIndex: 0, content: "hhhhhhhhhh" },
        { exerciseIndex: 1, content: "h hh hhh hhhh hhh hh h" },
        { exerciseIndex: 2, content: "nnnnnnnnnn" },
        { exerciseIndex: 3, content: "n nn nnn nnnn nnn nn n" },
        { exerciseIndex: 4, content: "hhh nnn hhhh nnnn hhhhh nnnnn" },
        { exerciseIndex: 5, content: "hhh hnh nhn hhn nnh nnn hhnn nnhh hhhn nnnh" },
        { exerciseIndex: 6, content: "hhmmm mmhhm hhmhm hmhmh mhhmm mhhmm mmmmh hhhm hhmmm" },
      ],
    },
    {
      title: "Lesson 7 - G, B, V",
      exercises: [
        { exerciseIndex: 0, content: "gggggggggg" },
        { exerciseIndex: 1, content: "g gg ggg gggg ggg gg g" },
        { exerciseIndex: 2, content: "bbbbbbbbbb" },
        { exerciseIndex: 3, content: "b bb bbb bbbb bbb bb b" },
        { exerciseIndex: 4, content: "ggg bbb gggg bbbb ggggg bbbbb" },
        { exerciseIndex: 5, content: "ggg gbg bgb ggb bbg bbb ggbb bbgg gggb bbbg" },
        { exerciseIndex: 6, content: "ggbbb bbggb ggbgb gbgbg bggbb bggbb bbbbg gggbg ggbbb" },
      ],
    },
  ];

  for (const lesson of lessons) {
    const { exercises, ...lessonData } = lesson;
    const createdLesson = await prisma.lesson.upsert({
      where: { title: lessonData.title },
      update: {},
      create: lessonData,
    });

    for (const exercise of exercises) {
      await prisma.exercise.upsert({
        where: {
          lessonId_exerciseIndex: {
            lessonId: createdLesson.id,
            exerciseIndex: exercise.exerciseIndex,
          },
        },
        update: {},
        create: {
          ...exercise,
          lessonId: createdLesson.id,
        },
      });
    }
  }
}

// Create test user
async function createTestUser() {
  const testUser = await prisma.user.upsert({
    where: { username: 'testuser' },
    update: {},
    create: {
      username: 'testuser',
      email: 'test@example.com',
      password: await bcrypt.hash('testpass123', 10),
    },
  });
  console.log('✅ Test user created:', testUser.username);
  return testUser;
}

// Main function
async function main() {
  console.log("🌱 Starting Database Seeding...");

  // Create test user
  await createTestUser();
  console.log("✅ Test user created");

  // Seed Lessons
  await seedLessons();
  console.log("✅ Lessons Seeded");

  // Fetch lessons & users from DB
  const lessons = await prisma.lesson.findMany();
  const users = await prisma.user.findMany();

  for (const user of users) {
    for (const lesson of lessons) {
      await seedProgress(user.id, lesson.id);
    }
  }
}

main()
  .then(() => {
    console.log("🌱 Database Seeding Completed Successfully.");
  })
  .catch((e) => {
    console.error("❌ Seeding Failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
