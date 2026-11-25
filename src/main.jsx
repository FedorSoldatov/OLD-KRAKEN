import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Crosshair, Menu, Radio, X } from 'lucide-react';
import './styles.css';

const zones = [
  { tag: 'DECK 01', name: 'COMMAND DECK', meta: '30 PC · 360 Hz · RTX 5070', seats: '12 свободно', color: 'cyan', image: '/command-deck.png', description: 'Основная палуба клуба: быстрые мониторы, мощное железо и достаточно пространства для долгих командных сессий.' },
  { tag: 'DECK 02', name: 'CAPTAIN’S CABIN', meta: 'PS5 Pro · 65″ OLED · 4 места', seats: '03 свободно', color: 'copper', image: '/captains-cabin.png', description: 'Закрытая каюта для своей команды. Большой OLED-экран, консольный комфорт и морская атмосфера без посторонних.' },
  { tag: 'DECK 03', name: 'THE HOLD', meta: 'Bootcamp · 10 PC · отдельный вход', seats: 'вся зона', color: 'cyan', image: '/gaming-port-setups.png', description: 'Отдельный отсек для bootcamp, тренировок и турниров. Десять станций, личный вход и максимум концентрации.' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [booked, setBooked] = useState(false);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return <main>
    <header className="topbar">
      <button className="brand" onClick={() => scrollTo('home')} aria-label="На главную"><img src="/old-kraken-logo.png" alt="Old Kraken"/><span>OLD KRAKEN</span></button>
      <nav className={menuOpen ? 'open' : ''}>
        <button onClick={() => scrollTo('club')}>КЛУБ</button><button onClick={() => scrollTo('zones')}>ЖЕЛЕЗО</button><button onClick={() => scrollTo('prices')}>ЦЕНЫ</button><button onClick={() => scrollTo('offers')}>АКЦИИ</button>
      </nav>
      <button className="reserve mini" onClick={() => scrollTo('reserve')}>ЗАБРОНИРОВАТЬ <ArrowUpRight size={16}/></button>
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню">{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <section id="home" className="hero">
      <div className="scanlines"/><div className="hero-copy">
        <p className="eyebrow"><Radio size={14}/> PORT CHANNEL / 04 · BREST</p>
        <h1 className="hero-title" aria-label="Old Kraken"><span className="old-word">OLD</span><b className="kraken-word">KRAKEN</b></h1>
        <p className="intro">ТВОЯ ТЕРРИТОРИЯ В ЗАБРОШЕННОМ ПОРТУ.<br/><em>ПОДКЛЮЧАЙСЯ К ГЛУБИНЕ.</em></p>
        <div className="hero-actions"><button className="reserve" onClick={() => scrollTo('reserve')}>ВЫБРАТЬ МЕСТО <ArrowUpRight size={18}/></button><span className="availability"><i/> 18 МЕСТ ДОСТУПНО СЕЙЧАС</span></div>
      </div>
      <img className="hero-kraken" src="/kraken-controller-tentacles.png" alt="Щупальца кракена держат геймпад"/>
      <aside className="hero-signal"><span>DEEPWATER</span><b>ИГРАЙ ГЛУБЖЕ.<br/>БЕЗ ЛИШНЕГО ШУМА.</b></aside>
      <div className="hero-card"><span className="play-dot">▶</span><small>ABOUT THE PORT</small></div>
      <div className="hero-status"><span>DEPTH: −07 M</span><span>SECTOR: K-19</span><span>SYS: ONLINE</span></div>
    </section>

    <section id="club" className="manifest"><p className="eyebrow">КЛУБ OLD KRAKEN</p><h1>НЕ КОМПЬЮТЕРНЫЙ КЛУБ.<br/><span>БАЗА В БЫВШЕМ ПОРТУ.</span></h1><div className="manifest-grid"><p>OLD KRAKEN расположен в бывшем здании порта на набережной Бреста. Мы сохранили характер места: сталь, бетон, солёный воздух и свет мониторов — и превратили его в базу для тех, кто играет глубже.</p><div className="specs"><span><b>48</b> игровых станций</span><span><b>24/7</b> открыты к рейду</span><span><b>1 GB</b> оптика без лагов</span></div></div></section>

    <section id="zones" className="zones"><div className="section-head"><p className="eyebrow">ИГРОВЫЕ ЗОНЫ</p><h2>ВЫБЕРИ СВОЙ<br/><span>ОТСЕК.</span></h2></div><div className="zone-list">{zones.map((zone, i) => <article key={zone.tag} className={'zone '+(active===i?'selected':'')} onClick={() => setActive(i)}><img className="zone-photo" src={zone.image} alt={zone.name}/><div className="zone-num">{zone.tag.replace('DECK ','')}</div><div><h3>{zone.name}</h3><p>{zone.meta}</p></div><div className={'seat '+zone.color}>{zone.seats}</div><button aria-label={'Выбрать '+zone.name}><ArrowUpRight/></button></article>)}</div><article className="zone-detail"><img src={zones[active].image} alt={zones[active].name}/><div><p className="eyebrow">{zones[active].tag}</p><h3>{zones[active].name}</h3><p>{zones[active].description}</p><button className="reserve" onClick={() => scrollTo('reserve')}>ЗАБРОНИРОВАТЬ <ArrowUpRight size={18}/></button></div></article></section>

    <section id="prices" className="prices"><div className="section-head"><p className="eyebrow">ТАРИФЫ КЛУБА</p><h2>ЧЕСТНЫЕ<br/><span>ЦЕНЫ.</span></h2></div><div className="price-grid"><article><span>БУДНИ</span><h3>ОТ 6 BYN</h3><p>за час игры на PC</p><button onClick={() => scrollTo('reserve')}>ЗАБРОНИРОВАТЬ <ArrowUpRight size={16}/></button></article><article className="featured"><span>НОЧНОЙ РЕЙД</span><h3>25 BYN</h3><p>с 23:00 до 08:00</p><button onClick={() => scrollTo('reserve')}>ВЫБРАТЬ РЕЙД <ArrowUpRight size={16}/></button></article><article><span>КОНСОЛЬНАЯ КАЮТА</span><h3>ОТ 18 BYN</h3><p>за час для команды</p><button onClick={() => scrollTo('reserve')}>ЗАБРОНИРОВАТЬ <ArrowUpRight size={16}/></button></article></div></section>

    <section id="offers" className="offers"><div><p className="eyebrow">ПРЕДЛОЖЕНИЯ КЛУБА</p><h2>АКЦИИ ДЛЯ<br/><span>ЭКИПАЖА.</span></h2></div><div className="offer-list"><article><div><h3>ПЕРВЫЙ СПУСК</h3><p>Скидка 20% на первое посещение клуба.</p></div></article><article><div><h3>ПРИВЕДИ НА БОРТ</h3><p>Приводи друга — оба получаете дополнительный час.</p></div></article><article><div><h3>КОМАНДНЫЙ РЕЙД</h3><p>Специальные условия для bootcamp и турниров.</p></div></article></div></section>

    <section id="reserve" className="booking"><div><p className="eyebrow">[ 03 / BOOK A TERMINAL ]</p><h2>ЗАЙМИ МЕСТО<br/>В <span>ЭКИПАЖЕ.</span></h2><p className="booking-note">Выбранная зона: <strong>{zones[active].name}</strong></p></div><form onSubmit={(e)=>{e.preventDefault();setBooked(true)}}>{booked ? <div className="success"><Crosshair/><h3>ЗАЯВКА ПРИНЯТА</h3><p>Координатор порта свяжется с вами.</p></div> : <><label>ТВОЙ ПОЗЫВНОЙ<input required placeholder="Имя"/></label><label>СВЯЗЬ<input required type="tel" placeholder="+375 (__) ___-__-__"/></label><button className="reserve" type="submit">ОТПРАВИТЬ ЗАПРОС <ArrowUpRight size={18}/></button><small>Нажимая кнопку, ты принимаешь правила порта.</small></>}</form></section>

    <footer id="contacts"><div className="footer-mark"><img src="/old-kraken-logo.png" alt="Old Kraken"/><span>OLD KRAKEN</span></div><p>БРЕСТ · ПОРТОВАЯ ЛИНИЯ 19<br/>ЕЖЕДНЕВНО 10:00—06:00</p><div className="social"><a href="#home">VK</a><a href="#home">TG</a><a href="#home">IG</a></div><p className="signal"><i/> ALL SYSTEMS NOMINAL</p></footer>
  </main>
}
createRoot(document.getElementById('root')).render(<App/>);
