import { FOOTER_MENU } from '@/lib/constants';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className="border-t border-[#E4E4E4]">
      <div className="container flex gap-x-8 py-20">
        <div className="mr-36 flex w-64 flex-col items-center gap-y-11">
          <div className="relative h-7 w-[168px] overflow-hidden">
            <Image
              src="/vascomm-logo.png"
              alt="vascomm"
              fill
              className="object-contain object-center"
            />
          </div>
          <p className="text-center text-xs text-primary-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut commodo
            in vestibulum, sed dapibus tristique nullam.
          </p>
          <div className="flex items-center gap-x-6">
            <a href="#">
              <Facebook size={20} className="text-primary-blue" />
            </a>
            <a href="#">
              <Twitter size={20} className="text-primary-blue" />
            </a>
            <a href="#">
              <Instagram size={20} className="text-primary-blue" />
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg text-primary-black">Layanan</h3>
          <div className="mt-6 flex flex-col gap-y-3">
            {FOOTER_MENU.services.map((service) => (
              <a
                key={`footer-service-${service.label}`}
                href={service.url}
                className="text-sm text-primary-black"
              >
                {service.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg text-primary-black">Tentang Kami</h3>
          <div className="mt-6 flex flex-col gap-y-3">
            {FOOTER_MENU.about.map((abt) => (
              <a
                key={`footer-about-${abt.label}`}
                href={abt.url}
                className="text-sm text-primary-black"
              >
                {abt.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg text-primary-black">Mitra</h3>
          <div className="mt-6 flex flex-col gap-y-3">
            {FOOTER_MENU.partner.map((prt) => (
              <a
                key={`footer-partner-${prt.label}`}
                href={prt.url}
                className="text-sm text-primary-black"
              >
                {prt.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="h-6 bg-[#E4FDFF]" />
    </div>
  );
};

export default Footer;
