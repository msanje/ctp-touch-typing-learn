.
├── prisma
│   ├── deleteUser.ts
│   ├── migrations
│   │   ├── 20250610143732_add_progress_unique
│   │   │   └── migration.sql
│   │   ├── 20250624103350_add_updated_at_to_certificate
│   │   │   └── migration.sql
│   │   ├── 20250702114805_add_learning_goals
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   ├── schema.prisma
│   └── seed.mjs
├── public
│   ├── bullseye_gold.svg
│   ├── bullseye_gray.svg
│   ├── keystream_logo.svg
│   ├── Logo.webp
│   ├── sounds
│   │   ├── correct.mp3
│   │   ├── error.mp3
│   │   └── incorrect.mp3
│   ├── star_gold.svg
│   ├── star_gray.svg
│   ├── thunder_gold.svg
│   ├── thunder_gray.svg
│   └── timer.svg
├── README.md
├── src
│   ├── app
│   │   ├── admin
│   │   │   ├── lessons
│   │   │   │   ├── [id]
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   └── [...nextauth]
│   │   │   │       ├── options.ts
│   │   │   │       └── route.ts
│   │   │   ├── certificate
│   │   │   │   ├── buy
│   │   │   │   │   └── route.ts
│   │   │   │   ├── create
│   │   │   │   │   └── route.ts
│   │   │   │   ├── get
│   │   │   │   │   └── route.ts
│   │   │   │   └── status
│   │   │   │       └── route.ts
│   │   │   ├── learninggoals
│   │   │   │   └── route.ts
│   │   │   ├── lessons
│   │   │   │   ├── [lessonId]
│   │   │   │   │   └── [exercisesId]
│   │   │   │   │       └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── progress
│   │   │   │   ├── completion
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── signup
│   │   │   │   └── route.ts
│   │   │   ├── typing-test
│   │   │   │   └── certificate
│   │   │   │       └── route.ts
│   │   │   ├── updateuser
│   │   │   │   └── route.ts
│   │   │   ├── user
│   │   │   │   └── route.ts
│   │   │   ├── userid
│   │   │   │   └── route.ts
│   │   │   └── wpm
│   │   │       └── route.ts
│   │   ├── certificate
│   │   │   └── page.tsx
│   │   ├── complete
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── learn
│   │   │   └── page.tsx
│   │   ├── lessons
│   │   │   ├── [lessonId]
│   │   │   │   └── [exerciseId]
│   │   │   │       └── page.tsx
│   │   │   └── page.tsx
│   │   ├── login
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   ├── profile
│   │   │   └── page.tsx
│   │   ├── progress
│   │   │   └── page.tsx
│   │   ├── settings
│   │   │   └── page.tsx
│   │   ├── signin
│   │   │   └── page.tsx
│   │   ├── signout
│   │   │   └── page.tsx
│   │   ├── signup
│   │   │   └── page.tsx
│   │   ├── test
│   │   │   └── page.tsx
│   │   ├── typing-test
│   │   │   └── page.tsx
│   │   └── typing-test-certificate
│   │       └── page.tsx
│   ├── components
│   │   ├── AdminLessonForm.tsx
│   │   ├── AuthModal.tsx
│   │   ├── AuthModalWrapper.tsx
│   │   ├── AuthProvider.tsx
│   │   ├── Certificate.tsx
│   │   ├── Complete.tsx
│   │   ├── ExerciseItem.tsx
│   │   ├── ExercisePage.tsx
│   │   ├── KeyboardComponent.tsx
│   │   ├── KeyboardStyled.tsx
│   │   ├── LearnComponent.tsx
│   │   ├── LessonCard.tsx
│   │   ├── Lessons.tsx
│   │   ├── LessonsComponent.tsx
│   │   ├── LessonsList.tsx
│   │   ├── MyLearningPage.tsx
│   │   ├── Navbar.tsx
│   │   ├── Profile.tsx
│   │   ├── Progress.tsx
│   │   ├── ProgressOverview.tsx
│   │   ├── ResultsModal.tsx
│   │   ├── Settings.tsx
│   │   ├── SignInForm.tsx
│   │   ├── SignUpForm.tsx
│   │   ├── SoundContext.tsx
│   │   ├── SoundContextWrapper.tsx
│   │   ├── TestComponent.tsx
│   │   ├── TypingTest.tsx
│   │   ├── TypingTestBasic.tsx
│   │   ├── TypingTestCertificate.tsx
│   │   ├── ui
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── dropdown-menu.tsx
│   │   ├── UserDropdown.tsx
│   │   └── ViewLessons.tsx
│   ├── helpers
│   │   ├── fetchUserId.ts
│   │   ├── getTypingLevel.ts
│   │   ├── lessons.ts
│   │   ├── paragraph.ts
│   │   └── wpm.ts
│   ├── hooks
│   │   └── useAuthModal.ts
│   ├── levelStyles.ts
│   ├── lib
│   │   ├── index.ts
│   │   └── utils.ts
│   ├── types
│   │   ├── GlobalTypes.ts
│   │   └── html2pdf.js.d.ts
│   └── utils
│       └── lessonNavigator.ts
├── structure.md
├── tailwind.config.ts
└── tsconfig.json

57 directories, 120 files
