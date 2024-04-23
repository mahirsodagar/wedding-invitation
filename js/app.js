const storage = (table) => {
  if (!localStorage.getItem(table)) {
    localStorage.setItem(table, JSON.stringify({}));
  }

  const get = (key = null) => {
    let data = JSON.parse(localStorage.getItem(table));
    return key ? data[key] : data;
  };

  const set = (key, value) => {
    let storage = get();
    storage[key] = value;
    localStorage.setItem(table, JSON.stringify(storage));
  };

  const unset = (key) => {
    let storage = get();
    delete storage[key];
    localStorage.setItem(table, JSON.stringify(storage));
  };

  const has = (key) => Object.keys(get()).includes(key);

  return {
    get: get,
    set: set,
    unset: unset,
    has: has,
  };
};

const util = (() => {
  const opacity = (nama) => {
    let nm = document.getElementById(nama);
    let op = parseInt(nm.style.opacity);
    let clear = null;

    clear = setInterval(() => {
      if (op >= 0) {
        nm.style.opacity = op.toString();
        op -= 0.025;
      } else {
        clearInterval(clear);
        clear = null;
        nm.remove();
        return;
      }
    }, 10);
  };

  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const translation = (btn, msg = "Childbirth", timeout = 1500) => {
    navigator.clipboard.writeText(btn.getAttribute("data-nomer"));

    let tmp = btn.innerHTML;
    btn.innerHTML = msg;
    btn.disabled = true;

    let clear = null;
    clear = setTimeout(() => {
      btn.innerHTML = tmp;
      btn.disabled = false;
      btn.focus();

      clearTimeout(clear);
      clear = null;
      return;
    }, timeout);
  };

  const timer = () => {
    let countDownDate = new Date(
      document
        .getElementById("time-display")
        .getAttribute("time-data")
        .replace(" ", "T")
    );
    console.log(countDownDate);
    setInterval(() => {
      let distance = Math.abs(countDownDate - new Date().getTime());

      document.getElementById("day").innerText = Math.floor(
        distance / (1000 * 60 * 60 * 24)
      );
      document.getElementById("hours").innerText = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      document.getElementById("minutes").innerText = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      document.getElementById("seconds").innerText = Math.floor(
        (distance % (1000 * 60)) / 1000
      );
    }, 1000);
  };

  const play = (btn) => {
    if (btn.getAttribute("data-status") !== "true") {
      btn.setAttribute("data-status", "true");
      audio.play();
      btn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
    } else {
      btn.setAttribute("data-status", "false");
      audio.pause();
      btn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    }
  };

  const modal = (img) => {
    document.getElementById("show-modal-image").src = img.src;
    new bootstrap.Modal("#modal-image").show();
  };

  const animation = async () => {
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    let skew = 1;

    let randomInRange = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    (async function frame() {
      const timeLeft = animationEnd - Date.now();
      const ticks = Math.max(200, 500 * (timeLeft / duration));

      skew = Math.max(0.8, skew - 0.001);

      await confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: ticks,
        origin: {
          x: Math.random(),
          y: Math.random() * skew - 0.2,
        },
        colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
        shapes: ["heart"],
        gravity: randomInRange(0.5, 1),
        scalar: randomInRange(1, 2),
        drift: randomInRange(-0.5, 0.5),
      });

      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const open = async (lang) => {
    document.querySelector("body").style.overflowY = "scroll";
    AOS.init();
    audio.play();

    opacity("welcome");
    document.getElementById("music-button").style.display = "block";
    timer();

    await confetti({
      origin: { y: 0.8 },
      zIndex: 1057,
    });
    await animation();
    if (lang === "GUJ") {
      document.getElementById("weddingTitle").innerHTML = "લગ્નનું આમંત્રણ";
      document.getElementById("brideName").innerHTML = "નવાઝ <br>&<br> ફલકનાઝ";
      document.getElementById("saveDate").innerHTML =
        "તારીખ સાચવવા માટે અહીં ક્લિક કરો";
      document.getElementById("dateTitle").innerHTML = "રવિવાર, 19 મે, 2024";
      document.getElementById("dateTitleMuslim").innerHTML =
        "રવિવાર, 10 જિલકાદ, 1445";
      document.getElementById("salamTitle").innerHTML =
        "અસલામુઅલૈકુમ વરહમતુલ્લાહી વબરકાતુહુ";
      document.getElementById("respectTitle").innerHTML =
        "બધા યોગ્ય આદર સાથે. અમે તમને અને તમારા પરિવારને આમંત્રિત કરીએ છીએ. કૃપા કરીને અમારા લગ્ન પ્રસંગમાં હાજરી આપજો:";
      document.getElementById("sonName").innerHTML = "નવાઝ વોરા";
      // document.getElementById('sonOf').innerHTML = 'નો પુત્ર';
      document.getElementById("sonFatherName").innerHTML = "મોહમ્મદયાસીન વોરા";
      document.getElementById("daughterName").innerHTML = "ફલકનાઝ સોદાગર";
      document.getElementById("daughterFatherName").innerHTML =
        "સબ્બીરભાઈ સોદાગર";
      document.getElementById(
        "saidTitle"
      ).innerHTML = `અલ્લાહ સુબાનાહુ વા તા'આલા નુ ઇર્શાદ છે કે`;
      document.getElementById(
        "ayat"
      ).innerHTML = `અને તેની નિશાનીઓમાં એ છે કે તેણે તમારા માટે તમારામાંથી જોડી બનાવી, જેથી તમે તેમનામાં શાંતિ મેળવી શકો. અને તેણે તમારી વચ્ચે પ્રેમ અને દયા મૂકી. ખરેખર, આમાં વિચારનારા લોકો માટે ઘણી નિશાનીઓ છે.`;
      document.getElementById("ayat21").innerHTML = `સુરહ અર-રૂમ: આયત ૨૧`;
      document.getElementById("eventTimeTitle").innerHTML = `પ્રસંગનો સમય`;
      document.getElementById("dayTitle").innerHTML = `દિવસ`;
      document.getElementById("hoursTitle").innerHTML = `કલાક`;
      document.getElementById("minutesTitle").innerHTML = `મિનિટ`;
      document.getElementById("secondsTitle").innerHTML = `સેકન્ડ`;
      document.getElementById(
        "organizeEventTitle"
      ).innerHTML = `અલ્લાહ સુબાનાહુ વ તઆલાની દયા ઈચ્છાથી અમે ઇવેન્ટનું આયોજન કરીશું:`;
      document.getElementById("startAt").innerHTML = `લગ્ન શરૂ થવાનો સમય`;
      document.getElementById(
        "lookAtGoogle"
      ).innerHTML = `ગૂગલ મેપ્સ માં લોકેશન જુઓ`;
      document.getElementById(
        "location"
      ).innerHTML = `મેમણ જમાતખાના, વોરા ચોક, ઉના`;
      document.getElementById(
        "greatingTitle"
      ).innerHTML = `અમને તમારો સાથ આવકાર કરવાનું અમારું સૌભાગ્ય અને સુખ હશે અને તમારી હાજરી અમારા માટે ખરેખર આનંદની વાત હશે.`;
      document.getElementById(
        "returnSalam"
      ).innerHTML = `વાલૈકુમસ્સલામ વરહમતુલ્લાહી વબરકાતુહુ`;
    }
  };

  return {
    open: open,
    modal: modal,
    play: play,
    translation: translation,
    escapeHtml: escapeHtml,
    opacity: opacity,
  };
})();

const progress = (() => {
  const assets = document.querySelectorAll("img");
  const info = document.getElementById("progress-info");
  const bar = document.getElementById("bar");

  let total = assets.length;
  let loaded = 0;

  const progress = () => {
    loaded += 1;

    bar.style.width = Math.min((loaded / total) * 100, 100).toString() + "%";
    info.innerText = `Loading assets (${loaded}/${total}) [${parseInt(
      bar.style.width
    ).toFixed(0)}%]`;

    if (loaded == total) {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }

      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      window.scrollTo(0, 0);

      util.opacity("loading");
    }
  };

  assets.forEach((asset) => {
    if (asset.complete && asset.naturalWidth !== 0) {
      progress();
    } else {
      asset.addEventListener("load", () => {
        progress();
      });
    }
  });
})();

const audio = (() => {
  let audio = null;

  const singleton = () => {
    if (!audio) {
      audio = new Audio();
      audio.src = document
        .getElementById("music-button")
        .getAttribute("data-url");
      audio.load();
      audio.currentTime = 0;
      audio.autoplay = true;
      audio.muted = false;
      audio.loop = true;
      audio.volume = 1;
    }

    return audio;
  };

  return {
    play: () => singleton().play(),
    pause: () => singleton().pause(),
  };
})();
