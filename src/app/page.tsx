import Image from 'next/image';
import AlmaLogo from '../../public/alma-logo.png';
import HeroGreenCircles from '../../public/hero-green-circles.png';
import { MainForm } from '@/components/Home/MainForm';

export default function Home() {
  return (
    <div className="mb-20">
      <div
        className="bg-[#D4D99B] bg-center"
        style={{
          backgroundImage: `url("${HeroGreenCircles.src}")`,
          backgroundPosition: 'left center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="mx-auto flex px-8 py-10 lg:max-w-5xl lg:pb-28 lg:pt-20">
          <div className="lg:pl-[220px]">
            <Image className="mb-4 w-10 lg:mb-10 lg:w-20" src={AlmaLogo} alt="alma-logo" />

            <h1 className="text-balance text-xl font-extrabold leading-tight lg:text-5xl">
              Get An Assessment Of Your Immigration Case
            </h1>
          </div>
        </div>
      </div>

      <MainForm />
    </div>
  );
}
