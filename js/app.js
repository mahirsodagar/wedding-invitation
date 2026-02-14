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

    // Use dynamic data if available, otherwise fall back to static
    const data = window.weddingData || {};

    if (lang === "GUJ") {
      document.getElementById("weddingTitle").innerHTML = "લગ્નનું આમંત્રણ";

      const groomGuj = data.groomGuj || "";
      const brideGuj = data.brideGuj || "";
      document.getElementById("brideName").innerHTML = `${groomGuj} <br>&<br> ${brideGuj}`;

      document.getElementById("saveDate").innerHTML =
        "તારીખ સાચવવા માટે અહીં ક્લિક કરો";
      // Date logic - if we have it
      document.getElementById("dateTitle").innerHTML = "રવિવાર, 19 મે, 2024"; // Keep static or formatting logic needed? 
      // The user didn't ask for dynamic date translation, but we can try if we want. 
      // For now, let's stick to names as requested.

      document.getElementById("dateTitleMuslim").innerHTML = data.muslimDate || "રવિવાર, 10 જિલકાદ, 1445"; // Use muslim date from params if there

      document.getElementById("salamTitle").innerHTML =
        "અસલામુઅલૈકુમ વરહમતુલ્લાહી વબરકાતુહુ";
      document.getElementById("respectTitle").innerHTML =
        "બધા યોગ્ય આદર સાથે. અમે તમને અને તમારા પરિવારને આમંત્રિત કરીએ છીએ. કૃપા કરીને અમારા લગ્ન પ્રસંગમાં હાજરી આપજો:";

      document.getElementById("sonName").innerHTML = data.groomGuj ? `${data.groomGuj}` : ""; // removed "Vora" hardcode if dynamic
      // document.getElementById('sonOf').innerHTML = 'નો પુત્ર';
      document.getElementById("sonFatherName").innerHTML = data.groomFatherGuj || "";
      document.getElementById("daughterName").innerHTML = data.brideGuj ? `${data.brideGuj}` : ""; // removed "Sodagar" hardcode if dynamic
      document.getElementById("daughterFatherName").innerHTML = data.brideFatherGuj || "";

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
      ).innerHTML = data.venueGuj || `મેમણ જમાતખાના, વોરા ચોક, ઉના`;
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

