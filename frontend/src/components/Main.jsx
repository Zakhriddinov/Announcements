import banner from "../assets/images/banner.jpg";

const Main = () => {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-2  xl:grid-cols-2 md:grid-cols-1 mt-16 md:mt-8 gap-8 md:gap-1 mb-32 md:mb-8">
      <img
        src={banner}
        alt="title"
        className="rounded-lg shadow-lg md:shadow-none"
      />
      <div>
        <h3 className="font-mono font-bold text-3xl md:text-sm md:text-center md:mt-4">
          O'z e'loningizni joylashtiring
        </h3>
        <p className="font-mono font-medium text-xl text-gray-400 mt-8 md:text-xs md:text-center md:mt-4">
          Bu sayt orqali siz o'z e'lonlaringizni bepulga joylashtirib
          borishingiz mumkin bo'ladi. Istalgan kategoriyangizni tanlang va
          o'zingiz xohlagan e'loningizni joylashtiring
        </p>
      </div>
    </section>
  );
};

export default Main;
