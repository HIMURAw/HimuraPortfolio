AOS.init();

//  Work experience cards

const experiencecards = document.querySelector(".experience-cards");
const exp = [
  {
    title: "Lua",
    cardImage: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg",
    place: "Various Projects",
    time: "(Ongoing)",
    desp: "<li>Otomasyon ve oyun mod araçları için betikler yazdım.</li><li>Yeniden kullanılabilir yardımcı modüller geliştirdim.</li>",
  },
  {
    title: "JavaScript",
    cardImage: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    place: "Freelance / Personal",
    time: "(Ongoing)",
    desp: "<li>Etkileşimli arayüzler ve tek sayfa uygulama özellikleri geliştirdim.</li><li>REST API entegrasyonları yaptım ve performansı optimize ettim.</li>",
  },
  {
    title: "Typescript",
    cardImage: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    place: "Open Source",
    time: "(Ongoing)",
    desp: "<li>JS kod tabanlarını TypeScript’e taşıdım.</li><li>Güçlü tipli, yeniden kullanılabilir bileşenler yazdım.</li>",
  },
  {
    title: "CSS",
    cardImage: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    place: "UI/UX Work",
    time: "(Ongoing)",
    desp: "<li>Flex ve Grid ile duyarlı yerleşimler oluşturdum.</li><li>Karanlık/Açık tema ve animasyonlar tasarladım.</li>",
  },
  {
    title: "HTML",
    cardImage: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    place: "Web Projects",
    time: "(Ongoing)",
    desp: "<li>Anlamsal ve erişilebilir sayfa yapıları kurdum.</li><li>SEO <dostu etiketler ve meta veriler uyguladım.</li>",
  },
  {
    title: "C#",
    cardImage: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    place: ".NET Sandbox",
    time: "(Ongoing)",
    desp: "<li>Küçük konsol ve masaüstü yardımcı programları geliştirdim.</li><li>OOP prensipleri ve LINQ pratikleri yaptım.</li>",
  },
];

const showCards2 = () => {
  let output = "";
  exp.forEach(
    ({ title, cardImage, place, time, desp }) =>
      (output += `        
    <div class="col gaap" data-aos="fade-up" data-aos-easing="linear" data-aos-delay="100" data-aos-duration="400"> 
      <div class="card card1">
        <img src="${cardImage}" class="featured-image"/>
        <article class="card-body">
          <header>
            <div class="title">
              <h3>${title}</h3>
            </div>
            <p class="meta">
              <span class="pre-heading">${place}</span><br>
              <span class="author">${time}</span>
            </p>
            <ol>
              ${desp}
            </ol>
          </header>
        </article>
      </div>
    </div>
      `)
  );
  experiencecards.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards2);

// Volunteership Cards

const volunteership = document.querySelector(".volunteership");
const volunteershipcards = [
  {
    title: "Komple Uygulamalı Web Geliştirme Eğitimi [2025]",
    cardImage: "https://raw.githubusercontent.com/HIMURAw/HIMURA-IMAGE/main/user.png",
    description:
      "Sıfırdan ileri seviyeye Fullstack Web Geliştirme: HTML, CSS, Bootstrap, JavaScript, React, ASP.NET Core ve API",
  },
];

const showCards = () => {
  let output = "";
  volunteershipcards.forEach(
    ({ title, cardImage, description }) =>
      (output += `        
      <div class="card volunteerCard" data-aos="fade-down" data-aos-easing="linear" data-aos-delay="100" data-aos-duration="600" style="height: 550px;width:400px">
      
      <img src="${cardImage}" height="250" width="65" class="card-img" style="border-radius:10px">
      <div class="content">
          <h2 class="volunteerTitle">${title}</h2><br>
          <p class="copy">${description}</p></div>
      
      </div>
      `)
  );
  volunteership.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards);

// Hackathon Section

const hackathonsection = document.querySelector(".hackathon-section");
const mentor = [
  {
    title: "QB-Core Geliştirici Mentorluğu",
    subtitle: "Mentor",
    image: "https://raw.githubusercontent.com/HIMURAw/HIMURA-IMAGE/main/user.png",
    desp: "FiveM QB-Core tabanlı sunucular için script geliştirme, refactor ve performans iyileştirme üzerine mentorluk.",
    href: "https://github.com/qbcore-framework",
  },
  {
    title: "Discord Platformu / Bot Desteği",
    subtitle: "Mentor",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/discord/discord-original.svg",
    desp: "Discord bot mimarisi, komut/olay yapısı, dağıtım ve ölçeklendirme konularında yönlendirme.",
    href: "https://discord.js.org/",
  },
  {
    title: "Socket.IO ile Gerçek Zamanlı Uygulamalar",
    subtitle: "Eğitmen",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
    desp: "Odalar/kanallar, canlı bildirimler ve performans odaklı Socket.IO mimarileri üzerine atölye.",
    href: "https://socket.io/",
  },
  {
    title: "Drizzle ORM ile Tip-Güvenli Veri Katmanı",
    subtitle: "Atölye",
    image: "https://raw.githubusercontent.com/HIMURAw/HIMURA-IMAGE/main/user.png",
    desp: "PostgreSQL/MySQL üzerinde Drizzle ORM ile tip-güvenli sorgular, migration ve repository desenleri.",
    href: "https://orm.drizzle.team/",
  },
  {
    title: "React & Node.js Tam Yığın Eğitimi",
    subtitle: "Eğitmen",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    desp: "React, Express.js, REST API, kimlik doğrulama ve dağıtım süreçlerini kapsayan uçtan uca eğitim.",
    href: "https://react.dev/",
  },
  {
    title: "Veritabanı Tasarımı ve Optimizasyon",
    subtitle: "Konuk",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    desp: "MySQL/PostgreSQL/MongoDB için indeksleme, sorgu optimizasyonu ve migration stratejileri.",
    href: "https://www.postgresql.org/",
  },
];

const showCards3 = () => {
  let output = "";
  mentor.forEach(
    ({ title, image, subtitle, desp, href }) =>
      (output += `  
      <div class="blog-slider__item swiper-slide">
        <div class="blog-slider__img">
            <img src="${image}" alt="">
        </div>
        <div class="blog-slider__content">
          <div class="blog-slider__title">${title}</div>
          <span class="blog-slider__code">${subtitle}</span>
          <div class="blog-slider__text">${desp}</div>
          <a href="${href}" class="blog-slider__button">Detaylar</a>   
        </div>
      </div>
      `)
  );
  hackathonsection.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards3);