const appLogic = (() => {
  const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const changeTheme = (theme) => {
    if (!theme || theme === 'default') {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', theme);
    }

    // Update radio button if it matches (for when populated from URL)
    // Check if we are in form mode (radio buttons exist)
    const radio = document.querySelector(`input[name="themeOption"][value="${theme}"]`);
    if (radio) radio.checked = true;
  };

  const populateData = (data) => {
    // Store data globally for util.open to access
    window.weddingData = data;

    // Apply Theme
    if (data.theme) {
      changeTheme(data.theme);
    } else {
      changeTheme('default');
    }

    if (data.groom && data.bride) {
      document.getElementById('brideName').innerHTML = `${data.groom} & ${data.bride}`;
      document.getElementById('sonName').innerText = `${data.groom}`;
      document.getElementById('daughterName').innerText = `${data.bride}`;

      // Override names if full names are provided or just use first names
      document.getElementById('sonName').innerText = data.groom;
      document.getElementById('daughterName').innerText = data.bride;
    }

    if (data.date) {
      const dateFormatted = formatDate(data.date);
      document.getElementById('dateTitle').innerText = dateFormatted;

      if (data.time) {
        // specific time format for display if needed
        const [hours, minutes] = data.time.split(':');
        const timeFormatted = new Date(0, 0, 0, hours, minutes).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        // document.querySelector('#startAt + p').innerText = timeFormatted; // need ID for this
      }
    }

    if (data.muslimDate) {
      document.getElementById('dateTitleMuslim').innerText = data.muslimDate;
    }

    if (data.groomFather) {
      document.getElementById('sonFatherName').innerText = data.groomFather;
    }

    if (data.brideFather) {
      document.getElementById('daughterFatherName').innerText = data.brideFather;
    }

    if (data.venue) {
      document.getElementById('location').innerText = data.venue;
    }

    if (data.mapLink) {
      // Find the anchor tag with the map link
      const mapBtn = document.getElementById('lookAtGoogle').closest('a');
      if (mapBtn) mapBtn.href = data.mapLink;
    }

    // Background Image
    if (data.bg) {
      // Update Main Image
      const mainImg = document.querySelector('#invitation-content .img-crop img');
      if (mainImg) mainImg.src = data.bg;

      // Update Modal Image
      const modalImg = document.getElementById('show-modal-image');
      if (modalImg) modalImg.src = data.bg;

      // Update Loading/Welcome Image if exists
      const welcomeImg = document.querySelector('.loading-page .img-crop img');
      if (welcomeImg) welcomeImg.src = data.bg;
    }

    // Character Images
    if (data.groomImg) {
      const groomImgEl = document.getElementById('groomDisplayImg');
      if (groomImgEl) groomImgEl.src = data.groomImg;
    }
    if (data.brideImg) {
      const brideImgEl = document.getElementById('brideDisplayImg');
      if (brideImgEl) brideImgEl.src = data.brideImg;
    }

    if (data.music) {
      const musicBtn = document.getElementById('music-button');
      if (musicBtn) {
        musicBtn.setAttribute('data-url', data.music);

        // Verify if we need to reload audio source? 
        // Audio module reads it on first click. 
        // If user visited, clicked (loaded), then changed url via params (new link), 
        // the singleton might behave unexpectedly if not reset.
        // But for now let's assume page reload on new link visit.
      }
    }

    // Update "Wedding start at" time if possible. 
    if (data.time) {
      const startAtTitle = document.getElementById('startAt');
      if (startAtTitle && startAtTitle.nextElementSibling) {
        const [hours, minutes] = data.time.split(':');
        const timeFormatted = new Date(0, 0, 0, hours, minutes).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        startAtTitle.nextElementSibling.innerText = timeFormatted;
      }
    }
  };

  const translateToGujarati = async (text) => {
    if (!text) return "";
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=gu&dt=t&q=${encodeURIComponent(text)}`;
      const res = await fetch(url);
      const data = await res.json();
      return data[0].map(item => item[0]).join('');
    } catch (e) {
      console.error("Translation failed", e);
      return "";
    }
  };

  const toggleLanguageFields = () => {
    const lang = document.querySelector('input[name="langOption"]:checked').value;
    const gujFields = document.querySelectorAll('.guj-field');
    const englishIds = ['groomNameInput', 'brideNameInput', 'groomFatherInput', 'brideFatherInput', 'venueInput'];

    englishIds.forEach(id => {
      const el = document.getElementById(id);
      const label = document.querySelector(`label[for="${id}"]`);
      if (lang === 'gujarati') {
        if (el) el.classList.add('d-none');
        if (label) label.classList.add('d-none');
      } else {
        if (el) el.classList.remove('d-none');
        if (label) label.classList.remove('d-none');
      }
    });

    if (lang === 'english') {
      gujFields.forEach(el => el.classList.add('d-none'));
    } else {
      // Both or Gujarati
      gujFields.forEach(el => el.classList.remove('d-none'));
    }
  };

  let previewAudio = null;
  let previewTimeout = null;

  const previewMusic = (url) => {
    // Stop existing preview
    if (previewAudio) {
      previewAudio.pause();
      previewAudio.currentTime = 0;
    }
    if (previewTimeout) {
      clearTimeout(previewTimeout);
      previewTimeout = null;
    }

    if (url) {
      previewAudio = new Audio(url);
      previewAudio.play().catch(e => console.error("Preview play failed", e));

      // Stop after 5 seconds
      previewTimeout = setTimeout(() => {
        if (previewAudio) {
          previewAudio.pause();
          previewAudio.currentTime = 0;
        }
      }, 10000);
    }
  };

  const autoTranslate = async (sourceId, targetId) => {
    const source = document.getElementById(sourceId);
    const target = document.getElementById(targetId);
    const lang = document.querySelector('input[name="langOption"]:checked').value;

    if (lang === 'both' && source && target) {
      const text = source.value;
      if (text) {
        const translated = await translateToGujarati(text);
        target.value = translated;
      }
    }
  };

  const generateInvitation = () => {
    const lang = document.querySelector('input[name="langOption"]:checked').value;
    const theme = document.querySelector('input[name="themeOption"]:checked').value;
    const music = document.querySelector('input[name="musicOption"]:checked').value;
    const bg = document.querySelector('input[name="bgOption"]:checked').value;

    // Check if character options exist (might not be present if HTML not updated or user on old cached version?)
    // But we updated HTML.
    const groomImgInput = document.querySelector('input[name="groomImgOption"]:checked');
    const brideImgInput = document.querySelector('input[name="brideImgOption"]:checked');
    const groomImg = groomImgInput ? groomImgInput.value : './assets/images/cowo.png'; // Fallback
    const brideImg = brideImgInput ? brideImgInput.value : './assets/images/cewe.png'; // Fallback

    let groom, bride, groomFather, brideFather, venue;

    if (lang === 'gujarati') {
      groom = "";
      bride = "";
      groomFather = "";
      brideFather = "";
      venue = "";
    } else {
      groom = document.getElementById('groomNameInput').value;
      bride = document.getElementById('brideNameInput').value;
      groomFather = document.getElementById('groomFatherInput').value;
      brideFather = document.getElementById('brideFatherInput').value;
      venue = document.getElementById('venueInput').value;
    }

    const date = document.getElementById('dateInput').value;
    const muslimDate = document.getElementById('muslimDateInput').value;
    const time = document.getElementById('timeInput').value;
    const mapLink = document.getElementById('mapLinkInput').value;

    // Gujarati Inputs
    const groomGuj = document.getElementById('groomNameGujInput').value;
    const brideGuj = document.getElementById('brideNameGujInput').value;
    const groomFatherGuj = document.getElementById('groomFatherGujInput').value;
    const brideFatherGuj = document.getElementById('brideFatherGujInput').value;
    const venueGuj = document.getElementById('venueGujInput').value;

    // Validation
    if (lang !== 'gujarati') {
      if (!groom || !bride || !date || !time) {
        alert('Please fill in all required fields (Groom, Bride, Date, Time, Venue).');
        return;
      }
    } else {
      // If Gujarati only, validate Gujarati fields?
      if (!groomGuj || !brideGuj || !date || !time) {
        alert('કૃપા કરીને બધા જરૂરી ખાના ભરો (દુલ્હા, દુલ્હન, તરિખ, સમય, જગ્યા).');
        return;
      }
    }

    const params = new URLSearchParams({
      groom,
      bride,
      groomFather,
      brideFather,
      date,
      muslimDate,
      time,
      venue,
      mapLink,
      theme,
      music,
      bg,
      groomImg,
      brideImg,
      // Add Gujarati Params if present
      ...(groomGuj && { groomGuj }),
      ...(brideGuj && { brideGuj }),
      ...(groomFatherGuj && { groomFatherGuj }),
      ...(brideFatherGuj && { brideFatherGuj }),
      ...(venueGuj && { venueGuj }),
    });

    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${params.toString()}`;

    window.history.pushState({ path: newUrl }, '', newUrl);

    init();

    // Explicitly ensure welcome screen is shown
    const welcomePage = document.getElementById('welcome');
    if (welcomePage) {
      welcomePage.style.display = 'block';
      welcomePage.style.opacity = '1';
      // Ensure body overflow is hidden so they can't scroll yet
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-theme', theme); // Ensure theme is applied immediately
      // Also scroll to top
      window.scrollTo(0, 0);
    }
  };

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const init = () => {
    const params = getUrlParams();
    const formSection = document.getElementById('generation-form');
    const invitationContent = document.getElementById('invitation-content');

    // Check if we have ANY data to show invitation
    const hasData = (params.groom && params.bride) || (params.groomGuj && params.brideGuj);

    if (hasData) {
      formSection.classList.add('d-none');
      invitationContent.style.display = 'block';
      populateData(params);

      const hasGujaratiData = params.groomGuj || params.brideGuj;
      const gujButton = document.querySelector('button[onclick="util.open(\'GUJ\')"]');
      if (gujButton) {
        gujButton.style.display = hasGujaratiData ? 'inline-block' : 'none';
      }

    } else {
      // Form Mode
      formSection.style.display = 'flex';
      invitationContent.style.display = 'none';

      document.getElementById('welcome').style.display = 'none';
      document.getElementById('music-button').style.display = 'none';

      document.body.style.overflowY = 'scroll';

      setupEventListeners();

      // Force default theme or keep what we have? 
      // init() is called on page load. 
      // If URL has no params, we are in create mode.
      // We should probably rely on the checked radio button default which is 'default'.
      // But changeTheme('default') ensures the body attribute is clean.
      // And if there's a theme param (unlikely in create mode but possible?)
      if (params.theme) {
        changeTheme(params.theme);
      } else {
        changeTheme('default');
      }
    }
  };

  const setupEventListeners = () => {
    const dateInput = document.getElementById('dateInput');
    const muslimDateInput = document.getElementById('muslimDateInput');

    if (dateInput && muslimDateInput) {
      dateInput.addEventListener('change', (e) => {
        if (e.target.value) {
          // Create date from YYYY-MM-DD without timezone offset issues
          const [year, month, day] = e.target.value.split('-').map(Number);
          const date = new Date(year, month - 1, day);

          const hijriDateWithDay = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }).format(date);

          // Remove "AH" if present and trim
          muslimDateInput.value = hijriDateWithDay.replace(/AH|Ah/g, '').trim();
        }
      });
    }

    // Auto translate listeners
    const pairs = [
      ['groomNameInput', 'groomNameGujInput'],
      ['brideNameInput', 'brideNameGujInput'],
      ['groomFatherInput', 'groomFatherGujInput'],
      ['brideFatherInput', 'brideFatherGujInput'],
      ['venueInput', 'venueGujInput']
    ];

    pairs.forEach(([eng, guj]) => {
      const engEl = document.getElementById(eng);
      if (engEl) {
        engEl.addEventListener('blur', () => autoTranslate(eng, guj));
      }
    });
  };

  return {
    generateInvitation,
    copyLink,
    init,
    toggleLanguageFields,
    changeTheme,
    previewMusic
  };
})();

window.addEventListener('load', () => {
  appLogic.init();
});
