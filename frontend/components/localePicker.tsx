import Image from 'next/image';
import Link from 'next/link';

import fiFlag from 'img/fi.svg';
import enFlag from 'img/gb.svg';

const locales = [
  {
    locale: 'fi',
    image: fiFlag,
    alt: 'Finnish/Suomi',
  },
  {
    locale: 'en',
    image: enFlag,
    alt: 'English',
  },
];

const LocalePicker = () => (
  <div className="locale-container">
    <style jsx>{`
      .locale-container {
        display: inline-flex;
      }

      .locale-flag {
        cursor: pointer;
        display: inline-flex;
      }

      .locale-flag:not(:last-child) {
        margin-right: 0.25rem;
      }
    `}</style>

    {locales.map((locale) => (
      <span key={locale.locale} className="locale-flag" title={locale.alt}>
        <Link href="/" locale={locale.locale}>
          <Image src={locale.image} alt={locale.alt} width={30} />
        </Link>
      </span>
    ))}
  </div>
);

export default LocalePicker;
