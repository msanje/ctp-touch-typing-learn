import Image from "next/image";
import Link from "next/link";

const LearnComponent = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="text-center py-10">
        <div className="flex justify-center mb-6">
          <Image
            src="/keystream_logo.svg"
            width={200}
            height={200}
            alt="Keystream logo"
            className="object-contain"
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          Learn How to Touch Type
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Touch typing is all about the idea that each finger has its own area
          on the keyboard. Thanks to that fact, you can type without looking at
          the keys. Practice regularly, and your fingers will learn their
          location through muscle memory.
        </p>
      </div>

      {/* Typing Speed Section */}
      <section className="py-12 bg-white shadow-md rounded-lg mx-4 md:mx-0">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 text-center mb-6">
          Typing Speed
        </h2>
        <ul className="list-disc pl-6 space-y-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          <li>
            Do not rush when you just started learning. Speed up only when your
            fingers hit the right keys out of habit.
          </li>
          <li>
            Take your time when typing to avoid mistakes. The speed will pick up
            as you progress.
          </li>
          <li>Always scan the text a word or two in advance.</li>
          <li>
            If you&apos;re having trouble typing, use a keyboard test to
            determine if it&apos;s a software or hardware issue.
          </li>
          <li>
            Pass all typing lessons at Ratatype. It will help you get above the
            average typing speed.
          </li>
        </ul>
      </section>

      {/* Fingers Motion Section */}
      <section className="py-12 mx-4 md:mx-0">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 text-center mb-6">
          Fingers Motion
        </h2>
        <div className="max-w-3xl mx-auto space-y-4 text-lg md:text-xl text-gray-700">
          <p>
            Don&apos;t look at the keys when you type. Just slide your fingers
            around until they find the home row marking.
          </p>
          <p>
            Limit your hand and finger movement only to what is necessary to
            press a specific key. Keep your hands and fingers close to the base
            position.
          </p>
          <p>
            Pay attention to ring fingers and little fingers, since they are
            considerably underdeveloped.
          </p>
        </div>
      </section>

      {/* Home Row Position Section */}
      <section className="py-12 bg-white shadow-md rounded-lg mx-4 md:mx-0">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 text-center mb-6">
          Home Row Position
        </h2>

        <div className="flex flex-row justify-between max-w-2xl mx-auto mb-6">
          <div className="flex flex-row space-x-3">
            {["A", "S", "D", "F"].map((key) => (
              <button
                key={key}
                className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 text-gray-800 text-lg md:text-xl font-semibold rounded-xl shadow hover:bg-blue-200 active:scale-95 transition-all duration-150"
              >
                {key}
              </button>
            ))}
          </div>
          <div className="flex flex-row space-x-3">
            {["J", "K", "L", ";"].map((key) => (
              <button
                key={key}
                className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 text-gray-800 text-lg md:text-xl font-semibold rounded-xl shadow hover:bg-blue-200 active:scale-95 transition-all duration-150"
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-4 text-lg md:text-xl text-gray-700">
          <p>
            Curve your fingers a little and put them on the [A][S][D][F] and
            [J][K][L][;] keys, which are located in the middle row of the letter
            keys. This row is called the HOME ROW because you always start from
            these keys and always return to them.
          </p>
          <p>
            [F] and [J] keys under your index fingers should have a raised line
            on them to aid in finding these keys without looking.
          </p>
        </div>
      </section>

      {/* Sitting Posture Section */}
      <section className="py-12 mx-4 md:mx-0">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 text-center mb-6">
          Sitting Posture for Typing
        </h2>
        <ul className="list-disc pl-6 space-y-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          <li>Sit straight and remember to keep your back straight.</li>
          <li>Keep your elbows bent at the right angle.</li>
          <li>Face the screen with your head slightly tilted forward.</li>
          <li>
            Keep at least 45 - 70 cm of distance between your eyes and the
            screen.
          </li>
          <li>
            Expose the shoulder, arm, and wrist muscles to the least possible
            strain. The wrists can touch the tabletop in front of the keyboard.
            Never shift your body weight to the wrists by resting on them.
          </li>
        </ul>
      </section>

      {/* Take Care Section */}
      <section className="py-12 bg-white shadow-md rounded-lg mx-4 md:mx-0 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Take Care of Yourself
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Take a break if you feel distracted easily and are making a lot of
          mistakes. It&apos;s more productive to come back when you feel
          refreshed.
        </p>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
          It&apos;s Time to Get Some Practice
        </h2>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
          <Link href="/lessons">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md text-lg transition-colors duration-200">
              Start Learning
            </button>
          </Link>
          <Link href="/typing-test">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-md text-lg transition-colors duration-200">
              Test Your Speed
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LearnComponent;
