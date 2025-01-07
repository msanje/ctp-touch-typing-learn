// prisma/seed.ts

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    // Lesson 1 - F, J
    await prisma.lesson.create({
        data: {
            title: "Lesson 1 - F, J",
            exercises: {
                create: [
                    { index: 0, content: "jjjjjjjjjj" },
                    { index: 1, content: "j jj jjj jjjj jjj jj j" },
                    { index: 2, content: "ffffffffff" },
                    { index: 3, content: "f ff fff ffff fff ff f" },
                    { index: 4, content: "jjj fff jjjj ffff jjjjj fffff" },
                    { index: 5, content: "jjj jfj fjf jjf ffj fff jjff ffjj jjjf fffj" },
                    { index: 6, content: "jjfff ffjjf jjfjf jfjfj fjjff fjjff ffffj jjjfj jjfff" },
                ],
            },
        },
    });

    // Lesson 2 - R, T
    await prisma.lesson.create({
        data: {
            title: "Lesson 2 - R, T",
            exercises: {
                create: [
                    { index: 0, content: "rrrrrrrrrr" },
                    { index: 1, content: "r rr rrr rrrr rrr rr r" },
                    { index: 2, content: "tttttttttt" },
                    { index: 3, content: "t tt ttt tttt ttt tt t" },
                    { index: 4, content: "rt rt rt rt rt rt rt rt rt rt" },
                    { index: 5, content: "rrr rtr trt rrt ttr ttt rrtt ttrr rrrt tttt" },
                    { index: 6, content: "rrttt ttrrt rrttr trtrt trrtt trrtt ttttr rrrtr rrttt" },
                ],
            },
        },
    });

    // Lesson 3 - U, Y
    await prisma.lesson.create({
        data: {
            title: "Lesson 3 - U, Y",
            exercises: {
                create: [
                    { index: 0, content: "uuuuuuuuuu" },
                    { index: 1, content: "u uu uuu uuuu uuu uu u" },
                    { index: 2, content: "yyyyyyyyyy" },
                    { index: 3, content: "y yy yyy yyyy yyy yy y" },
                    { index: 4, content: "uuu yyy uuuu yyyy uuuuu yyyyy" },
                    { index: 5, content: "uuu uyu yuy uuy yyu yyy uuyy yyuu uuuy yyyu" },
                    { index: 6, content: "uuyyy yyuuy uuyuy uyuyu yuuyy yuuyy yyyyu uuuyu uuyyy" },
                ],
            },
        },
    });

    // Lesson 4 - D, C, E
    await prisma.lesson.create({
        data: {
            title: "Lesson 4 - D, C, E",
            exercises: {
                create: [
                    { index: 0, content: "dddddddddd" },
                    { index: 1, content: "d dd ddd dddd ddd dd d" },
                    { index: 2, content: "cccccccccc" },
                    { index: 3, content: "c cc ccc cccc ccc cc c" },
                    { index: 4, content: "ddd ccc dddd cccc ddddd ccccc" },
                    { index: 5, content: "ddd dcd cdc ddc ccd ccc ddcc ccdd dddc cccd" },
                    { index: 6, content: "ddccc ccddc ddcdc dcdcd cddcc cddcc ccccd dddcd ddccc" },
                ],
            },
        },
    });

    // Lesson 5 - K, I
    await prisma.lesson.create({
        data: {
            title: "Lesson 5 - K, I",
            exercises: {
                create: [
                    { index: 0, content: "kkkkkkkkkk" },
                    { index: 1, content: "k kk kkk kkkk kkk kk k" },
                    { index: 2, content: "iiiiiiiiii" },
                    { index: 3, content: "i ii iii iiii iii ii i" },
                    { index: 4, content: "kkk iii kkkk iiii kkkkk iiiii" },
                    { index: 5, content: "kkk kik iki kki iik iii kkii iikk kkki iiik" },
                    { index: 6, content: "kkiii iikki kkiki kikik ikkii ikkii iiiki kkkik kkiii" },
                ],
            },
        },
    });

    // Lesson 6 - H, N, M
    await prisma.lesson.create({
        data: {
            title: "Lesson 6 - H, N, M",
            exercises: {
                create: [
                    { index: 0, content: "hhhhhhhhhh" },
                    { index: 1, content: "h hh hhh hhhh hhh hh h" },
                    { index: 2, content: "nnnnnnnnnn" },
                    { index: 3, content: "n nn nnn nnnn nnn nn n" },
                    { index: 4, content: "hhh nnn hhhh nnnn hhhhh nnnnn" },
                    { index: 5, content: "hhh hnh nhn hhn nnh nnn hhnn nnhh hhhn nnnh" },
                    { index: 6, content: "hhmmm mmhhm hhmhm hmhmh mhhmm mhhmm mmmmh hhhm hhmmm" },
                ],
            },
        },
    });

    // Lesson 7 - G, B, V
    await prisma.lesson.create({
        data: {
            title: "Lesson 7 - G, B, V",
            exercises: {
                create: [
                    { index: 0, content: "gggggggggg" },
                    { index: 1, content: "g gg ggg gggg ggg gg g" },
                    { index: 2, content: "bbbbbbbbbb" },
                    { index: 3, content: "b bb bbb bbbb bbb bb b" },
                    { index: 4, content: "ggg bbb gggg bbbb ggggg bbbbb" },
                    { index: 5, content: "ggg gbg bgb ggb bbg bbb ggbb bbgg gggb bbbg" },
                    { index: 6, content: "ggbbb bbggb ggbgb gbgbg bggbb bggbb bbbbg gggbg ggbbb" },
                ],
            },
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });