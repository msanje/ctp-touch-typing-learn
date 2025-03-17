// prisma/seed.ts

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    // Create a test user
    const user = await prisma.user.create({
        data: {
            username: "testuser",
            email: "test@example.com",
            password: "hashed_password_would_go_here" // In production, use proper password hashing
        }
    });

    // Lesson 1 - F, J
    const lesson1 = await prisma.lesson.create({
        data: {
            title: "Lesson 1 - F, J",
            exercises: {
                create: [
                    { exerciseIndex: 0, content: "jjjjjjjjjj" },
                    { exerciseIndex: 1, content: "j jj jjj jjjj jjj jj j" },
                    { exerciseIndex: 2, content: "ffffffffff" },
                    { exerciseIndex: 3, content: "f ff fff ffff fff ff f" },
                    { exerciseIndex: 4, content: "jjj fff jjjj ffff jjjjj fffff" },
                    { exerciseIndex: 5, content: "jjj jfj fjf jjf ffj fff jjff ffjj jjjf fffj" },
                    { exerciseIndex: 6, content: "jjfff ffjjf jjfjf jfjfj fjjff fjjff ffffj jjjfj jjfff" },
                ],
            },
        },
    });

    // Lesson 2 - R, T
    const lesson2 = await prisma.lesson.create({
        data: {
            title: "Lesson 2 - R, T",
            exercises: {
                create: [
                    { exerciseIndex: 0, content: "rrrrrrrrrr" },
                    { exerciseIndex: 1, content: "r rr rrr rrrr rrr rr r" },
                    { exerciseIndex: 2, content: "tttttttttt" },
                    { exerciseIndex: 3, content: "t tt ttt tttt ttt tt t" },
                    { exerciseIndex: 4, content: "rt rt rt rt rt rt rt rt rt rt" },
                    { exerciseIndex: 5, content: "rrr rtr trt rrt ttr ttt rrtt ttrr rrrt tttt" },
                    { exerciseIndex: 6, content: "rrttt ttrrt rrttr trtrt trrtt trrtt ttttr rrrtr rrttt" },
                ],
            },
        },
    });

    // Lesson 3 - U, Y
    const lesson3 = await prisma.lesson.create({
        data: {
            title: "Lesson 3 - U, Y",
            exercises: {
                create: [
                    { exerciseIndex: 0, content: "uuuuuuuuuu" },
                    { exerciseIndex: 1, content: "u uu uuu uuuu uuu uu u" },
                    { exerciseIndex: 2, content: "yyyyyyyyyy" },
                    { exerciseIndex: 3, content: "y yy yyy yyyy yyy yy y" },
                    { exerciseIndex: 4, content: "uuu yyy uuuu yyyy uuuuu yyyyy" },
                    { exerciseIndex: 5, content: "uuu uyu yuy uuy yyu yyy uuyy yyuu uuuy yyyu" },
                    { exerciseIndex: 6, content: "uuyyy yyuuy uuyuy uyuyu yuuyy yuuyy yyyyu uuuyu uuyyy" },
                ],
            },
        },
    });

    // Lesson 4 - D, C, E
    const lesson4 = await prisma.lesson.create({
        data: {
            title: "Lesson 4 - D, C, E",
            exercises: {
                create: [
                    { exerciseIndex: 0, content: "dddddddddd" },
                    { exerciseIndex: 1, content: "d dd ddd dddd ddd dd d" },
                    { exerciseIndex: 2, content: "cccccccccc" },
                    { exerciseIndex: 3, content: "c cc ccc cccc ccc cc c" },
                    { exerciseIndex: 4, content: "ddd ccc dddd cccc ddddd ccccc" },
                    { exerciseIndex: 5, content: "ddd dcd cdc ddc ccd ccc ddcc ccdd dddc cccd" },
                    { exerciseIndex: 6, content: "ddccc ccddc ddcdc dcdcd cddcc cddcc ccccd dddcd ddccc" },
                ],
            },
        },
    });

    // Lesson 5 - K, I
    const lesson5 = await prisma.lesson.create({
        data: {
            title: "Lesson 5 - K, I",
            exercises: {
                create: [
                    { exerciseIndex: 0, content: "kkkkkkkkkk" },
                    { exerciseIndex: 1, content: "k kk kkk kkkk kkk kk k" },
                    { exerciseIndex: 2, content: "iiiiiiiiii" },
                    { exerciseIndex: 3, content: "i ii iii iiii iii ii i" },
                    { exerciseIndex: 4, content: "kkk iii kkkk iiii kkkkk iiiii" },
                    { exerciseIndex: 5, content: "kkk kik iki kki iik iii kkii iikk kkki iiik" },
                    { exerciseIndex: 6, content: "kkiii iikki kkiki kikik ikkii ikkii iiiki kkkik kkiii" },
                ],
            },
        },
    });

    // Lesson 6 - H, N, M
    const lesson6 = await prisma.lesson.create({
        data: {
            title: "Lesson 6 - H, N, M",
            exercises: {
                create: [
                    { exerciseIndex: 0, content: "hhhhhhhhhh" },
                    { exerciseIndex: 1, content: "h hh hhh hhhh hhh hh h" },
                    { exerciseIndex: 2, content: "nnnnnnnnnn" },
                    { exerciseIndex: 3, content: "n nn nnn nnnn nnn nn n" },
                    { exerciseIndex: 4, content: "hhh nnn hhhh nnnn hhhhh nnnnn" },
                    { exerciseIndex: 5, content: "hhh hnh nhn hhn nnh nnn hhnn nnhh hhhn nnnh" },
                    { exerciseIndex: 6, content: "hhmmm mmhhm hhmhm hmhmh mhhmm mhhmm mmmmh hhhm hhmmm" },
                ],
            },
        },
    });

    // Lesson 7 - G, B, V
    const lesson7 = await prisma.lesson.create({
        data: {
            title: "Lesson 7 - G, B, V",
            exercises: {
                create: [
                    { exerciseIndex: 0, content: "gggggggggg" },
                    { exerciseIndex: 1, content: "g gg ggg gggg ggg gg g" },
                    { exerciseIndex: 2, content: "bbbbbbbbbb" },
                    { exerciseIndex: 3, content: "b bb bbb bbbb bbb bb b" },
                    { exerciseIndex: 4, content: "ggg bbb gggg bbbb ggggg bbbbb" },
                    { exerciseIndex: 5, content: "ggg gbg bgb ggb bbg bbb ggbb bbgg gggb bbbg" },
                    { exerciseIndex: 6, content: "ggbbb bbggb ggbgb gbgbg bggbb bggbb bbbbg gggbg ggbbb" },
                ],
            },
        },
    });

    // Create some sample progress records
    // Add completed exercises for first lesson
    const exercises1 = await prisma.exercise.findMany({
        where: { lessonId: lesson1.id }
    });

    // Create progress records for the first 6 exercises of lesson 1
    for (let i = 0; i < 6; i++) {
        await prisma.progress.create({
            data: {
                userId: user.id,
                lessonId: lesson1.id,
                exerciseId: exercises1[i].id,
                completed: true
            }
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });