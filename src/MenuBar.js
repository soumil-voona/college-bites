import React from 'react';

const MenuBar = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' }); // Adjusted to 'center' for less scrolling
    }
  };

  return (
    <div className='menuBar'>
      <div className="logo">
        <span className="logo-content">
          <a href='/' className='logoLink'>
            <svg xmlns="http://www.w3.org/2000/svg" width="65" height="64" viewBox="0 0 65 64" fill="none">
              <path d="M11.25 56.5V60C11.25 60.9917 10.9106 61.8229 10.2318 62.4937C9.55295 63.1646 8.71181 63.5 7.70833 63.5H4.16667C3.16319 63.5 2.32205 63.1646 1.64323 62.4937C0.96441 61.8229 0.625 60.9917 0.625 60V32L8.0625 11C8.41667 9.95 9.05122 9.10417 9.96615 8.4625C10.8811 7.82083 11.8993 7.5 13.0208 7.5H21.875V0.5H43.125V7.5H51.9792C53.1007 7.5 54.1189 7.82083 55.0339 8.4625C55.9488 9.10417 56.5833 9.95 56.9375 11L64.375 32V60C64.375 60.9917 64.0356 61.8229 63.3568 62.4937C62.6779 63.1646 61.8368 63.5 60.8333 63.5H57.2917C56.2882 63.5 55.447 63.1646 54.7682 62.4937C54.0894 61.8229 53.75 60.9917 53.75 60V56.5H11.25ZM10.5417 25H54.4583L50.7396 14.5H14.2604L10.5417 25ZM16.5625 46C18.0382 46 19.2925 45.4896 20.3255 44.4688C21.3585 43.4479 21.875 42.2083 21.875 40.75C21.875 39.2917 21.3585 38.0521 20.3255 37.0312C19.2925 36.0104 18.0382 35.5 16.5625 35.5C15.0868 35.5 13.8325 36.0104 12.7995 37.0312C11.7665 38.0521 11.25 39.2917 11.25 40.75C11.25 42.2083 11.7665 43.4479 12.7995 44.4688C13.8325 45.4896 15.0868 46 16.5625 46ZM48.4375 46C49.9132 46 51.1675 45.4896 52.2005 44.4688C53.2335 43.4479 53.75 42.2083 53.75 40.75C53.75 39.2917 53.2335 38.0521 52.2005 37.0312C51.1675 36.0104 49.9132 35.5 48.4375 35.5C46.9618 35.5 45.7075 36.0104 44.6745 37.0312C43.6415 38.0521 43.125 39.2917 43.125 40.75C43.125 42.2083 43.6415 43.4479 44.6745 44.4688C45.7075 45.4896 46.9618 46 48.4375 46ZM7.70833 49.5H57.2917V32H7.70833V49.5Z"/>
            </svg>
            College Bites
          </a>
          <div className='menu' onClick={() => scrollToSection('AboutUs')}>
            About Us
          </div>
          <div className='menu' onClick={() => scrollToSection('HowItWorks')}>
            How It Works
          </div>
          <div className='menu' onClick={() => scrollToSection('Information')}>
            Information
          </div>
          <a href='/login'>
            <div className='menu'>Login</div>
          </a>
          <a href='/register'>
            <div className='menu'>Register</div>
          </a>
        </span>
      </div>
    </div>
  );
};

export default MenuBar;
