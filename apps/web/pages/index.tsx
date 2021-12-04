import { HiChevronLeft } from 'react-icons/hi';
import { SiDiscord } from 'react-icons/si';
import { IranVector } from '../components/Illustration/IranVector';
import MainLayout from '../components/Layout/MainLayout';
import Button from '../components/UI/Button/Button';

const Index = () => {
  return (
    <MainLayout>
      <main>
        <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="space-y-10 mb-10">
              <div className="mx-auto max-w-md px-4 sm:max-w-4xl sm:px-6 sm:text-center lg:px-0 lg:text-right lg:flex lg:items-center">
                <div className="lg:py-24">
                  <a
                    href="https://discord.gg/5eGecDjFpj"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-white bg-black rounded-full p-1 pl-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                  >
                    <span
                      className="px-3 py-0.5 text-xs font-semibold flex items-center space-x- leading-5 tracking-wide rounded-full"
                      style={{ backgroundColor: '#5865F2' }}
                    >
                      <SiDiscord className="ml-2" />
                      انجمن دیسکورد
                    </span>
                    <span className="mr-4 text-sm">
                      به دیسکورد ایران فاس بپیوندید
                    </span>
                    <HiChevronLeft
                      className="mr-2 w-5 h-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </a>
                  <h1 className="mt-4 text-4xl tracking-tight font-extrabold sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                    تمام پروژه های متن باز{' '}
                    <span className="text-primary-500">ایرانی</span>{' '}
                    <span className="">در یک جا</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-700 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است.
                  </p>
                  <div className="mt-10 sm:mt-12">
                    <div className="mt-3 sm:mt-0 sm:mr-3 space-x-3 space-x-reverse">
                      <Button.Primary href="/explore" size="lg">
                        برو به کاوش‌گر
                      </Button.Primary>
                      <Button.Outline href="/about" size="lg">
                        درمورد پروژه
                      </Button.Outline>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:relative my-auto">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                  <IranVector />
                  <div className="font-mono text-xl sm:text-2xl text-center lg:-mt-10">
                    Iran {'<3'} Open-Source Software
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More main page content here... */}
      </main>
    </MainLayout>
  );
};

export default Index;
