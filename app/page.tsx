import Image from 'next/image';
import Link from 'next/link';

// components
import PatientForm from '@/components/forms/PatientForm';

const Home = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <Image
        src="/assets/images/onboarding-img.webp"
        height={1000}
        width={1000}
        alt="patient"
        priority={true}
        className="side-img max-w-[50%]"
      />
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <Link href="/?admin=true" className="text-sky-600">
              Admin
            </Link>
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 Pulse Health
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
